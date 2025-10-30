import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    alias: [
      { find: '@/domains', replacement: path.resolve(__dirname, 'src/domains') },
      { find: '@/shared', replacement: path.resolve(__dirname, 'src/domains/shared') },
      { find: '@siso/ui/', replacement: `${path.resolve(__dirname, 'src/components/ui/siso')}/` },
      { find: '@siso/ui', replacement: path.resolve(__dirname, 'src/components/ui/siso') },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});
