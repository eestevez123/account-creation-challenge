import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';

export default defineConfig({
  plugins: [react(), RubyPlugin()],
  resolve: {
    alias: {
      app: resolve(__dirname, './app'),
    },
  },
  server: {
    proxy: {
      // Proxy API calls to Rails backend during development
      '/api': 'http://localhost:3000',
    },
    host: 'localhost', // Ensure the dev server binds to localhost
    port: 3036, // Optional: Explicitly set the port for Vite
  },
});
