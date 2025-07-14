
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// No es necesario importar 'path' ni 'url' para la configuración de alias en Vite ESM

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.gif', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@assets': '/src/assets',
    },
  },
})
