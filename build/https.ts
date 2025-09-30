import { getPort, getSiteurl } from './dotenv'

import finalhandler from 'finalhandler'
import { promises as fsPromises } from 'fs'
import https from 'https'
import livereload from 'livereload'
import watch from 'node-watch'
import path from 'path'
import serveStatic from 'serve-static'
import { fileURLToPath } from 'url'
import { errToJson } from './utils'
import _ from 'lodash'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pageDir = path.resolve(__dirname, '../page/')
const distDir = path.resolve(__dirname, '../dist/')

async function readMkcert (): Promise<{ cert: Buffer, key: Buffer }> {
  try {
    const [cert, key] = await Promise.all([
      fsPromises.readFile(path.resolve(__dirname, '../mkcert/cert.pem')),
      fsPromises.readFile(path.resolve(__dirname, '../mkcert/key.pem')),
    ])
    return { cert, key }
  } catch (err) {
    throw new Error('Failed to load mkcert. Please run "yarn mkcert" first.')
  }
}

async function main (): Promise<void> {
  const httpsServer = https.createServer(await readMkcert(), (req, res) => {
    serveStatic(distDir, {
      index: ['index.html', 'index.htm'],
    })(req, res, finalhandler(req, res))
  })

  const livereloadServer = livereload.createServer({
    port: getPort(),
    // debug: true,
    delay: 1000,
    exts: ['html', 'css', 'js'],
    server: httpsServer,
  }) as LiveReloadServer1


  watch([pageDir], { recursive: true }, async (e, name) => {
    if (e !== 'update') return
    console.log(getSiteurl(`./${path.relative(pageDir, name).replace(/\.pug$/, '.html')}`))
  })

  let latestDistFilepath = ''
  const debounceRefresh = _.debounce(() => { livereloadServer.refresh(latestDistFilepath) }, 500)
  const exts = 'cjs,css,gif,html,jpeg,jpg,js,mjs,png,svg,webp'.split(',')
  watch([distDir], { recursive: true }, async (e, name) => {
    if (e !== 'update') return
    if (!_.includes(exts, path.extname(name).slice(1))) return
    latestDistFilepath = name
    debounceRefresh()
  })

  console.log(`https server started: ${getSiteurl()}`)
}

type LiveReloadServer1 = livereload.LiveReloadServer & { _filterRefresh?: livereload.LiveReloadServer['filterRefresh'] }

main().catch(err => {
  console.error(errToJson(err))
  process.exit(1)
})
