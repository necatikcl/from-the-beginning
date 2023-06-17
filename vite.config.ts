import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import UnpluginVueComponents from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import WindiCSS from 'vite-plugin-windicss';

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
    WindiCSS(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/, /\.vue\?vue/,
        /\.md$/,
      ],
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': [
            'useMouse',
            ['useFetch', 'useMyFetch'],
          ],
        },
        {
          from: 'vue-router',
          imports: ['RouteLocationRaw'],
          type: true,
        },
      ],
      dirs: [
        'src/stores',
        'src/locale',
      ],
      dts: './auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
