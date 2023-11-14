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
              signin: resolve(__dirname, 'client/pages/sign-in/sign-in.html'),
              signup: resolve(__dirname, 'client/pages/sign-up/sign-up.html'),
              chats: resolve(__dirname, 'client/pages/chats/chats.html'),
              profile: resolve(__dirname, 'client/pages/profile/profile.html'),
              error404: resolve(__dirname, 'client/pages/404/404.html'),
              error500: resolve(__dirname, 'client/pages/500/500.html'),
          }
      }
    },
    css: {
        postcss: {
          plugins: [
            autoprefixer({}) // add options if needed
          ],
        }
      }
})
