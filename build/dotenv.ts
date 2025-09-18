import 'dotenv/config'
import * as _ from 'lodash-es'

export function getenv<T extends string | undefined> (key: string, defaultVal: T): string | T {
  return process.env?.[key] ?? defaultVal
}

export function getPort (): number {
  return _.toInteger(getenv('PORT', '30000'))
}

export function getSiteurl (path: string = ''): string {
  const url = new URL(path, getenv('BASEURL', 'https://taichunmin.idv.tw/blog-v4/')).href
  return url.replace(/[/]index\.html$/, '/')
}

export const isEnv = (env: string = 'development'): boolean => {
  return getenv('NODE_ENV', 'development') === env
}
