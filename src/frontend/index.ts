// preload lit
import '@lit/reactive-element'
import 'lit-html'
import { initColorSchemes } from './initColorSchemes.js'
import { loadPollyfills } from './loadPolyfills.js'
import { loadStyleSheet } from './loadStyleSheet.js'

loadPollyfills()
loadStyleSheet()
initColorSchemes()

// lazy load main app component
import('./components/PpApp.js')
