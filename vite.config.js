import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' + HashRouter => the built site works from any sub-folder / static host.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { chunkSizeWarningLimit: 900 },
});
