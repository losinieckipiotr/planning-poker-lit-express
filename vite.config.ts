import tailwindcss from '@tailwindcss/vite'
import minifyHTML from 'rollup-plugin-minify-html-literals'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    open: '/',
  },
  plugins: [
    tailwindcss(),
    // @ts-expect-error Common.JS export does not work with types ?
    minifyHTML.default(),
  ],
})
