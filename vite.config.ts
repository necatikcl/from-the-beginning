import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import UnpluginVueComponents from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';

const Path = (path = '') => resolve(process.cwd(), ...path.split('/').filter(Boolean));

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    Pages({
      extendRoute: function extendRoute(route) {
        const clone = { ...route, props: false };

        clone.children &&= clone.children.map(extendRoute);

        return clone;
      },
    }),
    UnpluginVueComponents({
      dts: true,
      dirs: ['src/components'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/src/assets/styles/variables" as *;
          @use "/src/assets/styles/mixins" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@api': Path('/src/api'),
      '@assets': Path('/src/assets'),
      '@components': Path('/src/components'),
      '@composables': Path('/src/composables'),
      '@constants': Path('/src/constants'),
      '@directives': Path('/src/directives'),
      '@locale': Path('/src/locale'),
      '@stores': Path('/src/stores'),
      '@utils': Path('/src/utils'),
    },
  },
});
