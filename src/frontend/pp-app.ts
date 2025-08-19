import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import type { GetUserReq, GetUserRsp } from '../backend/api/get-user.api'

declare global {
  interface HTMLElementTagNameMap {
    'pp-app': PpApp
  }
}

@customElement('pp-app')
export class PpApp extends LitElement {
  // static styles = globalStyles

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this
  }

  async onCreateRoom() {
    const user = await fetchUser(6)

    if (user) {
      alert(`user: ${JSON.stringify(user, null, 2)}`)
    }
  }

  render() {
    // TODO: pp-app-menu-button aria-expanded
    return html`
      <head>
        <nav class="navbar bg-base-100 shadow-sm">
          <div class="navbar-start">
            <div class="dropdown">
              <button
                tabindex="0"
                class="btn btn-ghost md:hidden"
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
              <ul
                id="pp-app-menu"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                tabindex="0"
              >
                <li><a>Home</a></li>
                <li><a>Start game</a></li>
              </ul>
            </div>
            <a class="btn btn-ghost text-xl">Planning Poker</a>
          </div>
          <div class="navbar-center hidden md:flex">
            <ul class="menu menu-horizontal px-1">
              <li><a>Home</a></li>
              <li><a>Start game</a></li>
            </ul>
          </div>
          <div class="navbar-end">
            <button class="btn btn-ghost">
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
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </button>
            <button class="btn btn-ghost">
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
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            </button>
          </div>
        </nav>
      </head>
      <main class="hero bg-base-200 flex-1">
        <div class="hero-content">
          <div class="flex max-w-xl flex-col items-start">
            <h1 class="text-5xl font-bold">
              Scrum Poker application for agile teams
            </h1>
            <p class="py-6">Easy-to-use and fun estimations.</p>
            <button class="btn btn-primary">Start game</button>
          </div>
        </div>
      </main>
      <footer
        class="footer sm:footer-horizontal bg-neutral text-neutral-content items-center justify-between gap-y-6 p-4"
      >
        <div class="grid-flow-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
              clip-rule="evenodd"
            />
          </svg>
          <p>Copyright © ${new Date().getFullYear()} - All right reserved</p>
        </div>
        <nav
          class="grid-flow-col gap-4 md:place-self-center md:justify-self-end"
        >
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              ></path>
            </svg>
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
              ></path>
            </svg>
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
              ></path>
            </svg>
          </a>
        </nav>
      </footer>
    `
  }
}

async function fetchUser(id: number) {
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
