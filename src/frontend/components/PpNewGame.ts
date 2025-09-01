import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import type { GetUserReq, GetUserRsp } from '../../backend/api/get-user.api.js'

async function fetchUser(id: number) {
  const params: GetUserReq = { data: { id } }

  const rsp = await fetch('/api/get-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    return json.data.user
  } else {
    console.log({
      status: rsp.status,
      statusText: rsp.statusText,
      headers: rsp.headers,
      error: json.error,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pp-new-game': PpNewGame
  }
}

@customElement('pp-new-game')
export class PpNewGame extends LitElement {
  static styles = window.globalStyles

  @state()
  room: boolean = false

  async onCreateRoom() {
    const user = await fetchUser(6)

    if (user) {
      console.log(`user: ${JSON.stringify(user, null, 2)}`)
      this.room = true
    }
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault()

    const form = event.currentTarget as HTMLFormElement
    const formData = Object.fromEntries(new FormData(form))
    console.log({ formData })
    // TODO: sent to backend

    this.onCreateRoom()
  }

  renderRoom() {
    return html`
      <div class="grid w-full place-items-center">
        <div
          class="bg-base-200 border-base-300 rounded-box border p-4 text-base"
        >
          <h1 class="text-2xl font-bold">Room 420 69</h1>
          <p>QR code? useless</p>
          <a class="link link-info block">
            https://www.planning-poker-lit-express.pl/room/42069
          </a>
          <button class="btn-primary block">Copy to clipboard</button>
        </div>
      </div>
    `
  }

  renderForm() {
    return html`
      <form
        @submit=${this.onSubmit}
        class="grid w-full place-items-center"
      >
        <fieldset
          class="fieldset bg-base-200 border-base-300 rounded-box border p-4 text-base"
        >
          <legend class="fieldset-legend text-2xl font-bold">New game</legend>
          <p>To start a new game just enter a game name and let's play!</p>
          <div class="divider"></div>
          <label>Game name</label>
          <input
            type="text"
            class="input input-lg input-primary mb-8 w-full"
            placeholder="Awesome team planning"
          />
          <ul
            class="menu menu-horizontal rounded-box flex w-[61.803%] flex-row flex-nowrap gap-4 p-0"
          >
            <li class="flex-1">
              <button
                type="submit"
                class="btn btn-primary w-full"
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
            <li class="flex-1">
              <a
                href="/"
                class="btn btn-ghost w-full"
              >
                Cancel
              </a>
            </li>
          </ul>
        </fieldset>
      </form>
    `
  }

  protected render() {
    const { room } = this
    return room ? this.renderRoom() : this.renderForm()
  }
}
