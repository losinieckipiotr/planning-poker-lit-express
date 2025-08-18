import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/frontend',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    open: '/',
  },
  plugins: [tailwindcss()],
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
})
