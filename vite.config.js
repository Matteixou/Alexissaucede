import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    !isSsrBuild && ViteImageOptimizer({
      jpg: { quality: 82 },
      jpeg: { quality: 82 },
      png: { quality: 85 },
      webp: { lossless: false, quality: 82 },
      includePublic: true,
    }),
  ],

  build: {
    sourcemap: !isSsrBuild,
    copyPublicDir: !isSsrBuild,
    chunkSizeWarningLimit: 1200,
  },
}))
