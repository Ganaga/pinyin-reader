import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  base: '/pinyin-reader/',  // GitHub Pages path

  // Build configuration
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    // Increase chunk size warning limit due to large pinyin.json
    chunkSizeWarningLimit: 10000
  },

  // Dev server configuration
  server: {
    port: 3000,
    open: true
  },

  // Public directory for static assets
  publicDir: 'public',

  // Plugin to copy Service Worker without bundling
  plugins: [
    {
      name: 'copy-sw',
      closeBundle() {
        try {
          // Copy service worker to dist root
          copyFileSync(
            resolve(__dirname, 'public/sw.js'),
            resolve(__dirname, 'dist/sw.js')
          );
          console.log('✓ Service Worker copied to dist/');
        } catch (error) {
          console.warn('Warning: Could not copy Service Worker:', error.message);
        }
      }
    }
  ]
});
