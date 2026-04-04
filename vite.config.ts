import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), 'VITE_')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // proxy para mascarar a url e porta do backend, protegendo o backend de requisições externas
    proxy: {
      '^/api': {
        target: env.API_URL,
        changeOrigin: true, // permite que o backend receba a requisicao como se fosse local
        rewrite: (path) => path.replace(/^\/api/, '') // remove o /api do path para que o backend receba apenas a rota
      }
    }
  }
})
