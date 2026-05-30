import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The hub is served from the domain root (thanhchungbtc.github.io/),
// so base stays '/'. Individual products are built as separate apps with
// their own base ('/{productName}/') and dropped into the published output.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
