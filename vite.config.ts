import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
import { prerenderMeta } from './build/prerender';

// Caminho base do site.
// GitHub Pages sem domínio próprio: /chapavitalbrazil/
// O workflow lê o caminho em Settings > Pages: /chapavitalbrazil/ ou / (domínio próprio).
// Normaliza para uma barra no início e uma no fim ("", "/x", "/x/", "/x//" → "/x/").
const base = `/${(process.env.BASE_PATH ?? '/').replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/');

export default defineConfig({
  base,
  define: {
    // Endereço público usado nos links compartilhados (ver src/config/site.ts)
    __SITE_URL__: JSON.stringify(process.env.SITE_URL ?? 'https://chapavitalbrazil.com.br'),
  },
  plugins: [react(), tailwindcss(), imagetools(), prerenderMeta()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-dom') || id.includes('node_modules/motion-utils')) return 'motion';
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react';
          return undefined;
        },
      },
    },
  },
});
