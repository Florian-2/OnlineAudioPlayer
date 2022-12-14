import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },  
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000',
      '^/music/': 'http://localhost:8000',
      '^/thumbnail/': 'http://localhost:8000',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/mixins";
          @import "@/assets/scss/base.scss";
        `
      }
    }
  }
});