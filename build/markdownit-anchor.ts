import pluginAnchor from 'markdown-it-anchor'
import { type MarkdownItWithMeta } from './markdownit'
import { slugify } from 'transliteration'

const makePermalink: CallableFunction = (pluginAnchor.permalink as any).makePermalink

const position = {
  false: 'push',
  true: 'unshift',
  after: 'push',
  before: 'unshift'
}

const permalinkSymbolMeta = {
  isPermalinkSymbol: true
}

export default function plugin (md: MarkdownItWithMeta) {
  const pluginAnchorPermalinkCustom = makePermalink((slug, opts, anchorOpts, state, idx) => {
    const tokenHeadingOpen = state.tokens[idx]
    const linkTokens = [
      Object.assign(new state.Token('link_open', 'a', 1), {
        attrs: mergeDuplicateClassAttrs([
          ...(opts.class ? [['class', opts.class]] : []),
          ['href', opts.renderHref(slug, state)],
          ...(opts.ariaHidden ? [['aria-hidden', 'true']] : []),
          ...Object.entries(opts.renderAttrs(slug, state))
        ])
      }),
      Object.assign(new state.Token('html_inline', '', 0), { content: tokenHeadingOpen.markup ?? opts.symbol, meta: permalinkSymbolMeta }),
      new state.Token('link_close', 'a', -1)
    ]

    if (opts.space) {
      const space = typeof opts.space === 'string' ? opts.space : ' '
      const type = typeof opts.space === 'string' ? 'html_inline' : 'text'
      state.tokens[idx + 1].children[position[opts.placement]](Object.assign(new state.Token(type, '', 0), { content: space }))
    }

    state.tokens[idx + 1].children[position[opts.placement]](...linkTokens)
  })

  md.use(pluginAnchor, {
    level: 2,
    slugify,
    permalink: pluginAnchorPermalinkCustom({
      placement: 'before',
      space: false,
    }),
  })
}

function mergeDuplicateClassAttrs(attrs) {
  const classValues: string[] = []
  const mergedAttrs = attrs.filter(([key, value]) => {
    if (key !== 'class') return true
    classValues.push(value)
  })

  if (classValues.length > 0) {
    mergedAttrs.unshift(['class', classValues.join(' ')])
  }

  return mergedAttrs
}
