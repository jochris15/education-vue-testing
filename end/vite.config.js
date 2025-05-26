import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],
  test: {
    globals: true, // Mengaktifkan global API seperti `describe`, `it`, dll.
    environment: 'jsdom', // Menggunakan jsdom sebagai environment testing
    transformMode: {
      web: [/\.[jt]sx?$/], // Mengaktifkan transformasi untuk file .js, .jsx, .ts, dan .tsx
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
