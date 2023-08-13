import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@layout', replacement: path.resolve(__dirname, 'src/layout') },
      {
        find: '@core',
        replacement: path.resolve(__dirname, 'src/common/@core'),
      },
      {
        find: '@common',
        replacement: path.resolve(__dirname, 'src/common'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
      {
        find: '@redux',
        replacement: path.resolve(__dirname, 'src/redux'),
      },
    ],
  },
});
