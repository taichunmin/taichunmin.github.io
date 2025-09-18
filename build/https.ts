import { getPort, getSiteurl } from './dotenv'

import finalhandler from 'finalhandler'
import { promises as fsPromises } from 'fs'
import https from 'https'
import livereload from 'livereload'
import * as _ from 'lodash-es'
import watch from 'node-watch'
import path from 'path'
import serveStatic from 'serve-static'
import { fileURLToPath } from 'url'
import { errToJson } from './utils'

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
  const publicDir = path.resolve(__dirname, '../dist')

  const httpsServer = https.createServer(await readMkcert(), (req, res) => {
    serveStatic(publicDir, {
      index: ['index.html', 'index.htm'],
    })(req, res, finalhandler(req, res))
  })

  const livereloadServer = livereload.createServer({
    port: getPort(),
    server: httpsServer,
  }) as LiveReloadServer1

  livereloadServer._filterRefresh = (livereloadServer as any).filterRefresh
  livereloadServer.filterRefresh = _.debounce((filepath: string) => { livereloadServer._filterRefresh?.(filepath) }, 1000)
  livereloadServer.watch(publicDir)
  console.log(`build finish. Visit: ${getSiteurl()}`)

  watch([path.resolve(__dirname, '../page')], { recursive: true }, async (e, name) => {
    if (e !== 'update') return
    console.log(getSiteurl(`./${path.relative(pageDir, name).replace(/\.pug$/, '.html')}`))
  })
}

type LiveReloadServer1 = livereload.LiveReloadServer & { _filterRefresh?: livereload.LiveReloadServer['filterRefresh'] }

main().catch(err => {
  console.error(errToJson(err))
  process.exit(1)
})
