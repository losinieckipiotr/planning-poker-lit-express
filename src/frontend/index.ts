import { unsafeCSS } from 'lit'
import { DARK_THEME, LIGHT_THEME, THEME_ATTRIBUTE } from './enums.js'
import type { Theme } from './types.js'

startApp()

async function startApp() {
  await Promise.all([loadStyleSheet(), loadPolyfills()])

  initColorSchemes()

  // lazy load main app component
  import('./components/PpApp.js')
}

async function loadStyleSheet() {
  const link = document.querySelector<HTMLLinkElement>('[rel="stylesheet"]')!

  const rsp = await fetch(link.href, {
    headers: { accept: 'text/css' },
    cache: 'force-cache',
  })
  const text = await rsp.text()

  const globalStyles = unsafeCSS(text)

  window.globalStyles = globalStyles
}

async function loadPolyfills() {
  if (!globalThis.URLPattern) {
    await import('urlpattern-polyfill')
  }
}

function initColorSchemes() {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
  const savedTheme = localStorage.getItem(THEME_ATTRIBUTE) as Theme | null
  const initialTheme =
    savedTheme ? savedTheme
    : prefersDarkScheme.matches ? DARK_THEME
    : LIGHT_THEME

  if (!savedTheme) {
    localStorage.setItem(THEME_ATTRIBUTE, initialTheme)
  }

  const rootEl = document.querySelector('html')!

  rootEl.setAttribute(THEME_ATTRIBUTE, initialTheme)
}
