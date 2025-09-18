import * as _ from 'lodash-es'

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
