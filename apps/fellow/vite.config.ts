/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const HTTP_API_URL = env?.VITE_ORIGINAL_HTTP_API_URL;

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/fellow',
    server: {
      port: 4200,
      host: true,
      proxy: {
        '/api': {
          target: HTTP_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    preview: {
      port: 4300,
      host: true,
    },

    plugins: [
      react(),
      nxViteTsPaths(),
      VitePWA({
        mode: 'production',
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: 'fellow',
          short_name: 'fellow',
        },
      }),
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    build: {
      outDir: '../../dist/apps/fellow',
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },

    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/fellow',
        provider: 'v8',
      },
    },
  };
});
