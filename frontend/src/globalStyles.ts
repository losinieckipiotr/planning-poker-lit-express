import { cache } from 'lit/directives/cache.js'
import { html } from 'lit/static-html.js'

export const globalStyleLink = cache(
  html`<link rel="stylesheet" href="./src/index.css" />`,
)
