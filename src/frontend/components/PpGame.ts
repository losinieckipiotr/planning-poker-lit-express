import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

declare global {
  interface HTMLElementTagNameMap {
    'pp-game': PpGame
  }
}

@customElement('pp-game')
export class PpGame extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this
  }

  protected render(): unknown {
    return html`<h1>Game</h1>`
  }
}
