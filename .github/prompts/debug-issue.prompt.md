---
mode: 'agent'
tools: ['terminal', 'search']
description: 'Debug issues and find root causes of errors'
---

# Debug Issue

You are debugging an issue in the blog-v4 project.

## Debugging Workflow

### 1. Reproduce the Issue
- [ ] Get exact error message
- [ ] Identify steps to reproduce
- [ ] Check which environment (dev/build)
- [ ] Verify it's reproducible

### 2. Gather Context
- [ ] Check recent changes (git log)
- [ ] Review error stack trace
- [ ] Check error data (err.data from errToJson)
- [ ] Identify affected files

### 3. Isolate the Problem
- [ ] Narrow down to specific file/function
- [ ] Check inputs to failing function
- [ ] Verify dependencies are correct
- [ ] Test with minimal example

### 4. Fix and Verify
- [ ] Apply fix
- [ ] Test the fix
- [ ] Verify no regressions
- [ ] Document the solution

## Common Issues and Solutions

### Build Script Errors

#### Error: "Cannot find module"
**Symptom:**
```
Error: Cannot find module './utils'
```

**Cause:** Missing `.ts` extension in ESM import

**Solution:**
```typescript
// ❌ Wrong
import { foo } from './utils'

// ✅ Correct
import { foo } from './utils.ts'
```

#### Error: Pug compilation failed
**Symptom:**
```
Error compiling Pug template
  at file.pug:10:5
```

**Debugging:**
1. Check `err.data.src` for source file path
2. Look at line number in error
3. Common issues:
   - Missing variables in context
   - Syntax errors in Pug
   - Incorrect indentation
   - Missing closing tags

**Solution:**
```pug
// ❌ Wrong - undefined variable
p= undefinedVar

// ✅ Correct - check existence first
if typeof undefinedVar !== 'undefined'
  p= undefinedVar
```

#### Error: "Cannot read property 'X' of undefined"
**Symptom:**
```
Cannot read property 'title' of undefined
```

**Debugging:**
Check PUG_OPTIONS in build script - ensure all required variables are provided:
```typescript
const PUG_OPTIONS = {
  basedir: ROOT,
  _,
  Buffer,
  baseurl,
  site: { /* ensure all properties exist */ },
  ogUrl,
}
```

### Markdown Rendering Errors

#### Error: Frontmatter validation failed
**Symptom:**
```
ZodError: Required field 'title' missing
```

**Debugging:**
1. Check `err.data.mdRender.str` for original markdown
2. Verify YAML frontmatter syntax
3. Check against Zod schema in `build/blog.ts`

**Solution:**
```yaml
---
# ❌ Wrong - missing required fields
tags: [TAG1]
---

# ✅ Correct - all required fields
title: "Post Title"
description: "Post description"
tags: [TAG1, TAG2]
---
```

#### Error: markdown-it plugin crash
**Symptom:**
```
TypeError in markdown-it-plugin
```

**Debugging:**
1. Isolate which plugin is failing
2. Test with minimal markdown input
3. Check plugin configuration

**Solution:**
```typescript
// Add try-catch in plugin
export const plugin: PluginSimple = (md) => {
  md.core.ruler.after('inline', 'my-plugin', (state) => {
    try {
      // Plugin logic
    } catch (err) {
      console.error('Plugin error:', errToJson(err))
      return false
    }
  })
}
```

### Dev Server Issues

#### Error: EADDRINUSE (Port already in use)
**Symptom:**
```
Error: listen EADDRINUSE: address already in use :::8443
```

**Solution:**
```bash
# Find process using port
lsof -i :8443

# Kill the process
kill -9 <PID>

# Or use different port
PORT=8444 yarn dev
```

#### Error: Certificate error in dev server
**Symptom:**
```
Error: CERT_NOT_TRUSTED
```

**Solution:**
```bash
# Regenerate mkcert certificates
yarn mkcert

# Trust certificates (macOS)
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain mkcert/cert.pem
```

### Runtime Errors (Browser)

#### Error: Vue component not rendering
**Debugging:**
1. Check browser console for errors
2. Verify Vue 3 CDN loaded (check Network tab)
3. Check importmap configuration in `layout/bootstrap5.pug`
4. Ensure `v-cloak` CSS is defined

**Solution:**
```pug
block style
  style
    :sass
      [v-cloak]
        display: none  // ← Add this

block content
  #app(v-cloak)  // ← Add v-cloak attribute
    // Vue component
```

#### Error: Bootstrap JavaScript not working
**Debugging:**
1. Check if Bootstrap JS loaded (Network tab)
2. Verify Popper.js loaded (Bootstrap dependency)
3. Check for JavaScript errors in console

**Solution:**
Ensure proper import order in `layout/bootstrap5.pug`:
```pug
script(type="importmap")
  | {
  |   "imports": {
  |     "bootstrap": "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.esm.min.js"
  |   }
  | }
```

## Debugging Tools

### Console Logging (Build Scripts)
```typescript
import { inspect } from 'node:util'

// ✅ Structured error logging
console.error(inspect(errToJson(err), { depth: 100 }))

// ✅ Debug with context
console.debug('Processing file:', filepath, { data })

// ❌ Avoid console.log in production
// console.log('Debug info')
```

### Browser DevTools
- **Console**: Check for JavaScript errors
- **Network**: Verify resources loaded
- **Elements**: Inspect HTML structure
- **Sources**: Debug JavaScript with breakpoints

### Terminal Commands
```bash
# Check build output
yarn build 2>&1 | tee build.log

# Watch mode with verbose errors
NODE_ENV=development yarn dev

# Check for syntax errors
npx tsc --noEmit

# Validate markdown
npx markdownlint blog/**/*.md
```

## Performance Debugging

### Slow Build Times
**Diagnosis:**
```typescript
// Add timing to build script
const start = performance.now()
await buildPages()
console.log(`Build took ${performance.now() - start}ms`)
```

**Common causes:**
- Too many files processed sequentially
- Inefficient regex in markdown-it plugins
- Large HTML minification on every change

**Solutions:**
- Parallelize with `Promise.all()`
- Cache processed files
- Skip minification in dev mode

### Memory Issues
**Diagnosis:**
```bash
# Run with memory profiling
node --inspect build/page.ts
```

**Common causes:**
- Loading all files into memory
- Not cleaning up temporary data
- Circular references

**Solutions:**
- Process files in batches
- Use streaming where possible
- Clear variables after use

## Debugging Checklist

When debugging:
- [ ] Read the full error message and stack trace
- [ ] Check error data: `err.data` (from errToJson)
- [ ] Identify the failing file and line number
- [ ] Review recent changes (git diff)
- [ ] Test with minimal reproduction case
- [ ] Add console.debug statements strategically
- [ ] Use Node.js debugger if needed (`node --inspect`)
- [ ] Check browser console for client-side errors
- [ ] Verify environment variables are set
- [ ] Check dependencies are up to date

## After Fixing

Document the fix:
1. **What was the issue**: Brief description
2. **Root cause**: Why it happened
3. **Solution**: How it was fixed
4. **Prevention**: How to avoid in future (tests, validation, etc.)
