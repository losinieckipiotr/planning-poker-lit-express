import { DARK_THEME, LIGHT_THEME, THEME_ATTRIBUTE } from './enums.js'
import type { Theme } from './types.js'

export function initColorSchemes() {
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
