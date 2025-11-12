# Documentation Instructions for blog-v4

<!-- Based on awesome-copilot best practices -->
<!-- Adapted for TypeScript build scripts, Pug templates, and Markdown content -->

## Documentation Principles

1. **Keep it current**: Update docs when code changes
2. **Be concise**: Clear and brief, avoid fluff
3. **Show examples**: Practical examples over theory
4. **Use types**: Let TypeScript types document themselves
5. **Link generously**: Connect related concepts

## Code Documentation (TSDoc)

### Function Documentation
Use TSDoc comments for all exported functions:

```typescript
/**
 * Converts an Error object to a JSON-serializable format.
 * Preserves error message, stack trace, and custom data properties.
 * 
 * @param err - The error to convert (can be any type)
 * @returns JSON-serializable object with error details
 * 
 * @example
 * ```typescript
 * try {
 *   throw new Error('Failed to process')
 * } catch (err) {
 *   console.error(errToJson(err))
 * }
 * ```
 */
export function errToJson(err: unknown): Record<string, any> {
  // Implementation
}
```

**Required elements:**
- Brief description (one sentence)
- `@param` for each parameter with description
- `@returns` describing return value
- `@example` with working code
- `@throws` if function throws errors
- `@see` for related functions/docs

### Interface Documentation
Document complex interfaces and types:

```typescript
/**
 * Blog post frontmatter schema validated by Zod.
 * Used in `build/blog.ts` to parse and validate markdown frontmatter.
 * 
 * @property title - Post title (required, shown in h1 and title tag)
 * @property description - SEO description (required, used in meta tags)
 * @property tags - Array of uppercase tags (auto-uppercased if lowercase provided)
 * @property image - Optional og:image URL (falls back to first content image if omitted)
 * @property date - Auto-generated from filename or git commit date
 * 
 * @example
 * ```yaml
 * ---
 * title: "My Blog Post"
 * description: "A great post about TypeScript"
 * tags: [TYPESCRIPT, WEBDEV]
 * image: "https://example.com/image.png"
 * ---
 * ```
 * 
 * @see {@link build/blog.ts} for Zod schema implementation
 */
interface BlogFrontmatter {
  title: string
  description: string
  tags: string[]
  image?: string
  date?: Date
}
```

### Module Documentation
Add file-level documentation for complex modules:

```typescript
/**
 * @module build/markdownit
 * @description Configures markdown-it with custom plugins for blog rendering.
 * 
 * This module sets up markdown-it with 15+ plugins including:
 * - Bootstrap 5 alerts (:::info, :::warning, :::danger)
 * - Bootstrap 5 table styling
 * - External link icons (bi-box-arrow-up-right)
 * - Syntax highlighting (Prism.js)
 * - Abbreviations, footnotes, definition lists
 * - Emojis, subscript, superscript, insert, mark
 * 
 * @see {@link https://github.com/markdown-it/markdown-it}
 * @see {@link build/markdownit-bootstrap5-alert.ts} for custom alert plugin
 */

import MarkdownIt from 'markdown-it'
// ... rest of module
```

### Complex Logic Comments
Add inline comments for non-obvious logic:

```typescript
// Extract og:image from first image in markdown content if not in frontmatter
// Uses JSDOM to parse rendered HTML and find first <img> tag
const ogImage = data.image ?? (() => {
  const dom = new JSDOM(html)
  const img = dom.window.document.querySelector('img')
  return img?.src
})()
```

**When to add comments:**
- Complex algorithms or business logic
- Workarounds for bugs or limitations
- Performance optimizations
- Non-obvious type assertions
- Regex patterns (explain what they match)

**When NOT to add comments:**
- Obvious code (self-documenting)
- Restating the code in English
- Outdated information

## Pug Template Documentation

### Mixin Documentation
Document reusable Pug mixins:

```pug
//- Renders a Bootstrap 5 card component
//- @param {string} title - Card title
//- @param {string} [subtitle] - Optional subtitle below title
//- @param {string} [footer] - Optional footer content
//- @example
//-   +card('Title', 'Subtitle', 'Footer')
//-     p Card body content goes here
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

### Template Structure Comments
Document complex template sections:

```pug
//- Global navigation bar
//- Shows site name, links to main pages, and theme toggle
//- Collapses to hamburger menu on mobile (<992px breakpoint)
nav.navbar.navbar-expand-lg.navbar-light.bg-light
  .container-fluid
    a.navbar-brand(href="/")= site.name
    //- ...
```

## Markdown Documentation

### Blog Post Frontmatter
Always include complete frontmatter:

```yaml
---
title: "Complete Guide to TypeScript Build Scripts"
description: "Learn how to build static sites with TypeScript, Pug, and markdown-it"
tags: [TYPESCRIPT, BUILD, STATIC-SITE]
image: "https://example.com/og-image.png"
---
```

### Code Blocks with Language
Always specify language for syntax highlighting:

````markdown
```typescript
const result = await processFile('example.md')
console.log(result)
```

```bash
yarn dev
```

```pug
extends /layout/bootstrap5
```
````

### Custom Markdown Features
Document usage of custom markdown-it plugins:

```markdown
## Bootstrap Alerts

