import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
// TODO: see in future if it help with big templates etc.
// import minifyHTML from '@lit-labs/rollup-plugin-minify-html-literals'

export default defineConfig({
  root: 'src/frontend',
  envDir: __dirname,
  server: { proxy: { '/api': 'http://localhost:3000' }, open: true },
  plugins: [
    tailwindcss(),
    // minifyHTML()
  ],
  build: { outDir: '../../dist', emptyOutDir: true },
  clearScreen: false,
})
