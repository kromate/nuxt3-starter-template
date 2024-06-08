import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'
import app from './app_config'

export default {
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss'],

  dir: {
    layouts: './src/layouts',
    pages: './src/pages',
    middleware: './src/middlewares'
  },
  components: [
    '@/components',
    { path: '@/components/core', extensions: ['vue'] }
  ],

    css: ['@/assets/css/main.css'],
  alias: {
    '@': './src'
  },
  vite: {

    plugins: [
      eslintPlugin({ useEslintrc: true, exclude: ['**/node_modules/**'] })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  },
  app
}
