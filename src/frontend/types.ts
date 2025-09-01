import type { CSSResult } from 'lit'
import { DARK_THEME, LIGHT_THEME } from './enums'
export type Theme = typeof LIGHT_THEME | typeof DARK_THEME

declare global {
  interface Window {
    globalStyles: CSSResult
  }
}
