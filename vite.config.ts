import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    allowedHosts: ['dev.alexissimonian.net']
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@use "/src/styles/_variables.scss" as *;`, }
    }
  }
});
