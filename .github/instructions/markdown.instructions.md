---
applyTo: "blog/**/*.md"
description: "Markdown content standards for blog posts"
---
# Markdown Blog Post Guidelines

<!-- Inspired by: https://github.com/github/awesome-copilot/blob/main/instructions/markdown.instructions.md -->

## Frontmatter Schema (Required)
Every blog post MUST have YAML frontmatter with these fields:
```yaml
---
date: '2025-11-08T00:00:00+0800'  # ISO 8601 format with timezone
title: "Your Post Title"           # Required
description: "SEO description"      # Required (used for meta description)
image: "https://..."                # Optional (falls back to first image in content)
tags:                               # Required, will be uppercased automatically
  - TAG1
  - TAG2
meta:                               # Optional, for custom meta tags
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---
```

## Frontmatter Validation
- Schema enforced by Zod in `build/blog.ts`
- `title` and `description` are trimmed automatically
- `tags` are converted to uppercase
- If no `image` is provided, first image from content is used
- Invalid frontmatter will cause build to fail with detailed error

## Active Markdown-it Plugins
The following plugins are enabled (see `build/markdownit.ts`):
- **abbr** - Abbreviations
- **anchor** - Auto-generate heading anchors (level 2+)
- **attrs** - Add attributes to elements `{.class #id}`
- **deflist** - Definition lists
- **emoji** - Emoji support :smile:
- **footnote** - Footnotes [^1]
- **imsize** - Image sizing `![alt](url =100x200)`
- **ins** - Inserted text ++insert++
- **mark** - Highlighted text ==mark==
- **sub** - Subscript ~sub~
- **sup** - Superscript ^sup^
- **Custom: bootstrap5-alert** - Bootstrap alerts (see below)
- **Custom: bootstrap5-table** - Bootstrap styled tables
- **Custom: external-link** - External link handling
- **Custom: highlight** - Code highlighting with Prism.js
- **Custom: meta** - Extract metadata from content

## Bootstrap 5 Alert Syntax
Use container syntax for styled alerts:
```markdown
::: info
This is an info alert
:::

::: warning
This is a warning alert
:::

::: danger
This is a danger alert
:::

::: success
This is a success alert
:::
```

## Code Blocks
- Use fenced code blocks with language identifier
- Syntax highlighting via Prism.js
- Example:
  ````markdown
  ```javascript
  const hello = 'world'
  ```
  ````

## Images
- Use HTTPS URLs for images
- Prefer imgur or other CDN for hosting
- Add alt text for accessibility
- Use imsize plugin for dimensions: `![alt](url =800x600)`
- First image automatically becomes og:image if not set in frontmatter

## Links
- External links automatically get `target="_blank"` and `rel="noopener"`
- Use relative links for internal pages: `[link](/blog/other-post.html)`

## Writing Style
- Primary language: Traditional Chinese (zh-TW)
- Use full-width punctuation for Chinese text
- Keep paragraphs focused and concise
- Use headings to structure content (start with h2, not h1)
- Break up long content with images and code blocks

## SEO Best Practices
- Description should be 100-160 characters
- Title should be under 60 characters
- Use relevant tags (3-5 recommended)
- Include target keywords naturally in first paragraph
- Use descriptive heading text
