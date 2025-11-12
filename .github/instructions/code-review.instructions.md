# Code Review Instructions for blog-v4

<!-- Based on best practices for TypeScript, Pug, and Markdown projects -->

## Code Review Principles

1. **Be constructive**: Focus on improving code, not criticizing author
2. **Be specific**: Point to exact lines, suggest concrete improvements
3. **Explain why**: Don't just say "change this", explain the reasoning
4. **Prioritize**: Distinguish blocking issues from nice-to-haves
5. **Acknowledge good work**: Call out clever solutions and improvements

## Review Checklist

### TypeScript Build Scripts

#### Code Quality
- [ ] **No `any` types**: Use proper TypeScript types
- [ ] **Error handling**: Use `try-catch` with `errToJson()` for logging
- [ ] **ESM imports**: Include `.ts` extension for local imports
- [ ] **CLI guard**: Executable scripts use `if (process.argv[1] === fileURLToPath(import.meta.url))`
- [ ] **Async/await**: Proper async handling, no unhandled promise rejections
- [ ] **Type safety**: No type assertions without justification

Example issues:
```typescript
// ❌ Bad
import { foo } from './utils'
const data: any = getData()

// ✅ Good
import { foo } from './utils.ts'
const data: UserData = getData()
```

#### Performance
- [ ] **Parallelization**: Independent operations use `Promise.all()`
- [ ] **No unnecessary loops**: Avoid O(n²) where O(n) possible
- [ ] **Cached operations**: Reuse expensive objects (markdown-it, Pug compiler)
- [ ] **Specific glob patterns**: Don't scan unnecessary directories

Example:
```typescript
// ❌ Slow - sequential
for (const file of files) {
  await processFile(file)
}

// ✅ Fast - parallel
await Promise.all(files.map(processFile))
```

#### Maintainability
- [ ] **DRY**: No duplicate code, extract helpers
- [ ] **Clear naming**: Descriptive variable/function names
- [ ] **Comments**: Complex logic explained
- [ ] **Modular**: Functions do one thing well
- [ ] **Utilities reuse**: Use existing helpers from `build/utils.ts`

### Pug Templates

#### Structure
- [ ] **Absolute imports**: Use `/layout/bootstrap5` not `../layout/bootstrap5`
- [ ] **Required blocks**: Define `beforehtml` (with title), `content`
- [ ] **SEO meta tags**: Set title and description in beforehtml
- [ ] **Proper indentation**: Consistent 2-space indent

Example:
```pug
//- ❌ Bad - relative import, missing title
extends ../layout/bootstrap5

block content
  p Content here

//- ✅ Good - absolute import, title defined
extends /layout/bootstrap5

block beforehtml
  - title = 'Page Title'
  - description = 'Page description for SEO'

block content
  .container
    p Content here
```

#### Accessibility
- [ ] **Semantic HTML**: Use proper HTML5 elements (`<nav>`, `<main>`, `<article>`)
- [ ] **Alt text**: All images have descriptive alt text
- [ ] **ARIA labels**: Interactive elements properly labeled
- [ ] **Keyboard navigation**: All interactive elements keyboard accessible
- [ ] **Color contrast**: Text readable (WCAG AA minimum)

#### Performance
- [ ] **CDN libraries**: Use importmap, avoid duplicate includes
- [ ] **Lazy loading**: Images below fold use `loading="lazy"`
- [ ] **Minimal inline CSS**: Use Bootstrap utilities first, Sass only when needed
- [ ] **No inline scripts**: Extract to block script

Example:
```pug
//- ❌ Bad - bundled library, no lazy loading
script(src="/js/vue.js")
img(src="/large-image.jpg")

//- ✅ Good - CDN, lazy loading
script(type="importmap")
  | { "imports": { "vue": "https://cdn.jsdelivr.net/npm/vue@3/..." } }
img(src="/large-image.jpg" loading="lazy")
```

### Markdown Blog Posts

