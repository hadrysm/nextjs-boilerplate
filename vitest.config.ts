import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.test.{ts,tsx}'],
    setupFiles: ['__tests__/setup.ts'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['**/*.d.ts', '**/*.stories.*', 'src/app/layout.tsx'],
      thresholds: { branches: 70, functions: 70, lines: 70, statements: 70 },
      reporter: ['json', 'html']
    },
    css: { modules: { classNameStrategy: 'non-scoped' } }
  },
  resolve: {
    alias: {
      '@/components': resolve(__dirname, 'src/components'),
      '@/lib': resolve(__dirname, 'src/lib'),
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/tests': resolve(__dirname, '__tests__'),
      '@/mocks': resolve(__dirname, '__tests__/__mocks__')
    }
  }
});
