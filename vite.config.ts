import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
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
          target: env.VITE_API_URL,
          changeOrigin: true, // permite que o backend receba a requisicao como se fosse local
          rewrite: (path) => path.replace(/^\/api/, '') // remove o /api do path para que o backend receba apenas a rota
        }
      }
    }
  }
})
