import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      // 只要遇到 /v1/api 前缀的请求，都转发到 8080
      '/v1/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path, // 不修改path
      },
    },
  }
})