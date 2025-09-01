// preload lit
import '@lit/reactive-element'
import 'lit-html'
import { initColorSchemes } from './initColorSchemes.js'
import { loadPolyfills } from './loadPolyfills.js'
import { loadStyleSheet } from './loadStyleSheet.js'

loadPolyfills()
initColorSchemes()
await loadStyleSheet()

// lazy load main app component
import('./components/PpApp.js')
