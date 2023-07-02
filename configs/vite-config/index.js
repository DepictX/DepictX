import { resolve } from 'path'

const dirname = process.cwd();

// default vite config
export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(dirname, 'src/index.ts'),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(dirname, "src")
    },
  },
};
