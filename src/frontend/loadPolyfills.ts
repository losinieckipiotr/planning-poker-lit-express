export async function loadPollyfills() {
  // Conditional ESM module loading (Node.js and browser)
  // @ts-expect-error
  if (!globalThis.URLPattern) {
    await import('urlpattern-polyfill')
  }
}
