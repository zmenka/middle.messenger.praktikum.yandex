import { resolve } from 'path';
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer'
import fs from 'fs';

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
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'client/partials'),
        context: {
            appTitle: 'Praktikum messenger',
            signIn: {
              title: 'Sign In',
              fields: [
                { name: 'login', title: 'Login', type: 'text' }, 
                { name: 'password', title: 'Password', type: 'password', error: 'Wrong password'}
              ],
              button: { title: 'Sign In' },
              link: { url: '../sign-up/sign-up.html', title: 'Sign Up' },
            },
            signUp: {
              title: 'Sign Up',
              fields: [
                { name: 'first_name', title: 'First Name', type: 'text' }, 
                { name: 'second_name', title: 'Last Name', type: 'text' }, 
                { name: 'login', title: 'Login', type: 'text' }, 
                { name: 'email', title: 'Email', type: 'email' }, 
                { name: 'phone', title: 'Phone', type: 'tel' }, 
                { name: 'password', title: 'Password', type: 'password', error: 'Wrong password'}
              ],
              button: { title: 'Sign Up' },
              link: { url: '../sign-in/sign-in.html', title: 'Sign In' },
            },
            chats: [
              { author: 'Ivan Petrov', newMsgCount: 1, lastMsg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con' },
              { author: 'Dima Orlov', newMsgCount: 0, lastMsg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con' },
              { author: 'Olya Davidova', newMsgCount: 5, lastMsg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con' },
              { author: 'Friends', newMsgCount: 2, lastMsg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con' },
            ],
            currentChat: { author: 'Ivan Petrov' },
            profile: {
              fields: [
                { name: 'first_name', title: 'First Name', type: 'text' }, 
                { name: 'second_name', title: 'Last Name', type: 'text' }, 
                { name: 'display_name', title: 'Display Name', type: 'text' }, 
                { name: 'login', title: 'Login', type: 'text' }, 
                { name: 'email', title: 'Email', type: 'email' }, 
                { name: 'phone', title: 'Phone', type: 'tel' }, 
                { name: 'old_password', title: 'Old Password', type: 'password'},
                { name: 'new_password', title: 'New Password', type: 'password', error: 'Not same'}
              ],
            }
        },
        helpers: {
          svg: (value) => fs.readFileSync(__dirname + '/static/' + value + '.svg', 'utf8'),
        },
    })],
    css: {
        postcss: {
          plugins: [
            autoprefixer({}) // add options if needed
          ],
        }
      }
}) 
