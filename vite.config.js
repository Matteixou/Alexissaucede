import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Three.js est ~900 KB minifié : c'est attendu et lazy-loadé, pas de panique
    chunkSizeWarningLimit: 1200,

    rollupOptions: {
      output: {
        // Découpage manuel des vendors pour maximiser le cache navigateur
        manualChunks: {
          // React core — ne change jamais entre les déploiements
          'vendor-react': ['react', 'react-dom'],
          // Framer Motion — dépendance stable
          'vendor-motion': ['framer-motion'],
          // Three.js + R3F — chunk séparé, chargé uniquement sur desktop
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
