/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Overridden on GitHub Pages, which serves the app from /<repo>/.
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/index.ts', 'src/test/**', 'src/main.tsx'],
      // Set just under the current numbers: a drop fails the run, while small
      // gains do not force an edit here on every commit.
      thresholds: {
        statements: 80,
        branches: 72,
        functions: 76,
        lines: 80,
      },
    },
  },
})
