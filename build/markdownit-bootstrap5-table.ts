import _ from 'lodash'
import { type RenderRule } from 'markdown-it/lib/renderer.mjs'
import { type MarkdownItWithMeta } from './markdownit'

export default function plugin (md: MarkdownItWithMeta) {
  const origTableOpen: RenderRule = md.renderer.rules.table_open ?? function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrJoin('class', 'table table-sm table-striped-columns')
    return `<div class="table-responsive">${origTableOpen(tokens, idx, options, env, self)}`
  }

  const origTableClose: RenderRule = md.renderer.rules.table_close ?? function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.table_close = function (tokens, idx, options, env, self) {
    return `${origTableClose(tokens, idx, options, env, self)}</div>`
  }
}
