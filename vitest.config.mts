import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    server: {
      deps: { inline: ['next-intl', 'next-auth'] },
    },
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.ts'],
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/src/__tests__/**',
        '**/src/setupTests.ts',
        '.next/**',
        '*.config.*',
        '**/src/i18n/**',
        'next-env.d.ts',
        '**/src/middleware.ts',
        '**/src/generated/**',
        '**/src/interfaces/**',
      ],
      ignoreEmptyLines: true,
    },
  },
});
