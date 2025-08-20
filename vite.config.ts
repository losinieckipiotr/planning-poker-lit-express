import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/frontend',
  envDir: __dirname,
  server: { proxy: { '/api': 'http://localhost:3000' }, open: true },
  plugins: [tailwindcss()],
  build: { outDir: '../../dist', emptyOutDir: true },
})
