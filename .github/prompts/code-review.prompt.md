---
mode: 'agent'
tools: ['search']
description: 'Perform code review on pull requests or file changes'
---

# Code Review

You are performing a code review for the blog-v4 project.

## Review Checklist

### TypeScript Build Scripts
- [ ] **ESM imports**: Use `.ts` extensions where needed
- [ ] **Error handling**: Use `errToJson()` for structured logging
- [ ] **Type safety**: No `any` types, proper type annotations
- [ ] **Async/await**: Proper async handling, no unhandled promises
- [ ] **CLI guard**: Executable scripts use `if (process.argv[1] === fileURLToPath(import.meta.url))`
- [ ] **Utilities reuse**: Use existing helpers from `build/utils.ts`

### Pug Templates
- [ ] **Absolute imports**: Use `/layout/bootstrap5` not `../layout/bootstrap5`
- [ ] **Block structure**: Define required blocks (beforehtml, content)
- [ ] **Title/description**: Set in beforehtml block for SEO
- [ ] **Responsive design**: Mobile-first, Bootstrap utilities
- [ ] **Semantic HTML**: Use proper HTML5 elements
- [ ] **Accessibility**: Alt text, ARIA labels, keyboard navigation
- [ ] **CDN libraries**: Use importmap, avoid duplicate includes

### Markdown Blog Posts
- [ ] **Frontmatter**: Valid YAML with required fields (title, description, tags)
- [ ] **Schema validation**: Matches Zod schema in `build/blog.ts`
- [ ] **Tags format**: Uppercase, no special characters
- [ ] **Image URL**: Valid HTTPS URL or will use first content image
- [ ] **Content quality**: No spelling errors, proper formatting
- [ ] **Code blocks**: Specify language for syntax highlighting
- [ ] **Links**: Use external link syntax for non-blog URLs

### Markdown-it Plugins
- [ ] **Plugin type**: PluginSimple or PluginWithOptions
- [ ] **Integration**: Exported and added to `build/markdownit.ts`
- [ ] **Performance**: Efficient regex, minimal DOM operations
- [ ] **Testing**: Has test coverage for all variants
- [ ] **Bootstrap compatibility**: Uses Bootstrap 5.3 classes

### General Code Quality
- [ ] **EditorConfig compliance**: 2-space indent, LF endings, UTF-8
- [ ] **No console.log**: Use structured logging or remove debug statements
- [ ] **Comments**: Explain complex logic, avoid obvious comments
- [ ] **Naming**: Descriptive variable/function names
- [ ] **DRY principle**: No duplicate code, extract helpers
- [ ] **Dependencies**: No unnecessary dependencies added

## Security Review
- [ ] **No hardcoded secrets**: API keys, tokens in env vars
- [ ] **Input validation**: User input sanitized
- [ ] **Dependency audit**: No known vulnerabilities (`yarn audit`)
- [ ] **XSS protection**: HTML properly escaped in templates
- [ ] **HTTPS only**: External resources use HTTPS URLs

## Performance Review
- [ ] **Build time**: No unnecessary file operations in loops
- [ ] **Bundle size**: Minimize JavaScript, use CDN for large libraries
- [ ] **Image optimization**: Images compressed, proper formats
- [ ] **HTML minification**: Enabled for production builds
- [ ] **Async operations**: Parallelized where possible

## Common Issues to Flag

### Build Scripts
❌ `import { foo } from './utils'` → ✅ `import { foo } from './utils.ts'`
❌ `throw new Error('fail')` → ✅ `throw Object.assign(new Error('fail'), { data: { ... } })`
❌ `console.log(err)` → ✅ `console.error(inspect(errToJson(err), { depth: 100 }))`

### Pug Templates
❌ `extends ../layout/bootstrap5` → ✅ `extends /layout/bootstrap5`
❌ Missing `title` in beforehtml → ✅ Define title for SEO
❌ Inline styles without Sass → ✅ Use `:sass` filter or Bootstrap classes

### Markdown
❌ Missing frontmatter → ✅ Add YAML frontmatter with required fields
❌ Lowercase tags → ✅ Tags auto-uppercased, but prefer uppercase in source
❌ Plain code blocks → ✅ Use ` ```language ` for syntax highlighting

## Review Feedback Format

### For Approve
"LGTM! Changes look good. Key points:
- [Highlight positive aspects]
- [Note any minor suggestions for future]"

### For Request Changes
"Changes needed:
1. **[Issue category]**: [Specific problem]
   - Current: `[problematic code]`
   - Suggested: `[fixed code]`
   - Reason: [explanation]

2. **[Issue category]**: [Specific problem]
   ..."

### For Comment
"Some suggestions for improvement:
- [Optional improvement with reasoning]
- [Best practice recommendation]
- [Performance optimization idea]"

## Testing Verification
Before approving, verify:
1. `yarn build` succeeds without errors
2. `yarn dev` starts dev server successfully
3. Visual check in browser (if UI changes)
4. No new lint errors introduced
5. Tests pass (if test suite exists)

## After Review
- Be constructive and specific
- Explain "why" behind suggestions
- Link to docs or examples when helpful
- Acknowledge good changes
- Prioritize issues (blocking vs. nice-to-have)
