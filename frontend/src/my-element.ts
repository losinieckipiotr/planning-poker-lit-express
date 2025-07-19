import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import litLogo from './assets/lit.svg'
import { globalStyleLink } from './globalStyles'
import viteLogo from '/vite.svg'

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  private _onClick() {
    this.count++
  }

  render() {
    const { count, docsHint } = this

    return html`
      ${globalStyleLink}
      <div class="flex justify-around">
        <a
          class="block p-10 transition duration-300 hover:drop-shadow-[0_0px_2rem_#646cffaa]"
          href="https://vite.dev"
          target="_blank"
        >
          <img src=${viteLogo} class="h-32" alt="Vite logo" />
        </a>
        <a
          class="block p-10 transition duration-300 hover:drop-shadow-[0_0px_2rem_#325cffaa]"
          href="https://lit.dev"
          target="_blank"
        >
          <img src=${litLogo} class="lit h-32" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <button
        class="m-[2rem] cursor-pointer rounded-lg border border-transparent bg-gray-300 px-3 py-2 font-medium transition-[border-color] duration-300 hover:border-[#646cff] dark:bg-stone-900"
        @click=${this._onClick}
        part="button"
      >
        count is ${count}
      </button>
      <p class="light:text-black/50 dark:text-white/50">${docsHint}</p>
    `
  }
}
