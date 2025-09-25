import { getSiteurl } from './dotenv'

import { type MarkdownItWithMeta } from './markdownit'

const baseurl = getSiteurl()
const origin = new URL(getSiteurl()).origin

export default function plugin (md: MarkdownItWithMeta) {
  const orig = md.renderer.rules.link_open ?? function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // Add a new `target` attribute, or replace the value of the existing one.
    if ((new URL(tokens[idx].attrGet('href') ?? '', baseurl)?.origin) !== origin) tokens[idx].attrSet('target', '_blank')

    // Pass the token to the default renderer.
    return orig(tokens, idx, options, env, self)
  }
}

