import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    })
  ],
  server: {
    port: 5173,
    // Proxy is mainly for local dev - in production, use direct API calls
    proxy: {
      '/api': {
        target: 'https://careercraft-be-im3c.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure static assets are properly handled
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  // Base path for production (empty for root)
  base: '/',
  // Ensure public assets are copied correctly
  publicDir: 'public',
})

