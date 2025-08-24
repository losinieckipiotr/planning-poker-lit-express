import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

declare global {
  interface HTMLElementTagNameMap {
    'pp-new-game': PpNewGame
  }
}

@customElement('pp-new-game')
export class PpNewGame extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this
  }

  protected render(): unknown {
    return html`
      <div class="flex w-100 flex-col gap-4 self-center p-[24px]">
        <h1 class="text-3xl font-bold">New game</h1>
        <p>To start a new game just enter a game name and that's all.</p>
        <div class="divider"></div>
        <form
          class="w-full"
          @submit=${(event: SubmitEvent) => {
            console.log({ event })
            event.preventDefault()
          }}
        >
          <div class="flex flex-col items-end gap-4">
            <label class="floating-label mb-4 w-full text-lg">
              <span>Enter a game name</span>
              <input
                type="text"
                class="input input-xl w-full"
                placeholder="Enter a game name"
                list="names"
                minlength="3"
                maxlength="30"
              />
              <datalist id="names">
                <option value="Team's name planning"></option>
                <option value="Sprint planning"></option>
                <option value="Planning poker"></option>
              </datalist>
            </label>
            <ul class="menu menu-horizontal rounded-box flex gap-2 p-0">
              <li>
                <button
                  type="submit"
                  class="btn btn-accent btn-lg"
                >
                  Submit
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="btn btn-neutral btn-lg"
                >
                  Cancel
                </button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    `
  }
}
