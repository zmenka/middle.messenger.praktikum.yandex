import { resolve } from 'path';
import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    root: resolve(__dirname, 'client'),
    publicDir: resolve(__dirname, 'static'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
          input: {
              index: resolve(__dirname, 'client/index.html'),
          }
      }
    },
    css: {
        postcss: {
          plugins: [
            autoprefixer({})
          ],
        }
      }
})
