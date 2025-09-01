import { unsafeCSS } from 'lit'

export async function loadStyleSheet() {
  const link = document.querySelector<HTMLLinkElement>('[rel="stylesheet"]')!

  const rsp = await fetch(link.href, {
    headers: { accept: 'text/css' },
    cache: 'force-cache',
  })
  const text = await rsp.text()

  const globalStyles = unsafeCSS(text)

  window.globalStyles = globalStyles
}
