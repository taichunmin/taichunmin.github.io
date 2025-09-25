import jsyaml from 'js-yaml'
import _ from 'lodash'
import markdownit from 'markdown-it'
import markdownitAbbr from 'markdown-it-abbr'
import markdownitContainer from 'markdown-it-container'
import markdownitDeflist from 'markdown-it-deflist'
import markdownitFootnote from 'markdown-it-footnote'
import markdownitIns from 'markdown-it-ins'
import markdownitMark from 'markdown-it-mark'
import markdownitSub from 'markdown-it-sub'
import markdownitSup from 'markdown-it-sup'

const { 'markdown-it-imsize.js': markdownitImsize } = window

function highlightRender (code, lang) {
  const { Prism } = window
  if (!lang || /no(-?)highlight|plain|text|mermaid/.test(lang)) return
  //- console.log({ code, lang, highlight: Prism.highlight(code, Prism.languages[lang] || Prism.languages.plain, lang) })
  const result = Prism.highlight(code, Prism.languages[lang] ?? Prism.languages.plain, lang)
  return `<pre class="rounded language-${lang}"><code>${result}</code></pre>`
}

const md = markdownit('default', {
  breaks: true,
  highlight: highlightRender,
  html: true,
  langPrefix: '',
  linkify: true,
  typographer: true,
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
const origin = new URL(window.location).origin
// console.log(`origin = ${origin}`)
const oldRenderLinkOpen = md.renderer.rules.link_open ?? function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
}
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // Add a new `target` attribute, or replace the value of the existing one.
  if ((new URL(tokens[idx].attrGet('href') ?? '', location)?.origin) !== origin) tokens[idx].attrSet('target', '_blank')

  // Pass the token to the default renderer.
  return oldRenderLinkOpen(tokens, idx, options, env, self)
}

// yaml meta, references:
// https://github.com/eugeneware/remarkable-meta
// https://github.com/hackmdio/codimd/blob/master/public/js/extra.js
function metaRuler (state, startLine, endLine, silent) {
  // 必須寫在檔案開頭、不能有區塊縮排
  if (startLine !== 0 || state.blkIndent !== 0) return false

  // 如果空格數量比區塊空隔數量多 4 個空白，表示是 code block
  if (state.sCount[startLine] - state.blkIndent >= 4) return false

  // 非開始標記
  let pos = state.bMarks[startLine] + state.tShift[startLine]
  let max = state.eMarks[startLine]
  if (pos + 3 !== max || state.src.slice(pos, max) !== '---') return false

  // 尋找結束的行號
  let [nextLine, haveEndMarker] = [startLine, false]
  while (true) {
    nextLine++
    if (nextLine >= endLine) break // 已經到檔案結尾

    ;[pos, max] = [state.bMarks[nextLine] + state.tShift[nextLine], state.eMarks[nextLine]]
    if (pos < max && state.sCount[nextLine] < state.blkIndent) break // 區塊縮排減少代表區塊結束

    // 如果空格數量比區塊空隔數量多 4 個空白，表示是 code block
    if (state.sCount[nextLine] - state.blkIndent >= 4) continue
    // 非結束標記
    if (pos + 3 !== max || state.src.slice(pos, max) !== '---') continue

    // 成功找到結束標記
    haveEndMarker = true
    break
  }

  // 沒有找到結束標記
  if (!haveEndMarker) return false

  // 在 silent 模式下，就可以直接回傳 true
  if (silent) return true

  // 解析 yaml 內容
  const indent = state.sCount[startLine]
  try {
    const content = state.getLines(startLine + 1, nextLine, indent, true)
    md.meta = jsyaml.safeLoad(content) ?? {}
    md.metaError = null
  } catch (err) {
    md.meta = null
    md.metaError = err
    console.warn(err)
    return false
  }

  // 調整行號
  state.line = nextLine + 1
  return true
}

function metaPlugin (md) {
  md.meta = null
  md.metaError = null
  md.block.ruler.before('code', 'meta', metaRuler, {
    alt: []
  })
}

md.use(metaPlugin)

export function mdRender (str) {
  str = _.trim(str)
  const hasNewLine = str.indexOf('\n') >= 0
  return hasNewLine ? md.render(str) : md.renderInline(str)
}

export { md }
