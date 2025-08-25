import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import debugdebugDivBorder from './src/vite/plugins/debugDivBorder'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    debugdebugDivBorder({
      injectInDev: false,
      injectInProd: false
    })
  ],
  server: {
    port: 8696,
    open: true
  },
})