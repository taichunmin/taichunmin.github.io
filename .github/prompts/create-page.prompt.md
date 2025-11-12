---
mode: 'agent'
tools: ['search']
description: 'Create a new Pug page with proper layout structure'
---

# Create New Page

You are creating a new static page for the blog-v4 site.

## Required Information
Ask the user for:
1. **Page name/path** (e.g., `about`, `works/project-name`)
2. **Page title** (in Traditional Chinese)
3. **Page type**: simple, form, interactive (with Vue.js), or custom

## File Creation

1. **Create file**: `page/{path}.pug`
   - Single level: `page/about.pug` → `/about.html`
   - Nested: `page/works/project.pug` → `/works/project.html`

2. **Basic template structure**:
   ```pug
   extends /layout/bootstrap5
   
   block beforehtml
     - title = 'Page Title'
     - description = 'Page description for SEO'
   
   block style
     style
       :sass
         [v-cloak]
           display: none
         // Page-specific styles here
   
   block content
     .container.py-5
       h1.mb-4= title
       // Page content here
   
   block script
     script(type="module").
       // JavaScript here if needed
   ```

## Template Patterns

### Static Content Page
- No JavaScript needed
- Use Bootstrap 5.3 utilities
- Semantic HTML structure

### Interactive Page (Vue.js)
- Add `#app(v-cloak)` wrapper
- Use Vue 3 Composition API
- Import from CDN via importmap:
  ```javascript
  import { createApp, ref } from 'vue'
  import _ from 'lodash'
  ```

### Form Page
- Use Bootstrap form components
- Add client-side validation
- Handle form submission with fetch API

## Available in Templates
Global variables (from PUG_OPTIONS):
- `_` - lodash
- `Buffer` - Buffer utilities
- `baseurl` - Site base URL
- `site` - Site config (name, description, gtagId, gravatar)
- `ogUrl` - Current page URL

## CDN Libraries (via importmap)
- Vue 3 (`vue`)
- lodash (`lodash`)
- dayjs (`dayjs`)
- Bootstrap 5 (`bootstrap`)
- And more - see `layout/bootstrap5.pug`

## Styling Guidelines
- Use Bootstrap 5.3 classes first
- Add custom Sass only when needed
- Mobile-first responsive design
- Use Sass variables and nesting

## Best Practices
- Keep templates clean and readable
- Use semantic HTML5 elements
- Add proper alt text to images
- Ensure responsive design
- Test on mobile viewport

## After Creation
Tell the user:
1. File location created
2. Preview: `yarn dev` then visit `http://localhost:8443/{path}.html`
3. Build: `yarn build:page`
4. The page will auto-reload in dev mode when edited
