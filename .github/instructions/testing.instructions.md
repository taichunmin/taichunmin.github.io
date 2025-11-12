# Testing Instructions for blog-v4

<!-- Based on awesome-copilot nodejs-javascript-vitest.instructions.md -->
<!-- Adapted for TypeScript build scripts and markdown-it plugins -->

## Testing Framework

While no test framework is currently configured, when adding tests use:
- **Vitest**: Fast, ESM-first, TypeScript support out of the box
- **tsx**: For running TypeScript tests directly

## Test File Organization

Create test files adjacent to source files:
```
build/
  utils.ts                    → utils.test.ts
  markdownit-alert.ts         → markdownit-alert.test.ts
  markdownit-table.ts         → markdownit-table.test.ts
```

## Testing Priorities

### High Priority (Should Have Tests)
1. **Utility functions** in `build/utils.ts`
   - `errToJson()` - Error serialization
   - Path manipulation helpers
   - Common data transformations

2. **Markdown-it plugins** in `build/markdownit-*.ts`
   - Bootstrap alert plugin
   - Bootstrap table plugin
   - External link plugin
   - Highlight plugin
   - All custom plugins

3. **Data validation**
   - Zod schema validation for frontmatter
   - URL validation
   - Tag normalization

### Low Priority (Optional)
- Main build scripts (`build/page.ts`, `build/blog.ts`) - These are integration scripts
- File I/O operations - Mock these if testing higher-level logic
- Third-party library wrappers

## Test Structure

### Basic Test Template
```typescript
import { describe, expect, it } from 'vitest'
import { functionToTest } from './module'

describe('functionToTest', () => {
  it('should handle typical input', () => {
    const result = functionToTest('input')
    expect(result).toBe('expected')
  })

  it('should handle edge cases', () => {
    expect(functionToTest('')).toBe('')
    expect(functionToTest(null)).toBe(null)
  })

  it('should throw on invalid input', () => {
    expect(() => functionToTest(undefined)).toThrow()
  })
})
```

### Testing Utilities
```typescript
import { describe, expect, it } from 'vitest'
import { errToJson } from './utils'

describe('errToJson', () => {
  it('should serialize standard Error', () => {
    const err = new Error('test error')
    const json = errToJson(err)
    
    expect(json.message).toBe('test error')
    expect(json.stack).toBeDefined()
    expect(typeof json.stack).toBe('string')
  })

  it('should preserve error data property', () => {
    const err = Object.assign(new Error('test'), { 
      data: { filepath: 'test.pug', line: 42 } 
    })
    const json = errToJson(err)
    
    expect(json.data).toEqual({ filepath: 'test.pug', line: 42 })
  })

  it('should handle non-Error values', () => {
    expect(errToJson('string error')).toHaveProperty('message')
    expect(errToJson(null)).toBeDefined()
    expect(errToJson(undefined)).toBeDefined()
  })
})
```

### Testing Markdown-it Plugins
```typescript
import { describe, expect, it } from 'vitest'
import MarkdownIt from 'markdown-it'
import alertPlugin from './markdownit-bootstrap5-alert'

describe('markdownit-bootstrap5-alert', () => {
  const md = new MarkdownIt().use(alertPlugin)

  it('should render info alert', () => {
    const input = ':::info\nTest content\n:::'
    const html = md.render(input)
    
    expect(html).toContain('alert-info')
    expect(html).toContain('Test content')
    expect(html).toContain('bi-info-circle')
  })

  it('should render warning alert', () => {
    const input = ':::warning\nWarning message\n:::'
    const html = md.render(input)
    
    expect(html).toContain('alert-warning')
    expect(html).toContain('Warning message')
    expect(html).toContain('bi-exclamation-triangle')
  })

  it('should render danger alert', () => {
    const input = ':::danger\nDanger message\n:::'
    const html = md.render(input)
    
    expect(html).toContain('alert-danger')
    expect(html).toContain('Danger message')
    expect(html).toContain('bi-x-circle')
  })

  it('should handle multiline content', () => {
    const input = ':::info\nLine 1\nLine 2\nLine 3\n:::'
    const html = md.render(input)
    
    expect(html).toContain('Line 1')
    expect(html).toContain('Line 2')
    expect(html).toContain('Line 3')
  })

  it('should not render invalid alert types', () => {
    const input = ':::invalid\nContent\n:::'
    const html = md.render(input)
    
    // Should pass through as regular content or be ignored
    expect(html).not.toContain('alert-invalid')
  })
})
```

