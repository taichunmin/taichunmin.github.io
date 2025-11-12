---
applyTo: "**/*.pug"
description: "Pug template development standards for static site generation"
---

# Pug Template Guidelines

## Core Architecture
- **ALL pages extend from absolute path**: `extends /layout/bootstrap5`
- Blog pages use: `extends /layout/blog-page` (which itself extends bootstrap5)
- Never use relative paths like `../layout/bootstrap5`

## Block Structure
Every page should define these blocks in order:
1. `block beforehtml` - Set variables (title, description, meta)
2. `block style` - Page-specific styles (use `:sass` filter)
3. `block content` - Main page content
4. `block script` - Page-specific JavaScript

## Global Context Variables
Available in all templates (defined in `build/page.ts` PUG_OPTIONS):
- `_` - lodash utility library
- `Buffer` - Buffer utilities
- `baseurl` - Site base URL
- `site` - Site configuration (name, description, gtagId, gravatar)
- `NODE_ENV` - Environment ('production' or 'development')
- `ogUrl` - Current page's Open Graph URL

## CDN & External Libraries
- **Prefer CDN over npm packages** for front-end libraries
- Use importmap in bootstrap5.pug for module imports
- Available via importmap: Vue 3, lodash, dayjs, Bootstrap 5.3, etc.
- Example in browser:
  ```javascript
  import { ref } from 'vue'
  import _ from 'lodash'
  ```

## Styling Best Practices
- Use inline Sass via `:sass` filter for component-specific styles
- Bootstrap 5.3 is loaded via CDN - use its utilities first
- Follow mobile-first responsive design
- Use CSS variables for theming when needed

## JavaScript in Templates
- Use ES2020+ module syntax (import/export)
- Follow JavaScript Standard Style
- Prefer async/await for asynchronous operations
- Use Vue 3 Composition API for interactive components

## Vue.js Integration
- Use `v-cloak` directive and hide it in CSS
- Prefer Composition API (`setup()` function)
- Mount apps to specific elements, not full page
- Example pattern from existing pages:
  ```pug
  #app(v-cloak)
    // Vue content here
  
  block script
    script(type="module").
      import { createApp, ref } from 'vue'
      createApp({
        setup() {
          // Composition API logic
        }
      }).mount('#app')
  ```

## Responsive Design
- Mobile-first approach
- Use Bootstrap's responsive classes (col-*, d-*, etc.)
- Test on mobile viewport first
- Use `@media (min-width: 768px)` for desktop-specific styles

## Best Practices
- Keep templates focused and readable
- Extract complex logic to JavaScript modules
- Use semantic HTML5 elements
- Add `alt` text to all images
- Ensure proper heading hierarchy (h1 -> h2 -> h3)
