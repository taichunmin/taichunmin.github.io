import { getenv, getSiteurl } from './dotenv'

import fg from 'fast-glob'
import { promises as fsPromises } from 'fs'
import { minify as htmlMinifier } from 'html-minifier'
import _ from 'lodash'
import path from 'path'
import process from 'process'
import pug from 'pug'
import UglifyJS from 'uglify-js'
import { fileURLToPath } from 'url'
import { inspect } from 'util'
import pkg from '../package.json' assert { type: 'json' }
import { errToJson, genSitemap } from './utils'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pageDir = path.resolve(__dirname, '../page/')
const distDir = path.resolve(__dirname, '../dist/')

export async function build (): Promise<void> {
  const PUG_OPTIONS = {
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

  // compile pug files
  const pugFiles = await fg('**/*.pug', { cwd: pageDir })

  let pugErrors = 0
  for (const file of pugFiles) {
    try {
      const ogUrl = getSiteurl(file.replace(/\.pug$/, '.html'))
      let html = pug.renderFile(path.resolve(pageDir, file), {
        ...PUG_OPTIONS,
        ogUrl,
      })
      if (PUG_OPTIONS.NODE_ENV === 'production') html = htmlMinifier(html, htmlMinifierOptions)
      const dist = path.resolve(distDir, file.replace(/\.pug$/, '.html'))
      await fsPromises.mkdir(path.dirname(dist), { recursive: true })
      await fsPromises.writeFile(dist, html)
    } catch (err: any) {
      _.set(err, 'data.src', path.resolve(pageDir, file))
      console.log(`Failed to render pug, err = ${inspect(errToJson(err), { depth: 100, sorted: true })}`)
      // console.log(`Failed to render pug, err = ${inspect(err, { depth: 100, sorted: true })}`)
      pugErrors++
    }
  }
  if (pugErrors > 0) throw new Error(`Failed to render ${pugErrors} pug files.`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  build().catch(err => {
    console.error(errToJson(err))
  })
}
