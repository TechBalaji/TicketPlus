import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { componentTagger } from "lovable-tagger"
import path from 'path'

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ['bfec0e53-84e1-4592-befd-fda82ae7ea19.lovableproject.com']
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ['lucide-react']
    }
  }
}));