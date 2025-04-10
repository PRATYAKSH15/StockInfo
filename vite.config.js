import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        'nse': {
          'primary': '#1f3a8a',
          'secondary': '#3b82f6',
        },
        'bse': {
          'primary': '#065f46',
          'secondary': '#10b981',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  animations: {
    priceUp: 'priceUp 1s ease-in-out',
    priceDown: 'priceDown 1s ease-in-out'
  }
})
