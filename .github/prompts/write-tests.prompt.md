---
mode: 'agent'
tools: ['search/codebase']
description: 'Generate tests for TypeScript build scripts'
---

# Write Tests

You are writing tests for the blog-v4 build system.

## Test Strategy

### Build Scripts Testing
Focus on:
1. **Utility functions** in `build/utils.ts`
2. **Markdown-it plugins** in `build/markdownit-*.ts`
3. **Build script helpers** (not the main build functions)

### What NOT to Test
- Main build scripts (`build/page.ts`, `build/blog.ts`) - These are integration scripts
- File I/O operations - Mock these if needed
- External dependencies - Use mocks

## Test Framework
While no test framework is currently configured, recommend:
- **Vitest**: Fast, ESM-first, TypeScript support
- **tsx**: For running TypeScript tests directly

Installation:
```bash
yarn add -D vitest @vitest/ui
```

## Test File Structure

Create test files adjacent to source:
```
build/
  utils.ts              → utils.test.ts
  markdownit-alert.ts   → markdownit-alert.test.ts
  markdownit-table.ts   → markdownit-table.test.ts
```

## Test Template

```typescript
import { describe, expect, it } from 'vitest'
import { functionToTest } from './module'

describe('functionToTest', () => {
  it('should handle valid input', () => {
    const result = functionToTest('input')
    expect(result).toBe('expected')
  })

  it('should throw on invalid input', () => {
    expect(() => functionToTest(null)).toThrow()
  })

  it('should handle edge cases', () => {
    // Test edge cases
  })
})
```

## Testing Patterns

### Utility Functions
```typescript
describe('errToJson', () => {
  it('should serialize Error objects', () => {
    const err = new Error('test error')
    const json = errToJson(err)
    expect(json.message).toBe('test error')
    expect(json.stack).toBeDefined()
  })

  it('should handle errors with data property', () => {
    const err = Object.assign(new Error('test'), { data: { foo: 'bar' } })
    const json = errToJson(err)
    expect(json.data).toEqual({ foo: 'bar' })
  })
})
```

### Markdown-it Plugins
```typescript
import MarkdownIt from 'markdown-it'
import plugin from './markdownit-alert'

describe('markdownit-alert', () => {
  const md = new MarkdownIt().use(plugin)

  it('should render info alert', () => {
    const html = md.render(':::info\nTest content\n:::')
    expect(html).toContain('alert-info')
    expect(html).toContain('Test content')
  })

  it('should render warning alert with icon', () => {
    const html = md.render(':::warning\nWarning message\n:::')
    expect(html).toContain('alert-warning')
    expect(html).toContain('bi-exclamation-triangle')
  })
})
```

### Mock File I/O
```typescript
import { describe, expect, it, vi, beforeEach } from 'vitest'
import * as fs from 'node:fs/promises'

vi.mock('node:fs/promises')

describe('fileOperation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should read file correctly', async () => {
    vi.mocked(fs.readFile).mockResolvedValue('content')
    const result = await readConfigFile('test.json')
    expect(result).toBeDefined()
  })
})
```

## Test Coverage Goals
- **Utility functions**: 80%+ coverage
- **Markdown-it plugins**: 100% coverage (they're small and critical)
- **Edge cases**: Test error handling, empty input, malformed data

## Running Tests
Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

## Best Practices
1. **Descriptive test names**: Use "should..." format
2. **Arrange-Act-Assert**: Clear test structure
3. **One assertion per test**: Keep tests focused
4. **Test behavior, not implementation**: Test public APIs
5. **Use snapshots sparingly**: Only for complex HTML output

## After Writing Tests
1. Run tests: `yarn test`
2. Check coverage: `yarn test --coverage`
3. Ensure all tests pass before committing
4. Add tests to CI workflow