:::info
This is an informational message with an info icon.
:::

:::warning
This is a warning message with an exclamation triangle icon.
:::

:::danger
This is a danger message with an X icon.
:::
```

## Project Documentation

### README.md Structure

```markdown
# Project Name

Brief one-sentence description.

## Features
- Feature 1
- Feature 2
- Feature 3

## Tech Stack
- **Build**: TypeScript, tsx, Node.js 22+
- **Templates**: Pug
- **Content**: Markdown with markdown-it
- **Frontend**: Bootstrap 5.3, Vue.js 3 (CDN)

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
  dist/            # Generated static files (gitignored)
\`\`\`

## Configuration
[Environment variables, config files]

## Contributing
[If applicable]

## License
MIT
```

### Architecture Documentation
Document system architecture in `docs/architecture.md`:

```markdown
# Architecture

## Three-Layer Build System

### Layer 1: Pages (page/*.pug)
- **Input**: Pug templates
- **Output**: Static HTML (1:1 mapping)
- **Script**: `build/page.ts`
- **Example**: `page/about.pug` → `dist/about.html`

### Layer 2: Blog Posts (blog/*.md)
- **Input**: Markdown with YAML frontmatter
- **Output**: HTML via blog-page layout
- **Script**: `build/blog.ts`
- **Example**: `blog/2024-01-01-post.md` → `dist/blog/2024-01-01-post.html`

### Layer 3: Layouts (layout/*.pug)
- **Purpose**: Shared templates extended by pages and blog posts
- **Base**: `bootstrap5.pug` (importmap, meta, GA tracking)
- **Blog**: `blog-page.pug` extends bootstrap5

## Data Flow

1. Markdown file read from `blog/`
2. gray-matter extracts YAML frontmatter + content
3. Zod validates frontmatter schema
4. markdown-it renders to HTML with plugins
5. JSDOM extracts first image for og:image fallback
6. Pug compiles with post context
7. HTML minifier optimizes output
8. Write to `dist/blog/`
```

## API Documentation

For markdown-it plugins, document syntax and output:

```markdown
# Bootstrap 5 Alert Plugin

Renders GitHub-style alerts as Bootstrap 5 alert components.

## Syntax
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

## Output
\`\`\`html
<div class="alert alert-info" role="alert">
  <i class="bi bi-info-circle"></i>
  This is an info alert
</div>
\`\`\`

## Supported Types
- `info` - Blue info alert with info-circle icon
- `warning` - Yellow warning with exclamation-triangle icon
- `danger` - Red danger alert with x-circle icon

## Implementation
See `build/markdownit-bootstrap5-alert.ts`
```

## Documentation Checklist

When adding/changing code:
- [ ] TSDoc comments on exported functions
- [ ] Interface/type documentation for complex types
- [ ] Inline comments for complex logic
- [ ] README updated if new feature added
- [ ] Architecture docs updated if structure changed
- [ ] Example usage in comments/docs
- [ ] Links to related documentation

## Documentation Tools

### Generate TypeDoc (if configured)
```bash
npx typedoc --out docs/api src/
```

### Validate Markdown Links
```bash
npx markdown-link-check **/*.md
```

### Check TypeScript JSDoc
```bash
npx tsc --noEmit
```

## Common Documentation Mistakes

❌ **Outdated comments**
```typescript
// Returns user object
function getUsers() { } // Actually returns array!
```

✅ **Keep comments current**
```typescript
/**
 * Fetches all users from database.
 * @returns Array of user objects
 */
function getUsers(): User[] { }
```

❌ **Obvious comments**
```typescript
// Increment counter by 1
counter++
```

✅ **Explain WHY, not WHAT**
```typescript
// Increment counter to trigger re-render in Vue
counter++
```

❌ **No examples**
```typescript
/**
 * Processes a file
 * @param filepath Path to file
 */
function processFile(filepath: string) { }
```

✅ **Include examples**
```typescript
/**
 * Processes a markdown file with frontmatter.
 * @param filepath - Absolute path to markdown file
 * @returns Parsed frontmatter and HTML content
 * 
 * @example
 * ```typescript
 * const result = await processFile('/path/to/post.md')
 * console.log(result.frontmatter.title)
 * ```
 */
function processFile(filepath: string): Promise<ProcessedFile> { }
```

## Accessibility in Documentation

- Use semantic markdown (proper heading hierarchy)
- Add alt text for images in markdown
- Describe what links point to
- Use code blocks with language for syntax highlighting
- Make documentation readable by screen readers

## When Documentation is Complete

Documentation is complete when:
1. A new developer can understand the code without asking
2. All public APIs are documented with examples
3. Complex algorithms have explanatory comments
4. Architecture is documented at high level
5. README has clear setup and usage instructions
6. All custom markdown-it plugin syntax is documented
