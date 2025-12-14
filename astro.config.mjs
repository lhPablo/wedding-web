import { defineConfig } from 'astro/config';
import path from 'path';

// https://astro.build/config
export default defineConfig({
    devToolbar: {
      enabled: false
    },
    vite: {
      resolve: {
        alias: {
          '@components': path.resolve('./src/components'),
          '@layouts': path.resolve('./src/layouts'),
          '@lib': path.resolve('./src/lib'),
          '@data': path.resolve('./src/data'),
          '@styles': path.resolve('./src/styles'),
          '@assets': path.resolve('./src/assets')
        }
      }
    }
  });