import markdownitContainer from 'markdown-it-container'
import { type RenderRule } from 'markdown-it/lib/renderer.mjs'
import { type MarkdownItWithMeta } from './markdownit'

// bootstrap 5 alert types
const alertTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

const render: RenderRule = (tokens, idx, options, env, self) => {
  tokens[idx].attrJoin('role', 'alert')
  tokens[idx].attrJoin('class', 'alert')
  tokens[idx].attrJoin('class', `alert-${tokens[idx].info.trim().toLowerCase()}`)
  return self.renderToken(tokens, idx, options)
}

export default function plugin (md: MarkdownItWithMeta) {
  for (const alertType of alertTypes) md.use(markdownitContainer, alertType, { render })
}
