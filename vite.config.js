import { resolve } from 'path';
import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    root: resolve(__dirname, 'client'),
    publicDir: resolve(__dirname, 'static'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true
    },
    css: {
        postcss: {
          plugins: [
            autoprefixer({})
          ],
        }
      }
})
