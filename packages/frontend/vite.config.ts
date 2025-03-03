import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

const isProduction = process.env.NODE_ENV === 'production';

const API_BASE_URL = isProduction
  ? 'https://your-production-api.com'
  : 'http://127.0.0.1:8000';

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer() as PluginOption],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../../webflow/frontend/dist'),
    emptyOutDir: true,
    minify: 'esbuild',
    sourcemap: !isProduction,
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    assetsInlineLimit: 0,
    terserOptions: {
      compress: {
        drop_console: isProduction,
        drop_debugger: isProduction,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: isProduction,
      },
    },
    fs: {
      strict: false,
    },
  },
});
