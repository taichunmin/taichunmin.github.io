# Security Instructions for blog-v4

<!-- Adapted from best practices for static site generators -->

## Security Principles

1. **Never commit secrets**: API keys, tokens, passwords stay out of git
2. **Validate all inputs**: Sanitize user-provided content
3. **Use HTTPS**: All external resources via HTTPS
4. **Keep dependencies updated**: Regular security audits
5. **Minimize attack surface**: Only install necessary dependencies

## Secrets Management

### Environment Variables
Store sensitive data in environment variables, never in code:

```typescript
// ❌ NEVER do this
const apiKey = 'sk-1234567890abcdef'
const gtagId = 'G-XXXXXXXXXX'

// ✅ Use environment variables
const apiKey = process.env.API_KEY
const gtagId = process.env.GTAG_ID
```

### .env Files
Use `.env` for local development, add to `.gitignore`:

```bash
# .env (NEVER commit this file)
GTAG_ID=G-XXXXXXXXXX
SITE_URL=https://example.com
```

```bash
# .gitignore
.env
.env.local
.env.*.local
```

### Loading Environment Variables
Use `dotenv` package:

```typescript
// build/dotenv.ts
import { config } from 'dotenv'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
config({ path: path.join(ROOT, '.env') })

export const GTAG_ID = process.env.GTAG_ID ?? ''
export const SITE_URL = process.env.SITE_URL ?? 'http://localhost:8443'
```

### Production Secrets
Use CI/CD platform's secret management:
- GitHub Actions: Repository Secrets
- Netlify: Environment Variables
- Vercel: Environment Variables

## Input Validation

### Markdown Content
Markdown is rendered to HTML - ensure XSS protection:

```typescript
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

// Configure markdown-it to sanitize HTML
const md = new MarkdownIt({
  html: true,  // Allow HTML in markdown
  linkify: true,
  typographer: true,
})

// Optionally sanitize output
function renderMarkdown(markdown: string): string {
  const html = md.render(markdown)
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'video']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'id'],
    },
  })
}
```

### Frontmatter Validation
Use Zod to validate frontmatter schema:

```typescript
import { z } from 'zod'

const BlogFrontmatterSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  tags: z.array(z.string().regex(/^[A-Z0-9-]+$/)).max(10),
  image: z.string().url().startsWith('https://').optional(),
  date: z.date().optional(),
})

// Validate before use
try {
  const frontmatter = BlogFrontmatterSchema.parse(data)
} catch (err) {
  if (err instanceof z.ZodError) {
    throw Object.assign(
      new Error(`Invalid frontmatter: ${err.message}`),
      { data: { errors: err.errors } }
    )
  }
  throw err
}
```

### URL Validation
Ensure external URLs are safe:

```typescript
function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    // Only allow HTTPS (or HTTP for localhost dev)
    if (parsed.protocol !== 'https:' && !url.startsWith('http://localhost')) {
      return false
    }
    // Optionally: block certain domains
    const blocklist = ['malicious-site.com']
    if (blocklist.some(domain => parsed.hostname.includes(domain))) {
      return false
    }
    return true
  } catch {
    return false
  }
}
```

## Dependency Security

### Regular Audits
Run security audits regularly:

```bash
# Check for known vulnerabilities
yarn audit

# Fix vulnerabilities automatically
yarn audit fix

# For high/critical issues
yarn audit --level high
```

### Dependency Updates
Keep dependencies updated:

```bash
# Check for outdated packages
yarn outdated

# Update dependencies
yarn upgrade-interactive --latest
```

### Minimal Dependencies
Only install necessary packages:

```typescript
// ❌ Bad - installing large library for one function
import _ from 'lodash'
const first = _.first(array)

// ✅ Good - use native JavaScript
const first = array[0]
```

### Lock Files
Always commit `yarn.lock` or `package-lock.json`:
- Ensures reproducible builds
- Prevents supply chain attacks via version ranges

## Content Security Policy (CSP)

Add CSP meta tag in `layout/bootstrap5.pug`:

```pug
meta(http-equiv="Content-Security-Policy" content=`
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
  img-src 'self' https: data:;
  font-src 'self' https://cdn.jsdelivr.net;
  connect-src 'self' https://www.google-analytics.com;
`)
```

