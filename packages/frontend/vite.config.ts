import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

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
    sourcemap: false,
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    proxy: {
      '/api/nodes': 'http://127.0.0.1:8000',
      '/api/edges': 'http://127.0.0.1:8000',
      '/api/status': 'http://127.0.0.1:8000',
      '/api/filepaths': 'http://127.0.0.1:8000',
      '/api/sidebar': 'http://127.0.0.1:8000',
      '/api/config': 'http://127.0.0.1:8000',
      '/api/html': 'http://127.0.0.1:8000',
    },
    fs: {
      strict: false,
    },
  },
});
