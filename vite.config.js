import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";
// import tailwindcss from 'vite-plugin-tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:5260',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
      '/api': 'http://localhost:5260',
      '/User': {
        target: 'http://localhost:5260', // Địa chỉ của backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/User/, '/api/User'), // Đảm bảo đúng đường dẫn API
      },
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
})
