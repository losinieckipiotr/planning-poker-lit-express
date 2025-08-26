import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { globalStyles } from '../globalStyles'

declare global {
  interface HTMLElementTagNameMap {
    'pp-new-game': PpNewGame
  }
}

@customElement('pp-new-game')
export class PpNewGame extends LitElement {
  static styles = globalStyles

  // protected createRenderRoot(): HTMLElement | DocumentFragment {
  //   return this
  // }

  protected render(): unknown {
    return html`
      <div class="flex flex-col gap-4 self-center p-20">
        <h1 class="text-3xl font-bold">New game</h1>
        <p>To start a new game just enter a game name and that's all.</p>
        <div class="divider"></div>
        <form
          id="star-game-form"
          class="w-full"
          @submit=${(event: SubmitEvent) => {
            const form = event.currentTarget as HTMLFormElement
            const formData = Object.fromEntries(new FormData(form))
            console.log({ formData })
            // TODO: sent to backend

            event.preventDefault()
          }}
        >
          <div class="flex flex-col items-end gap-4">
            <label class="floating-label mb-4 w-full text-lg">
              <span>Enter a game name</span>
              <input
                name="game-name"
                type="text"
                class="input input-xl input-primary w-full"
                placeholder="Enter a game name"
                list="names"
                minlength="3"
                maxlength="30"
              />
            </label>
            <ul
              class="menu menu-horizontal rounded-box mt-4 flex w-full flex-row flex-nowrap gap-4 p-0"
            >
              <li>
                <button
                  type="submit"
                  class="btn btn-primary btn-lg w-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                    />
                  </svg>
                  Play
                </button>
              </li>
              <li>
                <a
                  href="/"
                  class="btn btn-ghost btn-lg w-30"
                >
                  Cancel
                </a>
              </li>
            </ul>
          </div>
        </form>
      </div>
    `
  }
}
