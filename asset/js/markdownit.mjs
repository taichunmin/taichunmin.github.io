import markdownit from 'markdown-it'
import markdownitAbbr from 'markdown-it-abbr'
import markdownitContainer from 'markdown-it-container'
import markdownitDeflist from 'markdown-it-deflist'
import markdownitFootnote from 'markdown-it-footnote'
import markdownitIns from 'markdown-it-ins'
import markdownitMark from 'markdown-it-mark'
import markdownitSub from 'markdown-it-sub'
import markdownitSup from 'markdown-it-sup'
import _ from 'lodash'

const { 'markdown-it-imsize.js': markdownitImsize } = window

const md = markdownit('default', {
  html: true,
  langPrefix: '',
  linkify: true,
  typographer: true,

  highlight (code, lang) {
    const { Prism } = window
    if (!lang || /no(-?)highlight|plain|text|mermaid/.test(lang)) return
    //- console.log({ code, lang, highlight: Prism.highlight(code, Prism.languages[lang] || Prism.languages.plain, lang) })
    const result = Prism.highlight(code, Prism.languages[lang] || Prism.languages.plain, lang)
    return `<pre class="rounded language-${lang}"><code>${result}</code></pre>`
  },
})

for (const plugin of [
  markdownitAbbr,
  markdownitDeflist,
  markdownitFootnote,
  markdownitIns,
  markdownitMark,
  markdownitSub,
  markdownitSup,
]) md.use(plugin)


// bootstrap 5 alert types
const alertTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
const renderAlert = (tokens, idx, options, env, self) => {
  tokens[idx].attrJoin('role', 'alert')
  tokens[idx].attrJoin('class', 'alert')
  tokens[idx].attrJoin('class', `alert-${tokens[idx].info.trim().toLowerCase()}`)
  return self.renderToken(...arguments)
}
for (const alertType of alertTypes) md.use(markdownitContainer, alertType, { render: renderAlert })

if (!_.isNil(markdownitImsize)) md.use(markdownitImsize)

// add target="_blank" to links
// const origin = new URL(window.location).origin
console.log(`origin = ${origin}`)
const oldRenderLinkOpen = md.renderer.rules.link_open ?? function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
}
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // Add a new `target` attribute, or replace the value of the existing one.
  if ((new URL(tokens[idx].attrGet('href') ?? '', location)?.origin) !== origin) tokens[idx].attrSet('target', '_blank')

  // Pass the token to the default renderer.
  return oldRenderLinkOpen(tokens, idx, options, env, self)
}

export function mdRender (str) {
  str = _.trim(str)
  const hasNewLine = str.indexOf('\n') >= 0
  return hasNewLine ? md.render(str) : md.renderInline(str)
}

export { md }
