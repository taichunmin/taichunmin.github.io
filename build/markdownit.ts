
import _ from 'lodash'
import { default as markdownit, default as MarkdownIt, type PluginSimple, type PluginWithOptions } from 'markdown-it'
import pluginAbbr from 'markdown-it-abbr'
import pluginAnchor from 'markdown-it-anchor'
import pluginAttrs from 'markdown-it-attrs'
import pluginDeflist from 'markdown-it-deflist'
import pluginEmoji from 'markdown-it-emoji'
import pluginFootnote from 'markdown-it-footnote'
import pluginImsize from 'markdown-it-imsize'
import pluginIns from 'markdown-it-ins'
import pluginMark from 'markdown-it-mark'
import pluginSub from 'markdown-it-sub'
import pluginSup from 'markdown-it-sup'
import { slugify } from 'transliteration'
import pluginBootstrap5Alert from './markdownit-bootstrap5-alert'
import pluginBootstrap5Table from './markdownit-bootstrap5-table'
import pluginExternalLink from './markdownit-external-link'
import highlightRender from './markdownit-highlight'
import pluginMeta from './markdownit-meta'

const md: MarkdownItWithMeta = markdownit('default', {
  breaks: true,
  highlight: highlightRender,
  html: true,
  langPrefix: '',
  linkify: true,
  typographer: true,
})

for (const [pluginIdx, plugin] of _.entries([
  pluginAbbr,
  pluginAttrs,
  pluginBootstrap5Alert,
  pluginBootstrap5Table,
  pluginDeflist,
  pluginEmoji.full,
  pluginExternalLink,
  pluginFootnote,
  pluginImsize,
  pluginIns,
  pluginMark,
  pluginMeta,
  pluginSub,
  pluginSup,
])) {
  try {
    md.use(plugin)
  } catch (err) {
    throw new Error(`${pluginIdx}: ${err.message}`, { cause: err })
  }
}

// pluginAnchor should come after pluginAttrs
md.use(pluginAnchor, {
  level: 2,
  slugify,
  permalink: pluginAnchor.permalink.ariaHidden({
    placement: 'before',
    space: false,
  }),
})

export function mdRenderWithMeta (str: string): MarkdownItRenderedItem {
  try {
    str = _.trim(str)
    const hasNewLine = str.indexOf('\n') >= 0
    const html = hasNewLine ? md.render(str) : md.renderInline(str)
    const { meta, metaError } = md
    if (metaError) throw new Error(metaError.message, { cause: metaError })
    return { html, meta }
  } catch (err) {
    throw _.set(err, 'data.mdRender', { str })
  }
}

export { md }

export interface MarkdownItWithMeta extends MarkdownIt {
  meta?: any | null
  metaError?: Error | null
}

export interface MarkdownItRenderedItem {
  html: string
  meta?: any | null
}

declare const pluginAbbr: PluginSimple
declare const pluginDeflist: PluginSimple
declare const pluginImsize: PluginWithOptions
declare const pluginIns: PluginSimple
declare const pluginMark: PluginSimple
declare const pluginSub: PluginSimple
declare const pluginSup: PluginSimple
