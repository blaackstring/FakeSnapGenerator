import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve:{// for not writing all the path
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
server:{
  proxy:{
    '/api':{
      target:'http://localhost:3000',
    }
  }
},
theme: {
  extend: {
    colors: {
      // Override or avoid oklab-based colors
    },
  },
},

})
