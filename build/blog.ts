import { getenv, getSiteurl } from './dotenv'

import { Buffer } from '@taichunmin/buffer'
import { checkFields as bsCheckFields } from 'blogsearch-crawler/lib/checkers'
import { Database as BSDatabase } from 'blogsearch-crawler/lib/database'
import fg from 'fast-glob'
import { promises as fsPromises } from 'fs'
import grayMatter from 'gray-matter'
import { minify as htmlMinifier } from 'html-minifier'
import { JSDOM } from 'jsdom'
import JSON5 from 'json5'
import _ from 'lodash'
import path from 'path'
import process from 'process'
import pug from 'pug'
import UglifyJS from 'uglify-js'
import { fileURLToPath } from 'url'
import { inspect } from 'util'
import { z } from 'zod'
import pkg from '../package.json' assert { type: 'json' }
import { dayjs } from './dayjs'
import { mdRenderWithMeta } from './markdownit'
import { errToJson } from './utils'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const blogDir = path.resolve(__dirname, '../blog/')
const distDir = path.resolve(__dirname, '../dist/')
const POST_DEFAULT_OGIMAGE = 'https://placehold.co/1200x630'

const ZodPostContext = z.object({
  date: z.date(),
  description: z.string().trim(),
  file: z.string().trim(),
  ogImage: z.url().normalize(),
  ogUrl: z.url().normalize(),
  path: z.string().trim(),
  tags: z.array(z.string().trim().toUpperCase()).min(1).catch(['無標籤']),
  title: z.string().trim(),
  markdownit: z.object({
    html: z.string().trim(),
    meta: z.optional(z.record(z.string(), z.any())),
  }),
  matter: z.object({
    data: z.record(z.string(), z.any()),
    content: z.string().trim(),
    excerpt: z.optional(z.string().trim()),
    language: z.string().trim(),
    matter: z.string().trim(),
  }),
  jsdom: z.any(),
})

export type PostContext = z.output<typeof ZodPostContext>

export async function build (): Promise<void> {
  const PUG_OPTIONS = {
    _, // lodash
    Buffer, // Buffer
    JSON5, // JSON5
    basedir: path.resolve(__dirname, '..'),
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

  // load all blog/**/*.md files
  const mdFiles = _.orderBy(await fg('**/*.md', { cwd: blogDir }), undefined, 'desc')
  const postsMap = new Map<string, PostContext>()

  let mdParseErrCnt = 0
  for (const file of mdFiles) {
    try {
      const mdStr = await fsPromises.readFile(path.resolve(blogDir, file), 'utf8')
      const post = { file, path: file.replace(/\.md$/, '') } as PostContext
      post.ogUrl = getSiteurl(`blog/${post.path}.html`)
      post.matter = grayMatter(mdStr, {
        excerpt: true,
        excerpt_separator: '<!-- more -->',
      })
      post.markdownit = mdRenderWithMeta(mdStr)
      post.jsdom = JSDOM.fragment(post.markdownit.html)
      post.ogImage = post.matter.data?.image ?? POST_DEFAULT_OGIMAGE

      post.title = post.matter.data?.title ?? post.jsdom.querySelector("h1")?.textContent ?? '筆記國度'
      post.description = post.matter.data?.description ?? post.jsdom.querySelector("p")?.textContent ?? PUG_OPTIONS.site.description
      post.date = dayjs(post.matter.data?.date).utcOffset(8).toDate()
      post.tags = post.matter.data?.tags
      try {
        // 忽略草稿
        if (!(post.matter.data.draft ?? false)) postsMap.set(post.path, ZodPostContext.parse(post))
      } catch (err) {
        throw _.set(err, 'data.build.mdCtx', post)
      }
    } catch (err: any) {
      _.set(err, 'data.src', path.resolve(blogDir, file))
      console.log(`Failed to parse markdown, err = ${inspect(errToJson(err), { depth: 100, sorted: true })}`)
      // console.log(`Failed to parse markdown, err = ${inspect(err, { depth: 100, sorted: true })}`)
      mdParseErrCnt++
    }
  }
  if (mdParseErrCnt > 0) throw new Error(`Failed to parse ${mdParseErrCnt} markdown files.`)

  // render blog-index.pug
  const blogIndexPug = path.resolve(__dirname, '../layout/blog-index.pug')
  try {
    const posts = _.chain([...postsMap.values()])
      .map(post => _.omit(post, ['markdownit.html', 'matter.content']))
      .orderBy('date', 'desc')
      .value()
    let html = pug.renderFile(blogIndexPug, { ...PUG_OPTIONS, posts })
    if (PUG_OPTIONS.NODE_ENV === 'production') html = htmlMinifier(html, htmlMinifierOptions)
    const dist = path.resolve(distDir, 'blog/index.html')
    await fsPromises.mkdir(path.dirname(dist), { recursive: true })
    await fsPromises.writeFile(dist, html)
  } catch (err) {
    _.set(err, 'data.src', blogIndexPug)
    console.log(`Failed to render blog-index.pug, err = ${inspect(errToJson(err), { depth: 100, sorted: true })}`)
    throw err
  }

  // build blogsearch: https://github.com/kbumsik/blogsearch/blob/master/gatsby-plugin-blogsearch/src/gatsby-node.js
  try {
    const bsOptions = {
      output: path.resolve(distDir, 'blogsearch.db.wasm'),
      // fields configurations
      // See: https://github.com/kbumsik/blogsearch#whats-in-the-index
      fields: {
        title: { enabled: true, indexed: true, hasContent: true },
        body: { enabled: true, indexed: true, hasContent: true },
        url: { enabled: true, indexed: true, hasContent: true },
        categories: { enabled: false },
        tags: { enabled: true, indexed: true, hasContent: true },
      },
    }

    // Override existing database
    await fsPromises.mkdir(path.dirname(bsOptions.output), { recursive: true })
    await fsPromises.unlink(bsOptions.output).catch(() => {})

    // Create database
    const db = await BSDatabase.create({
      filename: bsOptions.output,
      columns: bsCheckFields(bsOptions),
    })

    for (const [rowid, post] of _.entries([...postsMap.values()])) {
      db.insert(_.toInteger(rowid), {
        title: post.title,
        body: post.jsdom.textContent?.replace(/\s+/g, ' ') ?? '',
        url: post.ogUrl,
        categories: '',
        tags: post.tags.join(' , '),
      })
    }

    db.close()
  } catch (err) {
    console.log(`Failed to build blogsearch.db.wasm: ${err.message}`)
    throw err
  }

  // render blog-page.pug
  let pugRenderErrCnt = 0
  const blogPagePug = path.resolve(__dirname, '../layout/blog-page.pug')
  for (const [postPath, post] of postsMap.entries()) {
    try {
      let html = pug.renderFile(blogPagePug, { ...PUG_OPTIONS, ogUrl: post.ogUrl, post })
      if (PUG_OPTIONS.NODE_ENV === 'production') html = htmlMinifier(html, htmlMinifierOptions)
      const dist = path.resolve(distDir, `blog/${postPath}.html`)
      await fsPromises.mkdir(path.dirname(dist), { recursive: true })
      await fsPromises.writeFile(dist, html)
    } catch (err) {
      _.set(err, 'data.src', path.resolve(blogDir, postPath))
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
