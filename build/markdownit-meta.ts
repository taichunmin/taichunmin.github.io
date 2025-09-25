import jsyaml from 'js-yaml'
import StateBlock from 'markdown-it/lib/rules_block/state_block.mjs'
import { type MarkdownItWithMeta } from './markdownit'

// yaml meta, references:
// https://github.com/eugeneware/remarkable-meta
// https://github.com/hackmdio/codimd/blob/master/public/js/extra.js
const createRuler = (md: MarkdownItWithMeta) => {
  return function metaRuler (state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {
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
      md.meta = jsyaml.load(content) ?? {}
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
}

export default function plugin (md: MarkdownItWithMeta) {
  md.meta = null
  md.metaError = null
  const ruler = createRuler(md)
  md.block.ruler.before('code', 'meta', ruler, {
    alt: []
  })
}