#### Frontmatter
- [ ] **Required fields**: title, description, tags present
- [ ] **Valid schema**: Matches Zod schema in `build/blog.ts`
- [ ] **Uppercase tags**: Tags in UPPERCASE (auto-converted, but prefer uppercase in source)
- [ ] **HTTPS image URL**: If image provided, use HTTPS URL
- [ ] **Description length**: 50-160 characters for SEO

Example:
```yaml
# ❌ Bad - missing description, lowercase tags
---
title: "My Post"
tags: [tag1, tag2]
---

# ✅ Good - complete frontmatter
---
title: "My Awesome Post"
description: "A detailed guide to building static sites with Pug and TypeScript"
tags: [TYPESCRIPT, PUG, WEBDEV]
image: "https://example.com/og-image.jpg"
---
```

#### Content Quality
- [ ] **No spelling errors**: Use spell checker
- [ ] **Code blocks with language**: Always specify language for syntax highlighting
- [ ] **Valid markdown syntax**: Proper heading hierarchy, lists, links
- [ ] **Working links**: External links point to valid URLs
- [ ] **Image optimization**: Images compressed, reasonable file size

Example:
````markdown
❌ Bad - no language specified
```
const foo = 'bar'
```

✅ Good - language specified
```typescript
const foo: string = 'bar'
```
````

### Markdown-it Plugins

#### Implementation
- [ ] **Correct type**: `PluginSimple` or `PluginWithOptions`
- [ ] **Registered**: Added to plugin array in `build/markdownit.ts`
- [ ] **Performance**: Efficient regex, minimal DOM operations
- [ ] **Bootstrap compatibility**: Uses Bootstrap 5.3 classes
- [ ] **Error handling**: Graceful failure, doesn't crash renderer

#### Testing
- [ ] **Test coverage**: Tests for all variants and edge cases
- [ ] **Example usage**: Documentation includes examples
- [ ] **Integration tested**: Works with other plugins

Example:
```typescript
// ✅ Good plugin structure
export const plugin: PluginSimple = (md) => {
  md.core.ruler.after('inline', 'my-plugin', (state) => {
    try {
      // Plugin logic
      for (const token of state.tokens) {
        if (token.type === 'paragraph_open') {
          token.attrSet('class', 'lead')
        }
      }
    } catch (err) {
      console.error('Plugin error:', err)
      return false
    }
  })
}
```

## Security Review

- [ ] **No hardcoded secrets**: API keys, tokens in environment variables
- [ ] **Input validation**: User input sanitized
- [ ] **No command injection**: Don't pass user input to shell commands
- [ ] **Path validation**: File paths don't allow traversal
- [ ] **HTTPS URLs**: External resources use HTTPS
- [ ] **Dependency audit**: No known vulnerabilities (`yarn audit`)

Example:
```typescript
// ❌ Bad - hardcoded secret
const apiKey = 'sk-1234567890abcdef'

// ✅ Good - environment variable
const apiKey = process.env.API_KEY
```

## Style Guide Compliance

### EditorConfig
- [ ] **2-space indent**: No tabs, 2 spaces
- [ ] **LF line endings**: Not CRLF
- [ ] **UTF-8 encoding**: No other encodings
- [ ] **Trim trailing whitespace**: No trailing spaces
- [ ] **Final newline**: File ends with newline

### TypeScript
- [ ] **Consistent naming**: camelCase for variables/functions, PascalCase for types
- [ ] **No unused imports**: Remove unused imports
- [ ] **No console.log**: Use structured logging or remove
- [ ] **Semicolons**: Consistent use (or non-use)

### Pug
- [ ] **Consistent quotes**: Use single or double quotes consistently
- [ ] **Logical grouping**: Related elements grouped together
- [ ] **Comments**: Use `//- ` for comments (not rendered in HTML)

## Review Process

### 1. First Pass - High-Level
- Read PR description
- Understand what problem is being solved
- Review file changes overview
- Check if tests are included (if applicable)

