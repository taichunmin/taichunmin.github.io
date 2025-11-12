import _ from 'lodash'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

const langAliasMap = {
  vue: 'markup',
  html: 'markup',
  md: 'markdown',
  rb: 'ruby',
  ts: 'typescript',
  py: 'python',
  sh: 'bash',
  yml: 'yaml',
  styl: 'stylus',
  kt: 'kotlin',
  rs: 'rust'
}

const noHighlightExts = ['', 'mermaid', 'plain', 'text']

function wrapText (code: string, lang: string): string {
  if (lang === 'mermaid') return `<pre v-pre class="rounded ${lang}">${_.escape(code)}</pre>`
  return `<pre v-pre class="rounded language-${lang}"><code>${_.escape(code)}</code></pre>`
}

const render = (str: string, lang: string, attrs: string): string => {
  lang = _.toLower(_.trim(lang) ?? 'text')

  // disable highlight for certain languages
  if (_.includes(noHighlightExts, lang)) return wrapText(str, lang)

  let prismLang: string = 'plain'
  for (const tmp of [lang, langAliasMap[lang] ?? lang]) {
    try {
      if (_.isNil(Prism.languages[tmp])) loadLanguages([tmp])
    } catch (err) {
      continue
    }
    if (!_.isNil(Prism.languages[tmp])) {
      prismLang = tmp
      break
    }
  }

  if (_.isNil(Prism.languages[prismLang])) {
    console.log(`Syntax highlight for language "${lang}" is not supported.`)
    return wrapText(str, lang)
  }
  const code = Prism.highlight(str, Prism.languages[prismLang], lang)
  return `<pre class="rounded language-${lang}"><code>${code}</code></pre>`
}

export default render
