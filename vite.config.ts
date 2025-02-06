import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['bfec0e53-84e1-4592-befd-fda82ae7ea19.lovableproject.com']
  }
})