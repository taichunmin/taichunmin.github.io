# Performance Instructions for blog-v4

<!-- Adapted for static site generator optimization -->

## Performance Principles

1. **Build time matters**: Fast builds = happy developers
2. **Bundle size matters**: Smaller HTML/CSS/JS = faster load times
3. **Leverage CDN**: Use CDN for large libraries (Vue, Bootstrap)
4. **Minimize processing**: Only build what changed
5. **Parallelize operations**: Use Promise.all() for independent tasks

## Build Performance

### Parallel File Processing
Process independent files in parallel:

```typescript
// ❌ Slow - sequential processing
for (const file of files) {
  await processFile(file)
}

// ✅ Fast - parallel processing
await Promise.all(files.map(file => processFile(file)))
```

### Incremental Builds
Only rebuild changed files in dev mode:

```typescript
import chokidar from 'chokidar'

const watcher = chokidar.watch('blog/*.md')

watcher.on('change', async (filepath) => {
  // Only rebuild the changed file
  await buildBlogPost(filepath)
  console.log(`Rebuilt: ${filepath}`)
})
```

### Skip Minification in Dev
Minification is slow, skip in development:

```typescript
import { minify } from 'html-minifier'

const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
}

function processHTML(html: string): string {
  // Skip minification in dev mode
  if (process.env.NODE_ENV === 'development') {
    return html
  }
  return minify(html, minifyOptions)
}
```

### Cache Expensive Operations
Cache markdown-it instance, Pug compiler, etc.:

```typescript
// ❌ Bad - creates new instance every time
function renderMarkdown(md: string): string {
  const mdit = new MarkdownIt().use(plugin1).use(plugin2)
  return mdit.render(md)
}

// ✅ Good - reuse instance
const mdit = new MarkdownIt().use(plugin1).use(plugin2)

function renderMarkdown(md: string): string {
  return mdit.render(md)
}
```

### Optimize Glob Patterns
Use specific patterns to avoid scanning unnecessary files:

```typescript
// ❌ Slow - scans everything
const files = await glob('**/*')

// ✅ Fast - specific pattern
const files = await glob('blog/*.md')

// ✅ Even better - multiple patterns
const files = await glob(['blog/*.md', '!blog/_*.md'])  // Exclude drafts
```

## Markdown-it Plugin Performance

### Efficient Regex
Use efficient regex patterns:

```typescript
// ❌ Slow - backtracking
const BAD_REGEX = /(<.*>)*/

// ✅ Fast - non-greedy, specific
const GOOD_REGEX = /<[^>]+>/g
```

### Minimal DOM Operations
In markdown-it plugins, minimize token manipulation:

```typescript
export const plugin: PluginSimple = (md) => {
  md.core.ruler.after('inline', 'my-plugin', (state) => {
    // ❌ Slow - creates many new tokens
    for (const token of state.tokens) {
      const newTokens = []
      // Complex token manipulation
      state.tokens = newTokens
    }
    
    // ✅ Fast - modify tokens in place
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i]
      if (token.type === 'heading_open') {
        // Modify existing token
        token.attrSet('class', 'heading')
      }
    }
  })
}
```

### Plugin Order
Order plugins efficiently:

```typescript
// Heavy plugins last - they process less if earlier plugins filter content
const md = new MarkdownIt()
  .use(lightweightPlugin)  // Fast, minimal processing
  .use(filterPlugin)       // Reduces content
  .use(heavyPlugin)        // Expensive, but less content to process
```

## Frontend Performance

### Use CDN for Libraries
Offload large libraries to CDN:

```pug
//- ✅ Good - use CDN with version pinning
script(type="importmap")
  | {
  |   "imports": {
  |     "vue": "https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.esm-browser.prod.js",
  |     "lodash": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js",
  |     "bootstrap": "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.esm.min.js"
  |   }
  | }

//- ❌ Bad - bundling large libraries increases HTML size
script(src="/js/vue.js")        // 500KB+
script(src="/js/lodash.js")     // 70KB+
script(src="/js/bootstrap.js")  // 60KB+
```

### Minify Inline Scripts
Minify inline JavaScript:

```pug
block script
  script(type="module").
    // Development - readable
    import { createApp, ref } from 'vue'
    const app = createApp({
      setup() {
        const count = ref(0)
        return { count }
      }
    })
    app.mount('#app')

//- Production - minified
block script
  script(type="module").
    import{createApp as c,ref as r}from"vue";c({setup(){const t=r(0);return{count:t}}}).mount("#app")
```

### Lazy Load Images
Use loading="lazy" for images below the fold:

```pug
//- Above the fold - load immediately
img(src="/hero.jpg" alt="Hero image")

//- Below the fold - lazy load
img(src="/image1.jpg" alt="Image 1" loading="lazy")
img(src="/image2.jpg" alt="Image 2" loading="lazy")
```

