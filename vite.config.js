import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: '404.html',  // Ruta al archivo 404.html
          dest: '',  // Esto coloca 404.html directamente en la carpeta dist
        },
      ],
    }),
  ],
  build: {
    minify: false,  // Desactiva la minificación en producción
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/DEMO-Dubra/' : '/',
});
