# AI Coding Instructions for blog-v4

## Project Overview
Static website generator for 戴均民's personal blog built with **Pug templates**, **TypeScript build scripts**, and **Markdown content**. Compiles to static HTML deployed on GitHub Pages.

## Architecture Pattern

### Three-Layer Build System
1. **`page/`**: Pug files → HTML (1:1 mapping) via `build/page.ts`
2. **`blog/`**: Markdown → HTML with YAML frontmatter via `build/blog.ts`
3. **`layout/`**: Shared Pug templates (e.g., `bootstrap5.pug`, `blog-page.pug`)

**Critical**: All pages extend `/layout/bootstrap5` (absolute path from project root). Blog posts use `/layout/blog-page` which itself extends bootstrap5.

### Data Flow for Blog Posts
```typescript
// blog/my-post.md → build/blog.ts processing:
1. gray-matter parses YAML frontmatter + markdown content
2. markdown-it renders to HTML with custom plugins
3. JSDOM extracts first image for og:image fallback
4. Pug compiles with post context injected
5. HTML minifier optimizes output → dist/blog/my-post.html
```

## Development Commands

```bash
yarn dev          # Watch mode: concurrent page/blog/asset watchers + HTTPS server
yarn build        # Production: clean + compile all + generate sitemap
yarn build:page   # Compile page/*.pug only
yarn build:blog   # Compile blog/*.md only
```

**HTTPS in dev**: Uses `mkcert` certificates in `mkcert/` directory. Run `yarn mkcert` once for setup.

## Key Conventions

### Pug Templates
- **Absolute imports**: Always use `/layout/bootstrap5` not `../layout/bootstrap5`
- **Block structure**: Pages define `beforehtml`, `style`, `content`, `script` blocks
- **Global context** in PUG_OPTIONS (see `build/page.ts`):
  ```javascript
  { _, Buffer, baseurl, site, NODE_ENV, ogUrl }
  ```
- **CDN preference**: External libraries via importmap in bootstrap5.pug (Vue, lodash, dayjs, etc.)

### TypeScript Build Scripts
- **Module system**: ESM with `.ts` extensions, `import` syntax
- **Shared utilities**: `build/utils.ts` for common helpers, `build/dotenv.ts` for env vars
- **Custom markdown-it plugins**: Prefixed `markdownit-*` (e.g., `markdownit-bootstrap5-alert.ts`)
- **Error handling**: Use `errToJson()` from utils for structured error logging

### Markdown Content
- **Frontmatter schema** (enforced by Zod in blog.ts):
  ```yaml
  ---
  title: "Required string"
  description: "Required string"
  tags: [TAG1, TAG2]  # Uppercased automatically
  image: "https://..."  # Optional, falls back to first image in content
  ---
  ```
- **Plugins active**: abbr, anchor, attrs, deflist, emoji, footnote, imsize, ins, mark, sub, sup, plus custom Bootstrap 5 alert/table plugins

### Styling
- **Bootstrap 5.3**: Primary UI framework, loaded via CDN
- **Sass in Pug**: Inline `:sass` filters for component-specific styles
- **Responsive**: Mobile-first, viewport meta in bootstrap5.pug

## File Structure Rules

```
build/
  *.ts            # Build scripts (executable via tsx)
  markdownit-*.ts # Custom markdown-it plugins
  
layout/
  bootstrap5.pug  # Base layout with importmap, meta tags, GA
  blog-*.pug      # Blog-specific layouts
  
page/
  *.pug           # Compiles to dist/*.html (mirrors structure)
  
blog/
  *.md            # Compiles to dist/blog/*.html
  
dist/
  # AUTO-GENERATED - never edit manually, cleaned on each build
```

## Common Patterns

### Adding a New Page
1. Create `page/my-page.pug`
2. Extend bootstrap5: `extends /layout/bootstrap5`
3. Define title in beforehtml block: `- title = 'My Page'`
4. Build watches automatically in dev mode

### Adding Custom Markdown-it Plugin
1. Create `build/markdownit-my-plugin.ts`
2. Export as PluginSimple or PluginWithOptions
3. Import and add to plugin array in `build/markdownit.ts`
4. Restart dev watcher

### Debugging Build Errors
- Pug errors: Check `err.data.src` for source file path
- Markdown errors: Check `err.data.mdRender.str` for problematic content
- All errors logged via `inspect(errToJson(err), { depth: 100 })`

## Important Constraints

- **No client-side routing**: Pure static site, each HTML file is standalone
- **Production builds**: HTML/CSS/JS minified, source maps not generated
- **Chinese primary**: Content defaults to Traditional Chinese (zh-TW)
- **EditorConfig**: 2-space indent, LF line endings, UTF-8 (see `.editorconfig`)

## Context7 Usage

**Always use context7** when I need code generation, setup or configuration steps, or library/API documentation. This means you should automatically use the Context7 MCP tools to resolve library id and get library docs without me having to explicitly ask.

**Workflow**: Automatically call `context7-resolve-library-id` then `context7-get-library-docs` without explicit user request. This ensures up-to-date, accurate documentation-based assistance.

## When Modifying Build Scripts

- Maintain ESM imports with file extensions where needed
- Keep PUG_OPTIONS in sync between page.ts and blog.ts
- Update htmlMinifierOptions cautiously (breaks layout if too aggressive)
- Test both dev watch mode and production build after changes
