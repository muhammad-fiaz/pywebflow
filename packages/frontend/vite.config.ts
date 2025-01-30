import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
   server: {
    proxy: {
      '/api/nodes': 'https://127.0.01:8000',
        '/api/edges': 'https://127.0.01:8000',
    },
  },

})
