---
applyTo: "**/*.ts"
description: "TypeScript development standards for build scripts"
---
# TypeScript Development Guidelines

<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/typescript-5-es2022.instructions.md -->

## Core Principles
- Target TypeScript 5.x with ES2023+ features
- Use pure ES modules (ESM) - never use CommonJS
- Follow the project's existing architecture and patterns
- Prefer functional programming over classes where appropriate

## Project-Specific Patterns
- All build scripts in `build/` are executable TypeScript files
- Use `tsx` to run TypeScript files directly without compilation
- Import JSON with `assert { type: 'json' }` syntax
- Use `fileURLToPath` and `import.meta.url` for `__dirname` equivalent

## Type Safety
- Avoid `any` - prefer `unknown` with type narrowing
- Use Zod for runtime validation (see `build/blog.ts` for examples)
- Centralize shared types in `build/types.d.mts`
- Use discriminated unions for complex state

## Async & Error Handling
- Always use `async/await` - no callbacks or Promises directly
- Wrap errors with `errToJson()` utility from `build/utils.ts`
- Use `try/catch` with structured error data in `err.data`
- Example error pattern:
  ```typescript
  throw _.set(err, 'data.mdRender', { str })
  ```

## Module Organization
- Keep related utilities together (see `build/markdownit-*.ts`)
- Export main build function as `async function build()`
- Add CLI execution guard: `if (process.argv[1] === fileURLToPath(import.meta.url))`
- Import Node.js built-ins with `node:` prefix when available

## Performance
- Use `fast-glob` for file system operations
- Implement parallel processing where appropriate
- Cache expensive computations (like Pug compilation)

## Naming Conventions
- Use camelCase for functions and variables
- Use PascalCase for types and interfaces
- Prefix custom markdown-it plugins with `markdownit-`
- Use descriptive names - avoid abbreviations except well-known ones