### Optimize Images
Compress images before adding to repo:

```bash
# Using imagemagick
convert input.jpg -quality 85 -resize 1200x output.jpg

# Using modern formats
convert input.jpg -quality 85 output.webp
```

## HTML Optimization

### Minification Settings
Optimize html-minifier settings:

```typescript
const htmlMinifierOptions = {
  collapseWhitespace: true,       // Remove whitespace
  removeComments: true,            // Remove HTML comments
  minifyCSS: true,                 // Minify inline CSS
  minifyJS: true,                  // Minify inline JS
  removeAttributeQuotes: true,     // Remove quotes where safe
  removeEmptyAttributes: true,     // Remove empty attrs
  removeRedundantAttributes: true, // Remove redundant attrs
  sortAttributes: true,            // Sort attrs (better gzip)
  sortClassName: true,             // Sort classes (better gzip)
}
```

### Critical CSS
Inline critical CSS, defer non-critical:

```pug
block style
  //- Critical CSS - inlined
  style
    :sass
      .hero
        background: url('/hero.jpg')
        height: 100vh

//- Non-critical CSS - async load
link(rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'")
noscript
  link(rel="stylesheet" href="/styles.css")
```

## Monitoring Build Performance

### Measure Build Time
Add timing to build scripts:

```typescript
#!/usr/bin/env tsx

const startTime = performance.now()

async function build() {
  console.log('Building pages...')
  const pageStart = performance.now()
  await buildPages()
  console.log(`Pages built in ${(performance.now() - pageStart).toFixed(2)}ms`)

  console.log('Building blog...')
  const blogStart = performance.now()
  await buildBlog()
  console.log(`Blog built in ${(performance.now() - blogStart).toFixed(2)}ms`)
}

await build()
console.log(`\nTotal build time: ${(performance.now() - startTime).toFixed(2)}ms`)
```

### Track File Sizes
Monitor generated file sizes:

```typescript
import fs from 'node:fs/promises'

async function reportFileSize(filepath: string) {
  const stats = await fs.stat(filepath)
  const sizeKB = (stats.size / 1024).toFixed(2)
  console.log(`${filepath}: ${sizeKB} KB`)
}

await reportFileSize('dist/index.html')
await reportFileSize('dist/blog/post.html')
```

## Performance Checklist

### Build Performance
- [ ] Parallelize independent file operations
- [ ] Skip minification in dev mode
- [ ] Use incremental builds in watch mode
- [ ] Cache expensive operations (markdown-it, Pug compiler)
- [ ] Use specific glob patterns
- [ ] Measure build time regularly

### Frontend Performance
- [ ] Use CDN for large libraries (Vue, Bootstrap, lodash)
- [ ] Minify HTML/CSS/JS in production
- [ ] Optimize images (compress, modern formats)
- [ ] Lazy load below-the-fold images
- [ ] Inline critical CSS
- [ ] Use `loading="lazy"` for images
- [ ] Enable gzip/brotli compression (server config)

### Markdown-it Plugins
- [ ] Use efficient regex patterns
- [ ] Minimize token manipulation
- [ ] Order plugins efficiently (heavy ones last)
- [ ] Test plugin performance with large files

## Performance Budget

Set performance budgets and monitor:

- **Build time**: < 10s for full build, < 500ms for single file
- **HTML file size**: < 100KB per page (before gzip)
- **Total page weight**: < 500KB (including images, CSS, JS from CDN)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## Common Performance Mistakes

❌ Processing files sequentially instead of in parallel
❌ Minifying in development mode
❌ Creating new markdown-it instance for every file
❌ Using broad glob patterns that scan unnecessary files
❌ Bundling large libraries instead of using CDN
❌ Not lazy loading below-the-fold images
❌ Not compressing images
❌ Using inefficient regex in plugins
❌ Not measuring build performance

## Tools for Performance Monitoring

### Build Performance
```bash
# Measure build time
time yarn build

# Profile Node.js
node --prof build/page.ts
node --prof-process isolate-*.log
```

### Frontend Performance
- **Lighthouse**: Automated performance audits
- **WebPageTest**: Real-world performance testing
- **Chrome DevTools**: Network, Performance tabs

### Bundle Analysis
```bash
# Check file sizes
ls -lh dist/

# Check gzipped sizes
gzip -c dist/index.html | wc -c
```

## Continuous Performance Monitoring

Add to CI workflow:

```yaml
- name: Build and measure
  run: |
    time yarn build
    du -sh dist/
    find dist -name "*.html" -exec ls -lh {} \;

- name: Performance budget check
  run: |
    # Fail if any HTML file > 100KB
    find dist -name "*.html" -size +100k -exec false {} +
```
