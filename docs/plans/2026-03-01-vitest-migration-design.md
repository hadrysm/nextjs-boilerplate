# Vitest Migration & Project Restructuring Design

## Summary

Migrate from Jest to Vitest, flatten component structure (drop Atomic Design), move tests to root `__tests__/` with mirrored structure, remove Plop generator.

## Decisions

| Decision | Choice |
|----------|--------|
| Test framework | Vitest + jsdom |
| Component org | Flat folders under `src/components/` |
| Test location | Root `__tests__/` mirroring `src/` paths |
| Test utils | `__tests__/test-utils.tsx` + `__tests__/setup.ts` |
| Mocks | `__tests__/__mocks__/` |
| Plop | Remove entirely |

## Project Structure (After)

```
nextjs-boilerplate/
├── __tests__/
│   ├── __mocks__/
│   │   ├── fileMock.js
│   │   └── styleMock.js
│   ├── setup.ts
│   ├── test-utils.tsx
│   ├── components/
│   │   ├── Example/
│   │   │   └── Example.test.tsx
│   │   ├── MainLayout/
│   │   │   └── MainLayout.test.tsx
│   │   └── MainProvider/
│   │       └── MainProvider.test.tsx
│   ├── lib/
│   └── app/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── Example/
│   │   │   ├── Example.tsx
│   │   │   ├── Example.stories.tsx
│   │   │   └── index.ts
│   │   ├── MainLayout/
│   │   │   ├── MainLayout.tsx
│   │   │   └── index.ts
│   │   └── MainProvider/
│   │       ├── MainProvider.tsx
│   │       └── index.ts
│   ├── hooks/
│   ├── lib/
│   └── styles/
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

## Removed

- `jest.config.js`, `jest.setup.js`, `.jest/` folder
- `__mocks__/` at root (moved into `__tests__/`)
- `.plop/` folder and plop dependency
- `src/components/atoms/`, `molecules/`, `organisms/`, `templates/`
- Jest packages: `jest`, `@types/jest`, `jest-environment-jsdom`, `jest-watch-typeahead`, `babel-jest`, `identity-obj-proxy`

## Vitest Config

```ts
// vitest.config.ts
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['__tests__/**/*.test.{ts,tsx}'],
    setupFiles: ['__tests__/setup.ts'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['**/*.d.ts', '**/*.stories.*', 'src/app/layout.tsx'],
      thresholds: { branches: 70, functions: 70, lines: 70, statements: 70 },
      reporter: ['json', 'html'],
    },
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
  resolve: {
    alias: {
      '@/components': resolve(__dirname, 'src/components'),
      '@/lib': resolve(__dirname, 'src/lib'),
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/tests': resolve(__dirname, '__tests__'),
      '@/mocks': resolve(__dirname, '__tests__/__mocks__'),
    },
  },
});
```

## Setup File

```ts
// __tests__/setup.ts
import '@testing-library/jest-dom/vitest';
```

## Scripts

```json
{
  "test": "vitest run",
  "test:coverage": "vitest run --coverage",
  "test:watch": "vitest",
  "test:ci": "vitest run"
}
```

## Test Migration

- Component imports change from relative (`'./'`) to alias (`'@/components/Example'`)
- `@/tests` alias resolves to `__tests__/` instead of `.jest/`
- `@/mocks` alias resolves to `__tests__/__mocks__/`
- Remove `@/pages` alias (no pages dir in App Router)
- CI job renamed from `jest-check` to `test-check`

## Unresolved Questions

None — all decisions confirmed.
