---
mode: 'agent'
tools: ['search']
description: 'Create a new blog post with proper frontmatter and structure'
---

# Create New Blog Post

You are creating a new blog post for the blog-v4 static site generator.

## Required Information
Ask the user for:
1. **Post title** (in Traditional Chinese)
2. **Brief description** (100-160 chars for SEO)
3. **Main topic/keywords** (for tags)
4. **Target date** (defaults to today)

## File Creation Steps

1. **Generate filename**: `blog/YYYY-MM-DD-slug.md`
   - Use ISO date format
   - Slug should be URL-friendly (lowercase, hyphens)
   - Example: `blog/2025-11-08-rfid-hardware-guide.md`

2. **Create frontmatter** with required fields:
   ```yaml
   ---
   date: 'YYYY-MM-DDTHH:mm:ss+0800'
   title: "Post Title in Chinese"
   description: "SEO-friendly description"
   image: https://i.imgur.com/placeholder.png
   tags:
     - TAG1
     - TAG2
   meta:
     - property: og:image:width
       content: 1280
     - property: og:image:height
       content: 640
   ---
   ```

3. **Add content structure**:
   - H1 heading (matches title)
   - Opening paragraph with context
   - Sections with H2 headings
   - Code blocks with language identifiers
   - Images with alt text

## Markdown-it Plugins Available
- Bootstrap alerts: `::: info`, `::: warning`, `::: danger`, `::: success`
- Emoji: `:smile:` becomes 😀
- Footnotes: `[^1]` and `[^1]: Note text`
- Attributes: `{.class #id}`
- Image sizing: `![alt](url =800x600)`

## Best Practices
- Use Traditional Chinese (zh-TW) for content
- Full-width punctuation in Chinese text
- Start content with H2, not H1 (H1 is auto-generated from title)
- Add 3-5 relevant tags (will be uppercased automatically)
- Include at least one image for og:image
- Keep description under 160 characters for SEO

## After Creation
Tell the user:
1. File location created
2. How to preview: `yarn dev` then visit `http://localhost:8443/blog/filename.html`
3. How to build: `yarn build:blog`
4. Remind them to add relevant images to the content
