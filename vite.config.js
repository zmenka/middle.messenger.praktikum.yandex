import { resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
});