**Note:** `'unsafe-inline'` needed for inline scripts/styles. For production, consider using nonces or hashes.

## HTTPS Enforcement

### External Resources
Always use HTTPS for CDN resources:

```pug
//- ❌ Bad - HTTP
script(src="http://cdn.example.com/library.js")

//- ✅ Good - HTTPS
script(src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js")
```

### Dev Server HTTPS
Use `mkcert` for local HTTPS development:

```bash
# Generate certificates
yarn mkcert

# Dev server uses HTTPS
yarn dev  # https://localhost:8443
```

### Canonical URLs
Always use HTTPS in canonical URLs:

```typescript
const siteUrl = 'https://example.com'  // Not http://
const ogUrl = `${siteUrl}${pathname}`
```

## XSS Prevention

### Pug Templates
Pug auto-escapes by default:

```pug
//- ✅ Auto-escaped (safe)
p= userInput

//- ❌ Unescaped (dangerous)
p!= userInput

//- Only use != for trusted HTML (e.g., markdown-it output)
.content!= markdownHtml
```

### Vue.js
Vue auto-escapes:

```javascript
// ✅ Auto-escaped
createApp({
  template: `<p>{{ userInput }}</p>`
})

// ❌ Dangerous
createApp({
  template: `<p v-html="userInput"></p>`
})
```

### Attributes
Be careful with dynamic attributes:

```pug
//- ❌ Potential XSS via href
a(href=userInput) Link

//- ✅ Validate URL first
a(href=validateUrl(userInput) ? userInput : '#') Link
```

## File Upload Security

This project doesn't handle file uploads, but if adding:
1. Validate file types (whitelist extensions)
2. Scan for malware
3. Store uploads separately from code
4. Use Content-Disposition headers
5. Limit file sizes

## Build Script Security

### Command Injection
Avoid passing user input to shell commands:

```typescript
// ❌ Dangerous - command injection risk
exec(`git log --author="${userInput}"`)

// ✅ Safe - use arrays or validate input
execFile('git', ['log', `--author=${validatedInput}`])
```

### Path Traversal
Validate file paths:

```typescript
import path from 'node:path'

function readBlogPost(filename: string) {
  // ❌ Dangerous - path traversal risk
  const filepath = `blog/${filename}`
  
  // ✅ Safe - validate path stays in blog/
  const filepath = path.join('blog', filename)
  const normalized = path.normalize(filepath)
  if (!normalized.startsWith('blog/')) {
    throw new Error('Invalid path')
  }
}
```

## GitHub Security

### Branch Protection
Enable for main branch:
- Require pull request reviews
- Require status checks to pass
- Require signed commits (optional)

### Dependabot
Enable Dependabot for automatic security updates:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### GitHub Actions Security
For workflows:
- Pin action versions to SHA (not tags)
- Use `pull_request_target` carefully
- Never log secrets
- Use `GITHUB_TOKEN` with minimal permissions

## Security Checklist

Before deploying:
- [ ] No hardcoded secrets in code
- [ ] All environment variables in `.env` (gitignored)
- [ ] `yarn audit` shows no high/critical issues
- [ ] All external resources use HTTPS
- [ ] CSP headers configured
- [ ] Input validation on all user-provided content
- [ ] Frontmatter validated with Zod
- [ ] URLs validated before use
- [ ] Dependencies up to date
- [ ] `yarn.lock` committed
- [ ] Dependabot enabled
- [ ] Branch protection enabled

## Reporting Security Issues

If you find a security vulnerability:
1. **Don't** open a public issue
2. Email security contact (if defined)
3. Include details: steps to reproduce, impact, suggested fix
4. Wait for response before public disclosure

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Snyk Vulnerability Database](https://snyk.io/vuln/)
- [GitHub Security Advisories](https://github.com/advisories)

## What NOT to Do

❌ Commit `.env` files to git
❌ Use `eval()` or `Function()` constructor with user input
❌ Disable CSP in production
❌ Use HTTP for external resources
❌ Install dependencies from untrusted sources
❌ Ignore `yarn audit` warnings
❌ Use `!= ` in Pug for user input (unescaped HTML)
❌ Use `innerHTML` or `v-html` with user content
❌ Trust user input without validation
❌ Hardcode API keys or secrets
