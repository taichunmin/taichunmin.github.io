import fsPromises from 'fs/promises'
import _ from 'lodash'
import path from 'path'
import { dayjs } from './dayjs'

const ERROR_KEYS = [
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
  'columnNumber',
  'filename',
  'lineNumber',
  'message',
  'name',
  'stack',

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
  'errors',

  // https://nodejs.org/api/errors.html
  'address',
  'code',
  'dest',
  'errno',
  'function',
  'info',
  'library',
  'opensslErrorStack',
  'path',
  'port',
  'reason',
  'syscall',

  // axios: https://github.com/axios/axios/blob/v1.x/lib/core/AxiosError.js
  'config',
  'description',
  'fileName',
  'number',
  'request',
  'response.data',
  'response.headers',
  'response.status',
  'status',

  // http-errors: https://github.com/jshttp/http-errors/blob/master/index.js
  'statusCode',
  'statusMessage',

  // GraphQLError: https://www.graphql-js.org/api-v16/error/
  'args',
  'originalError',
  'positions',
  'source',
  'locations',
  'line',
  'column',

  // pugjs, @babel/parser
  'component',
  'loc',
  'pos',
  'reasonCode',
  'syntaxPlugin',

  // custom
  'data',
] as const

export function errToJson<T extends Error & { babylonError?: any, cause?: any, stack?: any }> (err: T): Partial<T> {
  const tmp: any = {
    ..._.pick(err, ERROR_KEYS),
    ...(_.isNil(err.cause) ? {} : { cause: errToJson(err.cause) }),
    ...(_.isNil(err.babylonError) ? {} : { babylonError: errToJson(err.babylonError) }), // pug
  }
  return tmp
}

export const genSitemap = (() => {
  const toUrl = (url: string) => `<url><loc>${url}</loc><changefreq>daily</changefreq></url>`
  const toUrlset = (urls: string[]) => `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${_.join(_.map(urls, toUrl), '')}</urlset>`
  const toSitemap = ({ lastmod, url }: { lastmod: string; url: string }) => `<sitemap><loc>${url}</loc><lastmod>${lastmod}</lastmod></sitemap>`
  const toSitemapIndex = ({ lastmod, urls }: { lastmod: string; urls: string[] }) => `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${_.join(_.map(urls, url => toSitemap({ lastmod, url })), '')}</sitemapindex>`
  return async ({ baseurl, dist, urls }: { baseurl: string; dist: string; urls: string[] }) => {
    const sitemapIndex: string[] = []
    const lastmod = dayjs().format('YYYY-MM-DDTHH:mmZ')
    for (const [index, chunk] of _.toPairs(_.chunk(urls, 1000))) {
      await fsPromises.writeFile(path.join(dist, `sitemap_${index}.xml`), toUrlset(chunk))
      sitemapIndex.push(new URL(`sitemap_${index}.xml`, baseurl).href)
    }
    await fsPromises.writeFile(path.join(dist, 'sitemap.xml'), toSitemapIndex({ lastmod, urls: sitemapIndex }))
  }
})()
