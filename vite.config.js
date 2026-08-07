import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Deployed to GitHub Pages at https://hslojewski.github.io/portfolio, so
// built asset URLs need the /portfolio/ prefix - this mirrors what Create
// React App used to derive automatically from package.json's "homepage".
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
  },
});
