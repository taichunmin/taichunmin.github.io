import _ from 'lodash'
import markdownitContainer from 'markdown-it-container'
import { type RenderRule } from 'markdown-it/lib/renderer.mjs'
import { type MarkdownItWithMeta } from './markdownit'
import Token from 'markdown-it/lib/token.mjs'

// bootstrap 5 alert types
const alertTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

export default function plugin (md: MarkdownItWithMeta) {
  const validate = (params: string) => {
    return params.trim().match(/^\w+(\s+(.*))?$/)
  }

  const render: RenderRule = (tokens, idx, options, env, self) => {
    const [, alertType = 'info', alertHeader] = tokens[idx].info.trim().match(/^(\w+)(?:\s+(.*))?$/) ?? []
    let result = ''
    if (!_.isNil(alertType)) {
      tokens[idx].attrJoin('role', 'alert')
      tokens[idx].attrJoin('class', 'alert')
      tokens[idx].attrJoin('class', `alert-${alertType.toLowerCase()}`)
    }
    result += self.renderToken(tokens, idx, options)
    if (!_.isNil(alertHeader)) {
      result += `<h5 class="alert-heading">${md.utils.escapeHtml(alertHeader)}</h4>`
    }
    return result
  }

  for (const alertType of alertTypes) md.use(markdownitContainer, alertType, { validate, render })
}
