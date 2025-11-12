---
mode: 'agent'
tools: ['search']
description: 'Generate documentation for code, APIs, or project structure'
---

# Generate Documentation

You are generating documentation for the blog-v4 project.

## Documentation Types

### 1. Code Documentation (JSDoc/TSDoc)
For TypeScript build scripts and utilities.

**Function Documentation:**
```typescript
/**
 * Converts an Error object to a JSON-serializable format.
 * Preserves error message, stack trace, and custom data properties.
 * 
 * @param err - The error to convert
 * @returns JSON-serializable object with error details
 * 
 * @example
 * ```typescript
 * try {
 *   throw new Error('Failed')
 * } catch (err) {
 *   console.error(errToJson(err))
 * }
 * ```
 */
export function errToJson(err: unknown): Record<string, any> {
  // Implementation
}
```

**Interface Documentation:**
```typescript
/**
 * Blog post frontmatter schema validated by Zod.
 * 
 * @property title - Post title (required, shown in <h1> and <title>)
 * @property description - SEO description (required, used in meta tags)
 * @property tags - Array of uppercase tags (auto-uppercased if lowercase)
 * @property image - Optional og:image URL (falls back to first content image)
 * @property date - Auto-generated from filename or git commit date
 */
interface BlogFrontmatter {
  title: string
  description: string
  tags: string[]
  image?: string
  date?: Date
}
```

**Module Documentation:**
```typescript
/**
 * @module build/markdownit
 * @description Configures markdown-it with custom plugins for blog rendering.
 * 
 * Includes plugins for:
 * - Bootstrap 5 alerts (:::info, :::warning, :::danger)
 * - Bootstrap 5 table styling
 * - External link icons
 * - Syntax highlighting (Prism.js)
 * - Abbreviations, footnotes, definition lists
 * - Emojis, subscript, superscript
 * 
 * @see https://github.com/markdown-it/markdown-it
 */
```

### 2. Project Documentation (Markdown)

**README Structure:**
```markdown
# Project Name

Brief description in one sentence.

## Features
- Feature 1
- Feature 2
- Feature 3

## Tech Stack
- **Build**: TypeScript, tsx, Node.js 22+
- **Templates**: Pug
- **Content**: Markdown (markdown-it)
- **Frontend**: Bootstrap 5.3, Vue.js 3

## Getting Started

### Prerequisites
- Node.js 22+
- yarn

### Installation
\`\`\`bash
git clone <repo>
cd blog-v4
yarn install
\`\`\`

### Development
\`\`\`bash
yarn dev           # Start dev server with watch mode
yarn build         # Production build
yarn build:page    # Build pages only
yarn build:blog    # Build blog posts only
\`\`\`

## Project Structure
\`\`\`
blog-v4/
  build/           # TypeScript build scripts
  page/            # Pug pages → HTML
  blog/            # Markdown posts → HTML
  layout/          # Shared Pug templates
  dist/            # Generated static files
\`\`\`

## Usage
[Detailed usage examples]

## Configuration
[Environment variables, config files]

## Contributing
[Contribution guidelines]

## License
MIT
```

**Architecture Documentation:**
```markdown
# Architecture

## Three-Layer Build System

### Layer 1: Pages (page/*.pug)
- Input: Pug templates
- Output: Static HTML (1:1 mapping)
- Script: `build/page.ts`
- Example: `page/about.pug` → `dist/about.html`

### Layer 2: Blog Posts (blog/*.md)
- Input: Markdown with YAML frontmatter
- Output: HTML via blog-page layout
- Script: `build/blog.ts`
- Example: `blog/2024-01-01-post.md` → `dist/blog/2024-01-01-post.html`

### Layer 3: Layouts (layout/*.pug)
- Shared templates extended by pages and blog posts
- Base: `bootstrap5.pug` (importmap, meta, GA)
- Blog: `blog-page.pug` extends bootstrap5

## Data Flow
[Detailed data flow diagrams and explanations]
```

### 3. API Documentation

**Markdown-it Plugin API:**
```markdown
# Custom Markdown-it Plugins

## Bootstrap 5 Alert Plugin

### Syntax
\`\`\`markdown
:::info
This is an info alert
:::

:::warning
This is a warning alert
:::

:::danger
This is a danger alert
:::
\`\`\`

### Output
\`\`\`html
<div class="alert alert-info" role="alert">
  <i class="bi bi-info-circle"></i>
  This is an info alert
</div>
\`\`\`

### Supported Types
- `info` - Blue info alert with info-circle icon
- `warning` - Yellow warning alert with exclamation-triangle icon
- `danger` - Red danger alert with x-circle icon

### Implementation
See `build/markdownit-bootstrap5-alert.ts`
```

### 4. Component Documentation (Pug Mixins)

```pug
//- Card component for displaying content in a Bootstrap card
//- @param {string} title - Card title
//- @param {string} [subtitle] - Optional subtitle below title
//- @param {string} [footer] - Optional footer content
//- @example
//-   +card('Title', 'Subtitle', 'Footer text')
//-     p Card body content
mixin card(title, subtitle, footer)
  .card
    .card-body
      h5.card-title= title
      if subtitle
        h6.card-subtitle.mb-2.text-muted= subtitle
      block
    if footer
      .card-footer.text-muted= footer
```

## Documentation Standards

### Function Documentation
- **Purpose**: What the function does (one sentence)
- **Parameters**: Each parameter with type and description
- **Returns**: Return value type and description
- **Examples**: At least one usage example
- **Throws**: Document errors that may be thrown
- **See Also**: Links to related functions or docs

### File Documentation
- **Module description**: Purpose of the file
- **Dependencies**: External dependencies used
- **Exports**: What the file exports
- **Examples**: How to use the module

### Markdown Documentation
- **Clear headings**: Use proper heading hierarchy
- **Code blocks**: Always specify language for syntax highlighting
- **Examples**: Show real, working examples
- **Links**: Link to related documentation
- **Tables**: Use for structured comparison data

## Best Practices

1. **Keep it current**: Update docs when code changes
2. **Be concise**: Clear and brief, no fluff
3. **Show examples**: Code examples are worth 1000 words
4. **Use TypeScript types**: Let types document themselves
5. **Link generously**: Connect related concepts
6. **Consistent style**: Follow project conventions
7. **Accessibility**: Use semantic markdown, alt text for images

## Documentation Checklist

For new code:
- [ ] JSDoc/TSDoc comments on exported functions
- [ ] Interface/type documentation
- [ ] Usage examples in comments
- [ ] README updated if new feature
- [ ] Architecture docs updated if structure changed

For existing code:
- [ ] Outdated documentation updated
- [ ] Missing documentation added
- [ ] Examples verified to work
- [ ] Links checked for 404s

## Generation Commands

```bash
# Generate TypeDoc (if configured)
npx typedoc

# Validate markdown links
npx markdown-link-check **/*.md

# Generate API docs from code
# (Configure with typedoc.json)
```

## After Documentation

Tell the user:
1. What was documented
2. Where the documentation was added
3. How to access/view the documentation
4. Any additional setup needed (e.g., install typedoc)
