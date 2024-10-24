import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from 'vite-plugin-tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
  },
})
