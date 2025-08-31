import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

declare global {
  interface HTMLElementTagNameMap {
    'pp-hero': PpHero
  }
}

@customElement('pp-hero')
export class PpHero extends LitElement {
  static styles = window.globalStyles

  render() {
    return html`
      <div class="hero bg-base-200 p-4">
        <div class="hero-content">
          <div class="flex max-w-xl flex-col items-start">
            <h1 class="text-5xl font-bold">
              Scrum Poker application for agile teams
            </h1>
            <p class="py-6">Easy-to-use and fun estimations.</p>
            <a
              class="btn btn-primary"
              href="/newGame"
            >
              Start game
            </a>
          </div>
        </div>
      </div>
    `
  }
}
