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

  router: Router = new Router(this, [
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
        <pp-new-game
          @go-to-room=${(event: CustomEvent<number>) => {
            const roomId = event.detail
            console.log('go-to-room event', { roomId })
            // window.history.back()
            // window.history.replaceState({}, '', `room/${roomId}`)
            window.history.pushState({}, '', `room/${roomId}`)
            this.router.goto(`/room/${roomId}`)
          }}
          class="contents"
        ></pp-new-game>
      `,
    },
    {
      path: '/room/:roomId',
      enter: async () => {
        await import('./PPRoom.js')
        return true
      },
      render: ({ roomId }) => {
        const roomIdNum = parseInt(roomId || '0')
        console.log('render pp-room component', { roomId, roomIdNum })
        return html`
          <pp-room
            .roomId=${roomIdNum}
            class="contents"
          ></pp-room>
        `
      },
    },
    {
      path: '/*',
      render: () => html`
        <div class="bg-accent grid w-full place-items-center">
          <h1 class="text-4xl font-bold">WTF</h1>
        </div>
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

    const outlet = this.router.outlet()
    // console.log({ outlet })

    return html`
      <main class="flex flex-1">${outlet}</main>
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
