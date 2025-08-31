import { Router } from '@lit-labs/router'
import { LitElement, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'

declare global {
  interface HTMLElementTagNameMap {
    'pp-app': PpApp
  }
}

/**
 * This is a root web component for whole application.
 * @part main - styles `<main>` element
 */
@customElement('pp-app')
export class PpApp extends LitElement {
  static styles = window.globalStyles

  @state()
  navbarLoaded: boolean = false

  @state()
  footerLoaded: boolean = false

  connectedCallback() {
    super.connectedCallback()

    this.loadNavbar()
    this.loadFooter()
  }

  private router: Router = new Router(this, [
    {
      path: '/',
      render: () => html`
        <pp-hero class="contents"></pp-hero>
      `,
      enter: async () => {
        await import('./PpHero.js')
        return true
      },
    },
    {
      path: '/newGame',
      enter: async () => {
        await import('./PpNewGame.js')
        return true
      },
      render: () => html`
        <pp-new-game class="contents"></pp-new-game>
      `,
    },
    {
      path: '/*',
      render: () => html`
        <h1>TODO: 404 page</h1>
      `,
    },
  ])

  async loadNavbar() {
    await import('./PpNavbar.js')

    this.navbarLoaded = true
  }

  async loadFooter() {
    await import('./PpFooter.js')

    this.footerLoaded = true
  }

  renderNavbar() {
    return this.navbarLoaded ?
        html`
          <pp-navbar class="contents"></pp-navbar>
        `
      : nothing
  }

  renderMain() {
    // TODO: fix height, topbar and navbar now are absolute
    return html`
      <main class="flex flex-1">${this.router.outlet()}</main>
    `
  }

  renderFooter() {
    return this.footerLoaded ?
        html`
          <pp-footer class="contents"></pp-footer>
        `
      : nothing
  }

  render() {
    return [this.renderNavbar(), this.renderMain(), this.renderFooter()]
  }
}
