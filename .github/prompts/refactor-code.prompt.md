---
mode: 'agent'
tools: ['search']
description: 'Refactor code to improve quality and maintainability'
---

# Refactor Code

You are refactoring code in the blog-v4 project to improve quality, maintainability, and performance.

## Refactoring Principles

1. **Preserve Behavior**: Don't change functionality, only structure
2. **Small Steps**: Make incremental changes, test after each
3. **Clear Intent**: Code should be self-documenting
4. **DRY**: Eliminate duplication
5. **SOLID**: Follow sound design principles

## Common Refactoring Patterns

### Extract Function
When a code block does one thing and can be named clearly:

**Before:**
```typescript
// Complex inline logic
const files = await glob('blog/*.md')
for (const file of files) {
  const content = await fs.readFile(file, 'utf-8')
  const { data, content: md } = matter(content)
  // ... more processing
}
```

**After:**
```typescript
async function processBlogPost(filepath: string): Promise<BlogPost> {
  const content = await fs.readFile(filepath, 'utf-8')
  const { data, content: md } = matter(content)
  return { data: validateFrontmatter(data), content: md }
}

const files = await glob('blog/*.md')
const posts = await Promise.all(files.map(processBlogPost))
```

### Extract Constant
When magic numbers or strings appear repeatedly:

**Before:**
```typescript
html = html.replace(/\s+/g, ' ')
css = css.replace(/\s+/g, ' ')
js = js.replace(/\s+/g, ' ')
```

**After:**
```typescript
const WHITESPACE_PATTERN = /\s+/g
html = html.replace(WHITESPACE_PATTERN, ' ')
css = css.replace(WHITESPACE_PATTERN, ' ')
js = js.replace(WHITESPACE_PATTERN, ' ')
```

### Combine Functions
When multiple small functions always used together:

**Before:**
```typescript
function readPost(file: string) { ... }
function parsePost(content: string) { ... }
function validatePost(post: Post) { ... }

// Used everywhere together
const content = await readPost(file)
const post = parsePost(content)
validatePost(post)
```

**After:**
```typescript
async function loadValidatedPost(filepath: string): Promise<Post> {
  const content = await readPost(filepath)
  const post = parsePost(content)
  validatePost(post)
  return post
}
```

### Replace Conditional with Polymorphism
When type checking determines behavior:

**Before:**
```typescript
function renderAlert(type: string, content: string) {
  if (type === 'info') return `<div class="alert-info">${content}</div>`
  if (type === 'warning') return `<div class="alert-warning">${content}</div>`
  if (type === 'danger') return `<div class="alert-danger">${content}</div>`
  return content
}
```

**After:**
```typescript
const ALERT_CONFIGS = {
  info: { class: 'alert-info', icon: 'bi-info-circle' },
  warning: { class: 'alert-warning', icon: 'bi-exclamation-triangle' },
  danger: { class: 'alert-danger', icon: 'bi-x-circle' },
} as const

function renderAlert(type: keyof typeof ALERT_CONFIGS, content: string) {
  const config = ALERT_CONFIGS[type]
  return `<div class="${config.class}"><i class="${config.icon}"></i>${content}</div>`
}
```

### Improve Type Safety
Replace `any` with proper types:

**Before:**
```typescript
function processData(data: any): any {
  return data.map((item: any) => item.value)
}
```

**After:**
```typescript
interface DataItem {
  value: string
  id: number
}

function processData(data: DataItem[]): string[] {
  return data.map(item => item.value)
}
```

## TypeScript-Specific Refactorings

### Use Type Guards
```typescript
function isError(value: unknown): value is Error {
  return value instanceof Error
}

function handleResult(result: unknown) {
  if (isError(result)) {
    console.error(result.message) // TypeScript knows it's Error
  }
}
```

### Use Discriminated Unions
```typescript
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: Error }

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    return result.data // TypeScript knows data exists
  }
  throw result.error // TypeScript knows error exists
}
```

### Use Const Assertions
```typescript
const ALERT_TYPES = ['info', 'warning', 'danger'] as const
type AlertType = typeof ALERT_TYPES[number] // "info" | "warning" | "danger"
```

## Pug Template Refactorings

### Extract Mixin
**Before:**
```pug
.card
  .card-header= post.title
  .card-body= post.content
  
.card
  .card-header= work.title
  .card-body= work.description
```

**After:**
```pug
mixin card(title, body)
  .card
    .card-header= title
    .card-body= body

+card(post.title, post.content)
+card(work.title, work.description)
```

### Use Variables for Repeated Values
**Before:**
```pug
.container.py-5.px-4
  .row.py-5.px-4
    .col.py-5.px-4
```

**After:**
```pug
- const spacing = 'py-5 px-4'
.container(class=spacing)
  .row(class=spacing)
    .col(class=spacing)
```

## Build Script Refactorings

### Parallelize Independent Operations
**Before:**
```typescript
for (const file of files) {
  await processFile(file)
}
```

**After:**
```typescript
await Promise.all(files.map(processFile))
```

### Extract Configuration
**Before:**
```typescript
const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
  .use(plugin1, { option: 'value' })
  .use(plugin2, { option: 'value' })
```

**After:**
```typescript
const MARKDOWN_CONFIG = {
  html: true,
  linkify: true,
  typographer: true,
} as const

const PLUGINS = [
  [plugin1, { option: 'value' }],
  [plugin2, { option: 'value' }],
] as const

const md = new MarkdownIt(MARKDOWN_CONFIG)
PLUGINS.forEach(([plugin, options]) => md.use(plugin, options))
```

## Refactoring Checklist

Before refactoring:
- [ ] Understand the current code thoroughly
- [ ] Identify code smells (duplication, long functions, complex conditionals)
- [ ] Plan refactoring steps
- [ ] Ensure tests exist (or write them first)

During refactoring:
- [ ] Make one change at a time
- [ ] Test after each change
- [ ] Commit frequently
- [ ] Keep behavior unchanged

After refactoring:
- [ ] Verify all tests pass
- [ ] Check build succeeds
- [ ] Review for unintended changes
- [ ] Update documentation if needed

## When NOT to Refactor
- Don't refactor just before a deadline
- Don't refactor without tests
- Don't mix refactoring with new features
- Don't refactor working code "just because"

## After Refactoring
Document:
1. **What changed**: Which files were refactored
2. **Why**: What problem was solved
3. **Impact**: Performance improvements, readability gains
4. **Tests**: Confirm all tests still pass
