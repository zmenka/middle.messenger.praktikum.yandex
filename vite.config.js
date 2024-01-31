import { resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import url from 'url';
import path from 'path';
import { buildSync } from 'esbuild';
import { join } from 'node:path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: resolve(__dirname, 'client'),
  publicDir: resolve(__dirname, 'static'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  // define: {
  //   // __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  //   VITE_TEST: '1232-3232',
  // },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  plugins: [
    {
      name: 'build-sw',
      apply: 'build', // вызывать плагиен только при сборке
      enforce: 'post', // вызывать после Vite core plugins
      transformIndexHtml() {
        buildSync({
          minify: true,
          bundle: true,
          entryPoints: [join(process.cwd(), 'service-worker.js')],
          outfile: join(process.cwd(), 'dist', 'service-worker.js'),
        });
      },
    },
  ],
});
