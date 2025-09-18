# Project: 戴均民的個人網站

This project is the personal website of 戴均民, featuring a self-introduction, portfolio, technical articles, and personal essays.

## General Instructions:

- Please follow `.editorconfig` settings for indentation and line endings.
- For TypeScript files
  - When generating new TypeScript code, please follow the existing coding style and the JavaScript Standard Style coding style.
  - Prefer functional programming paradigms where appropriate.
  - Prefer using `async` and `await` for asynchronous operations.
  - All code should be compatible with TypeScript 5.0 and Node.js 22+.
- For Pug files
  - When generating JavaScript code, please follow the existing coding style and the JavaScript Standard Style coding style, prefer using ES2020+ and module syntax.
  - Ensure the generated HTML is responsive and works well on both desktop and mobile devices.
  - Prefer using Bootstrap 5.3 and Vue.js 3.x for UI components and interactions.
  - Prefer using CDN links for external libraries when possible.
- For Markdown files
  - Prefer language is Traditional Chinese (zh-TW).

## Regarding Dependencies:

- Avoid introducing new external dependencies unless absolutely necessary.
- If a new dependency is required, please state the reason.

## **Project Structure:**

* `blog/`: Contains technical articles and personal essays written in Markdown format.
* `build/`: Contains code used to build the website (such as compiling Pug templates and generating the sitemap), primarily written in TypeScript.
* `layout/`: Contains Pug layout/template files required to compile the files in `page/`.
* `page/`: The Pug files in this directory are compiled one-to-one into HTML files and placed in the `dist/` directory.
* `dist/`: This directory is the output folder for the compiled static website. All files in this directory will be discarded before compilation. After a successful build, this folder will be deployed to GitHub Pages.
