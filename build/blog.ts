import { getenv, getSiteurl } from './dotenv'

import fg from 'fast-glob'
import { promises as fsPromises } from 'fs'
import grayMatter from 'gray-matter'
import { minify as htmlMinifier } from 'html-minifier'
import JSON5 from 'json5'
import * as _ from 'lodash-es'
import path from 'path'
import process from 'process'
import pug from 'pug'
import UglifyJS from 'uglify-js'
import { fileURLToPath } from 'url'
import { inspect } from 'util'
import pkg from '../package.json' assert { type: 'json' }
import { MarkdownItRenderedItem, mdRenderWithMeta } from './markdownit'
import { errToJson } from './utils'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const blogDir = path.resolve(__dirname, '../blog/')
const distDir = path.resolve(__dirname, '../dist/')

export async function build (): Promise<void> {
  const PUG_OPTIONS = {
    _, // lodash
    JSON5, // JSON5
    basedir: path.resolve(__dirname),
    baseurl: getSiteurl(),
    NODE_ENV: getenv('NODE_ENV', 'production'),
    site: {
      description: pkg.description,
      gravatar: 'https://www.gravatar.com/avatar/8d9b432d861e4ac0e40954a800ae90a1?s=2048',
      gtagId: 'G-KB8ZL6LPH5',
      name: '筆記國度',
    },
  }

  const htmlMinifierOptions = {
    caseSensitive: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: (code: string) => UglifyJS.minify(code).code,
    removeCDATASectionsFromCDATA: true,
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
  }

  // compile pug files
  const mdFiles = await fg('**/*.md', { cwd: blogDir })
  const mdCtxMap = new Map<string, MdParsedItem>()

  let mdParseErrCnt = 0
  for (const file of mdFiles) {
    try {
      const mdStr = await fsPromises.readFile(path.resolve(blogDir, file), 'utf8')
      const mdCtx: Partial<MdParsedItem> = { file, path: file.replace(/\.md$/, '') }
      mdCtx.ogUrl = getSiteurl(`blog/${mdCtx.path}.html`)
      mdCtx.matter = grayMatter(mdStr, {
        excerpt: true,
        excerpt_separator: '<!-- more -->',
      })
      mdCtx.markdownit = mdRenderWithMeta(mdStr)

      // TODO: title, description
      mdCtx.title = mdCtx.matter.data?.title ?? '筆記國度'
      mdCtx.description = mdCtx.matter.data?.content ?? PUG_OPTIONS.site.description
      mdCtxMap.set(mdCtx.path ?? '', mdCtx as MdParsedItem)
    } catch (err: any) {
      _.set(err, 'data.src', path.resolve(blogDir, file))
      console.log(`Failed to parse markdown, err = ${inspect(errToJson(err), { depth: 100, sorted: true })}`)
      // console.log(`Failed to parse markdown, err = ${inspect(err, { depth: 100, sorted: true })}`)
      mdParseErrCnt++
    }
  }
  if (mdParseErrCnt > 0) throw new Error(`Failed to parse ${mdParseErrCnt} markdown files.`)

  let pugRenderErrCnt = 0
  const blogPagePug = path.resolve(__dirname, '../layout/blog-page.pug')
  for (const [mdPath, mdCtx] of mdCtxMap.entries()) {
    try {
      let html = pug.renderFile(blogPagePug, { ...PUG_OPTIONS, ...mdCtx })
      if (PUG_OPTIONS.NODE_ENV === 'production') html = htmlMinifier(html, htmlMinifierOptions)
      const dist = path.resolve(distDir, `blog/${mdPath}.html`)
      await fsPromises.mkdir(path.dirname(dist), { recursive: true })
      await fsPromises.writeFile(dist, html)
    } catch (err: any) {
      _.set(err, 'data.src', path.resolve(blogDir, mdPath))
      console.log(`Failed to render pug, err = ${inspect(errToJson(err), { depth: 100, sorted: true })}`)
      pugRenderErrCnt++
    }
  }
  if (pugRenderErrCnt > 0) throw new Error(`Failed to render ${pugRenderErrCnt} pug files.`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  build().catch(err => {
    console.error(errToJson(err))
  })
}

interface MdParsedItem {
  description: string
  file: string
  markdownit: MarkdownItRenderedItem
  matter: grayMatter.GrayMatterFile<string>
  ogUrl: string
  path: string
  title: string
}
