import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import './PpTheme.js'

declare global {
  interface HTMLElementTagNameMap {
    'pp-navbar': PpNavbar
  }
}

@customElement('pp-navbar')
export class PpNavbar extends LitElement {
  static styles = window.globalStyles

  onLinkClick(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement
    target.blur()
  }

  renderLinks() {
    return html`
      <li>
        <a
          href="/"
          @click=${this.onLinkClick}
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/newGame"
          @click=${this.onLinkClick}
        >
          Start game
        </a>
      </li>
    `
  }

  render() {
    return html`
      <head>
        <nav class="navbar bg-base-100 absolute top-0 left-0 shadow-sm">
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
                ${this.renderLinks()}
              </ul>
            </div>
            <a
              href="/"
              class="btn btn-ghost text-xl"
            >
              Planning Poker
            </a>
          </div>
          <div class="navbar-center hidden md:flex">
            <ul class="menu menu-horizontal px-1">
              ${this.renderLinks()}
            </ul>
          </div>
          <div class="navbar-end">
            <pp-theme class="block"></pp-theme>
          </div>
        </nav>
      </head>
    `
  }
}
