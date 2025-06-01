import { defineConfig } from 'astro/config';
import { directory } from "./src/settings";


const SUB_DIR = `/${directory}`;

export default defineConfig({
  base: SUB_DIR,
  outDir: `./dist${SUB_DIR}`,
  site: 'https://www.tv-asahi.co.jp',
  compressHTML: false,
  build: {
    assets: 'assets',
    inlineStylesheets: 'never',
    format: 'preserve',
  },
  vite: {
    server: true,
    resolve: {
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@pages': '/src/pages',
        '@scripts': '/src/scripts',
        '@styles': '/src/styles',
        '@images': '/src/images',
        '@templates': '/src/templates',
        '@settings': '/src/settings.js',
      },
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          entryFileNames: `assets/scripts/entry.[hash].js`,
          chunkFileNames: `assets/scripts/chunk.[hash].js`,
          assetFileNames: (asset) => {
            console.log(asset.name);
            let extType = asset.name.split('.').at(-1);
            if (/png|jpe?g|webp|avif|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'images';
            }
            if (/css|scss/i.test(extType)) {
              extType = 'styles';
            }
            if (/woff|woff2/i.test(extType)) {
              extType = 'fonts';
            }
            return `assets/${extType}/[name][extname]`;
          },
        },
      },
    },
    server: {
      proxy: {
        '/post/': {
          target: 'https://www.tv-asahi.co.jp/',
          changeOrigin: true
        },
        '/common/': {
          target: 'https://www.tv-asahi.co.jp/',
          changeOrigin: true
        },
        '/commons/': {
          target: 'https://www.tv-asahi.co.jp/',
          changeOrigin: true
        },
      }
    },
  },
  devToolbar: {
    enabled: false
  },
});