### 2. Second Pass - Line-by-Line
- Check code quality issues
- Look for security concerns
- Verify performance implications
- Check style guide compliance

### 3. Third Pass - Testing
- Pull branch locally
- Run `yarn build` to verify no errors
- Run `yarn dev` and test in browser
- Check for console errors
- Verify visual appearance (if UI changes)

## Review Feedback Format

### Approve (No issues)
```markdown
LGTM! Nice work on [specific positive aspect].

Highlights:
- ✅ [Specific good thing 1]
- ✅ [Specific good thing 2]

Minor suggestion for future:
- [Optional improvement, non-blocking]
```

### Request Changes (Blocking issues)
```markdown
Great start! A few changes needed before merging:

**Blocking:**
1. **TypeScript type safety** (line 42)
   - Current: `const data: any = getData()`
   - Suggested: `const data: UserData = getData()`
   - Reason: Loses type safety, can cause runtime errors

2. **Security concern** (line 108)
   - Current: API key hardcoded in source
   - Suggested: Use environment variable `process.env.API_KEY`
   - Reason: Exposes secret in version control

**Non-blocking suggestions:**
- Consider extracting duplicate logic to a helper function
- Add JSDoc comment to explain the complex algorithm

Let me know if you have questions!
```

### Comment (Suggestions only)
```markdown
Nice work! Some optional suggestions:

**Performance optimization:**
- Line 56: Could parallelize these operations with `Promise.all()`
- Estimate: ~2x faster build time

**Maintainability:**
- Consider extracting this logic to `build/utils.ts` for reuse

Feel free to address in a follow-up PR if preferred.
```

## Common Issues and Suggestions

### TypeScript
| Issue | Suggestion |
|-------|-----------|
| `import { foo } from './utils'` | Add `.ts` extension: `import { foo } from './utils.ts'` |
| `const data: any` | Use proper type: `const data: UserData` |
| No error handling | Wrap in try-catch with `errToJson()` |
| Sequential operations | Parallelize with `Promise.all()` |

### Pug
| Issue | Suggestion |
|-------|-----------|
| `extends ../layout/bootstrap5` | Use absolute: `extends /layout/bootstrap5` |
| Missing title | Add in beforehtml: `- title = 'Title'` |
| Inline styles | Use Bootstrap utilities or `:sass` block |
| No alt text on images | Add descriptive alt text |

### Markdown
| Issue | Suggestion |
|-------|-----------|
| Missing frontmatter | Add required fields (title, description, tags) |
| Code block without language | Add language: ` ```typescript ` |
| Lowercase tags | Use uppercase: `[TYPESCRIPT, PUG]` |
| HTTP image URL | Use HTTPS |

## Difficult Conversations

### When Requesting Major Changes
```markdown
I know this is a lot of work, but I'm concerned about [specific issue].

**Problem:** [Explain the issue clearly]
**Impact:** [Explain why it matters]
**Suggestion:** [Offer a solution]

Happy to pair on this if helpful!
```

### When Disagreeing with Approach
```markdown
I see a different approach here than we've used before.

**Current approach:** [Describe their approach]
**Alternative approach:** [Describe established pattern]
**Tradeoffs:** [Compare pros/cons]

What was your thinking behind this approach? There might be something I'm missing.
```

## Review Checklist Summary

Quick checklist for reviewers:
- [ ] Code builds successfully (`yarn build`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No security issues (secrets, input validation)
- [ ] Performance considerations addressed
- [ ] Tests included (if applicable)
- [ ] Documentation updated (if needed)
- [ ] Style guide compliance
- [ ] Accessibility considerations (if UI changes)
- [ ] Browser testing (if frontend changes)
- [ ] Constructive feedback provided

## After Review

- Respond to author's questions promptly
- Re-review after changes made
- Approve when all blocking issues resolved
- Merge (or let author merge, depending on workflow)
- Thank author for contribution
