import minifyHTML from '@lit-labs/rollup-plugin-minify-html-literals'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/frontend',
  envDir: __dirname,
  server: { proxy: { '/api': 'http://localhost:3000' }, open: true },
  plugins: [tailwindcss(), minifyHTML()],
  build: { outDir: '../../dist', emptyOutDir: true },
  clearScreen: false,
})
