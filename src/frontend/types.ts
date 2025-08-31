export type Theme = 'corporate' | 'business-lp'

declare global {
  interface Window {
    globalStyles: CSSStyleSheet
  }
}
