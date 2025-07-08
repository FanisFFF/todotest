import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  ], test: {
    environment: 'jsdom',        // Use browser-like environment
    globals: true,               // Enable global test APIs like describe/it
    setupFiles: './src/setupTests.ts', // Run setup file before tests
    include: ['src/**/*.{test,spec}.{ts,tsx}'], // Test file patterns
  },

})
