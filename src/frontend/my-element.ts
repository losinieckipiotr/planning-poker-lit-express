import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { GetUserReq, GetUserRsp } from '../backend/api/get-user.api'
import litLogo from './assets/lit.svg'
import { globalStyles } from './globalStyles'
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
  static styles = globalStyles

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

  private async onClick() {
    await this.fetchUser(this.count)
    this.count++
  }

  async fetchUser(id: number) {
    const params: GetUserReq = {
      data: {
        id,
      },
    }

    const rsp = await fetch('/api/get-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    const json = (await rsp.json()) as GetUserRsp

    if (json.status == 'ok') {
      console.log({
        status: rsp.status,
        statusText: rsp.statusText,
        headers: rsp.headers,
        user: json.data.user,
      })
    } else {
      console.log({
        status: rsp.status,
        statusText: rsp.statusText,
        headers: rsp.headers,
        error: json.error,
      })
    }
  }

  render() {
    const { count, docsHint } = this

    return html`
      <div class="flex justify-around">
        <a
          class="block p-10 transition duration-300 hover:drop-shadow-[0_0px_2rem_#646cffaa]"
          href="https://vite.dev"
          target="_blank"
        >
          <img
            src=${viteLogo}
            class="h-32"
            alt="Vite logo"
          />
        </a>
        <a
          class="block p-10 transition duration-300 hover:drop-shadow-[0_0px_2rem_#325cffaa]"
          href="https://lit.dev"
          target="_blank"
        >
          <img
            src=${litLogo}
            class="lit h-32"
            alt="Lit logo"
          />
        </a>
      </div>
      <slot></slot>
      <button
        class="m-[2rem] cursor-pointer rounded-lg border border-transparent bg-gray-300 px-3 py-2 font-medium transition-[border-color] duration-300 hover:border-[#646cff] dark:bg-stone-900"
        @click=${this.onClick}
        part="button"
      >
        count is ${count}
      </button>
      <p class="light:text-black/50 dark:text-white/50">${docsHint}</p>
    `
  }
}
