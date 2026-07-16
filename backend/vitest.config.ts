import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Restrict test execution strictly to the src directory to avoid discovering compiled JS files inside dist
    include: ['src/__tests__/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
  },
});
