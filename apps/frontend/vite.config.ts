import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// biome-ignore lint/style/noDefaultExport: vite requires default export
export default defineConfig({
  plugins: [react()],
});