### Testing with Mocks
```typescript
import { describe, expect, it, vi, beforeEach } from 'vitest'
import * as fs from 'node:fs/promises'

vi.mock('node:fs/promises')

describe('fileOperation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should read and parse JSON file', async () => {
    const mockData = { title: 'Test', content: 'Content' }
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockData))
    
    const result = await readConfigFile('test.json')
    
    expect(result).toEqual(mockData)
    expect(fs.readFile).toHaveBeenCalledWith('test.json', 'utf-8')
  })

  it('should handle file read errors', async () => {
    vi.mocked(fs.readFile).mockRejectedValue(new Error('ENOENT'))
    
    await expect(readConfigFile('missing.json')).rejects.toThrow('ENOENT')
  })
})
```

## Test Coverage Goals

- **Utility functions**: 80%+ line coverage
- **Markdown-it plugins**: 100% coverage (they're small and critical)
- **Edge cases**: Test empty input, null, undefined, malformed data
- **Error handling**: Test all error paths

## Async Testing

Always await async operations:
```typescript
it('should process files asynchronously', async () => {
  const result = await processFile('test.md')
  expect(result).toBeDefined()
})
```

## Snapshot Testing

Use sparingly, only for complex HTML output:
```typescript
it('should render complex component correctly', () => {
  const html = renderComponent({ title: 'Test', items: [1, 2, 3] })
  expect(html).toMatchSnapshot()
})
```

## Running Tests

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

Commands:
```bash
yarn test              # Run all tests once
yarn test:watch        # Watch mode
yarn test:ui           # Interactive UI
yarn test:coverage     # Generate coverage report
```

## Test Best Practices

1. **Descriptive names**: Use "should..." format
   ```typescript
   it('should convert tags to uppercase', () => { /* ... */ })
   ```

2. **Arrange-Act-Assert**: Clear test structure
   ```typescript
   it('should parse frontmatter', () => {
     // Arrange
     const markdown = '---\ntitle: Test\n---\nContent'
     
     // Act
     const result = parseFrontmatter(markdown)
     
     // Assert
     expect(result.data.title).toBe('Test')
   })
   ```

3. **One concept per test**: Keep tests focused
   ```typescript
   // ❌ Bad - tests multiple things
   it('should process post', () => {
     expect(post.title).toBe('Title')
     expect(post.tags).toEqual(['TAG1'])
     expect(post.html).toContain('<h1>')
   })
   
   // ✅ Good - separate tests
   it('should extract title from frontmatter', () => { /* ... */ })
   it('should normalize tags to uppercase', () => { /* ... */ })
   it('should render markdown to HTML', () => { /* ... */ })
   ```

4. **Test behavior, not implementation**: Focus on public API
   ```typescript
   // ❌ Bad - tests implementation detail
   it('should call parseYAML function', () => {
     const spy = vi.spyOn(internal, 'parseYAML')
     processFrontmatter(input)
     expect(spy).toHaveBeenCalled()
   })
   
   // ✅ Good - tests behavior
   it('should extract frontmatter data', () => {
     const result = processFrontmatter(input)
     expect(result.data.title).toBe('Expected Title')
   })
   ```

5. **Avoid test interdependence**: Each test should be isolated
   ```typescript
   // ❌ Bad - tests depend on order
   let sharedData
   it('should create data', () => { sharedData = create() })
   it('should use data', () => { expect(process(sharedData)).toBe(true) })
   
   // ✅ Good - tests are independent
   it('should process created data', () => {
     const data = create()
     expect(process(data)).toBe(true)
   })
   ```

## When to Skip Tests

- Don't test third-party libraries (markdown-it itself, Pug compiler)
- Don't test trivial getters/setters
- Don't test Node.js built-ins (fs, path, etc.)
- Don't test build scripts that are just orchestration (page.ts, blog.ts main functions)

## Integration with CI

Tests should run in CI workflow. Add to `.github/workflows/copilot-setup-steps.yml`:
```yaml
- name: Run tests
  run: yarn test
```

## Documentation in Tests

Add comments for complex test scenarios:
```typescript
it('should handle YAML frontmatter with special characters', () => {
  // Special characters in YAML need proper escaping
  // This tests the gray-matter library integration
  const input = '---\ntitle: "Test: Special | Chars"\n---'
  const result = parseFrontmatter(input)
  expect(result.data.title).toBe('Test: Special | Chars')
})
```

## What NOT to Do

- ❌ Don't test multiple unrelated things in one test
- ❌ Don't use `any` in test code (use proper types)
- ❌ Don't hardcode paths (use path.join, import.meta.url)
- ❌ Don't leave `console.log` in tests
- ❌ Don't skip tests without a comment explaining why
- ❌ Don't test implementation details
- ❌ Don't write tests that depend on external services

## Setup Testing Framework

To add Vitest to the project:
```bash
yarn add -D vitest @vitest/ui @types/node
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['build/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['build/**/*.ts'],
      exclude: ['build/**/*.test.ts'],
    },
  },
})
```
