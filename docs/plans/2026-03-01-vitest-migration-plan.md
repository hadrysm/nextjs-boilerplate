# Vitest Migration & Project Restructuring Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Jest with Vitest, flatten atomic component folders, move tests to root `__tests__/` with mirrored structure, remove Plop.

**Architecture:** Vitest + jsdom + @vitejs/plugin-react. Tests live in `__tests__/` mirroring `src/` paths. Components flat under `src/components/`.

**Tech Stack:** Vitest, @vitejs/plugin-react, jsdom, @testing-library/react, @testing-library/jest-dom

---

### Task 1: Remove Jest packages and Plop

**Files:**
- Modify: `package.json`
- Delete: `jest.config.js`, `jest.setup.js`, `.jest/` folder, `.plop/` folder

**Step 1: Uninstall Jest and Plop packages**

Run:
```bash
pnpm remove jest @types/jest jest-environment-jsdom jest-watch-typeahead babel-jest identity-obj-proxy plop
```

**Step 2: Delete Jest config files and Plop directory**

Run:
```bash
rm jest.config.js jest.setup.js
rm -rf .jest .plop
```

**Step 3: Remove generate script and update description in package.json**

In `package.json`, remove the `"generate"` script line:
```diff
-    "generate": "pnpm plop --plopfile ./.plop/plopfile.js"
```

Update `description` to:
```json
"description": "Next.js boilerplate with husky, lint-staged, biome, vitest, react-testing-library, storybook and ghaction."
```

**Step 4: Commit**

```bash
git add -A
git commit -m "build: remove Jest, Plop, and related config files"
```

---

### Task 2: Install Vitest and create config

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `__tests__/setup.ts`

**Step 1: Install Vitest packages**

Run:
```bash
pnpm add -D vitest @vitejs/plugin-react jsdom
```

**Step 2: Create `vitest.config.ts`**

```ts
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

**Step 3: Create `__tests__/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

**Step 4: Update scripts in `package.json`**

Replace test scripts:
```json
"test": "vitest run",
"test:coverage": "vitest run --coverage",
"test:watch": "vitest",
"test:ci": "vitest run"
```

**Step 5: Commit**

```bash
git add vitest.config.ts __tests__/setup.ts package.json pnpm-lock.yaml
git commit -m "build: add Vitest config, setup file, and update test scripts"
```

---

### Task 3: Move mocks and test-utils to `__tests__/`

**Files:**
- Move: `__mocks__/fileMock.js` → `__tests__/__mocks__/fileMock.js`
- Move: `__mocks__/styleMock.js` → `__tests__/__mocks__/styleMock.js`
- Create: `__tests__/test-utils.tsx` (from `.jest/test-utils.tsx`)
- Delete: `__mocks__/` root folder

**Step 1: Create directories and move mocks**

Run:
```bash
mkdir -p __tests__/__mocks__
mv __mocks__/fileMock.js __tests__/__mocks__/fileMock.js
mv __mocks__/styleMock.js __tests__/__mocks__/styleMock.js
rm -rf __mocks__
```

**Step 2: Create `__tests__/test-utils.tsx`**

Same content as the old `.jest/test-utils.tsx`:

```tsx
import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

type ProvidersProps = {
  readonly children?: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return children;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

**Step 3: Commit**

```bash
git add -A
git commit -m "build: move mocks and test-utils into __tests__/"
```

---

### Task 4: Flatten component structure

**Files:**
- Move: `src/components/atoms/Example/` → `src/components/Example/`
- Move: `src/components/providers/MainProvider/` → `src/components/MainProvider/`
- Move: `src/components/templates/MainLayout/` → `src/components/MainLayout/`
- Delete: `src/components/atoms/`, `molecules/`, `organisms/`, `templates/`, `providers/`
- Modify: `src/app/layout.tsx` (update imports)

**Step 1: Move components to flat structure**

Run:
```bash
mv src/components/atoms/Example src/components/Example
mv src/components/providers/MainProvider src/components/MainProvider
mv src/components/templates/MainLayout src/components/MainLayout
rm -rf src/components/atoms src/components/molecules src/components/organisms src/components/templates src/components/providers
```

**Step 2: Update imports in `src/app/layout.tsx`**

Change:
```tsx
import { MainProvider } from '@/components/providers/MainProvider';
import { MainLayout } from '@/components/templates/MainLayout';
```
To:
```tsx
import { MainProvider } from '@/components/MainProvider';
import { MainLayout } from '@/components/MainLayout';
```

**Step 3: Update Storybook story title in `src/components/Example/Example.stories.tsx`**

Change:
```tsx
  title: 'toms/Example',
```
To:
```tsx
  title: 'Components/Example',
```

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: flatten component structure, remove atomic design folders"
```

---

### Task 5: Move tests to `__tests__/` and update imports

**Files:**
- Move: `src/components/Example/Example.test.tsx` → `__tests__/components/Example/Example.test.tsx`
- Move: `src/components/MainProvider/MainProvider.test.tsx` → `__tests__/components/MainProvider/MainProvider.test.tsx`
- Move: `src/components/MainLayout/MainLayout.test.tsx` → `__tests__/components/MainLayout/MainLayout.test.tsx`

**Step 1: Create test directories**

Run:
```bash
mkdir -p __tests__/components/Example __tests__/components/MainLayout __tests__/components/MainProvider
```

**Step 2: Move test files**

Run:
```bash
mv src/components/Example/Example.test.tsx __tests__/components/Example/Example.test.tsx
mv src/components/MainProvider/MainProvider.test.tsx __tests__/components/MainProvider/MainProvider.test.tsx
mv src/components/MainLayout/MainLayout.test.tsx __tests__/components/MainLayout/MainLayout.test.tsx
```

**Step 3: Update imports in all test files**

Tests previously imported from `'.'` (colocated). Now they import via alias.

`__tests__/components/Example/Example.test.tsx`:
```tsx
import { render, screen } from '@/tests/test-utils';

import { Example } from '@/components/Example';

describe('Example', () => {
  it('should render the heading', () => {
    render(<Example>Example</Example>);

    screen.getByRole('heading', { name: /Example/i });
  });
});
```

`__tests__/components/MainProvider/MainProvider.test.tsx`:
```tsx
import { render, screen } from '@/tests/test-utils';

import { MainProvider } from '@/components/MainProvider';

describe('MainProvider', () => {
  it('should render the children components', () => {
    render(
      <MainProvider>
        <h1>MainLayout children</h1>
      </MainProvider>
    );

    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
```

Note: `MainProvider` no longer accepts `pageProps` — it was removed in the source. The test should match the current component signature `({ children }: Props)`.

`__tests__/components/MainLayout/MainLayout.test.tsx`:
```tsx
import { render, screen } from '@/tests/test-utils';

import { MainLayout } from '@/components/MainLayout';

describe('MainLayout', () => {
  it('should render the children components', () => {
    render(
      <MainLayout>
        <h1>MainLayout children</h1>
      </MainLayout>
    );

    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
```

**Step 4: Commit**

```bash
git add -A
git commit -m "test: move tests to __tests__/ with mirrored structure, update imports"
```

---

### Task 6: Update tsconfig.json path aliases

**Files:**
- Modify: `tsconfig.json`

**Step 1: Update path aliases**

Replace paths in `tsconfig.json`:
```json
"paths": {
  "@/components/*": ["./src/components/*"],
  "@/lib/*": ["./src/lib/*"],
  "@/hooks/*": ["./src/hooks/*"],
  "@/styles/*": ["./src/styles/*"],
  "@/mocks/*": ["./__tests__/__mocks__/*"],
  "@/tests/*": ["./__tests__/*"]
}
```

Removed: `@/pages/*` (no pages dir in App Router).
Changed: `@/mocks/*` now points to `__tests__/__mocks__/`, `@/tests/*` now points to `__tests__/`.

**Step 2: Commit**

```bash
git add tsconfig.json
git commit -m "build: update tsconfig path aliases for new test and mock locations"
```

---

### Task 7: Update CI workflow

**Files:**
- Modify: `.github/workflows/main.yml`

**Step 1: Rename jest-check to test-check**

In `.github/workflows/main.yml`, replace the `jest-check` job:

```yaml
  test-check:
    name: Tests - vitest
    needs: [biome-check]
    runs-on: ubuntu-latest
    env:
      SKIP_ENV_VALIDATION: ${{ secrets.SKIP_ENV_VALIDATION }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
      - name: Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 24
      - name: Install dependencies
        run: pnpm install
      - name: Run tests
        run: pnpm test:ci
        env:
          CI: true
```

Update references from `jest-check` to `test-check` in the `needs` arrays of `nextjs-build-check` and `storybook-build-check`.

**Step 2: Commit**

```bash
git add .github/workflows/main.yml
git commit -m "ci: rename jest-check to test-check, update to Vitest"
```

---

### Task 8: Update references in page content and metadata

**Files:**
- Modify: `src/app/page.tsx` — update features list (replace "Jest" with "Vitest", remove "Atomic Design")
- Modify: `src/app/layout.tsx` — update metadata description

**Step 1: Update `src/app/page.tsx`**

In the `featuresItems` array:
- Change `{ icon: '🧪', name: 'Jest' }` to `{ icon: '🧪', name: 'Vitest' }`
- Remove `{ icon: '💎', name: 'Atomic Design' }`

In the description paragraph, replace "Jest" with "Vitest", remove "Plop", remove references to Atomic Design.

**Step 2: Update `src/app/layout.tsx` metadata**

Update the `description` field to reflect Vitest instead of Jest and remove Plop mention.

**Step 3: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "docs: update page content and metadata to reflect Vitest migration"
```

---

### Task 9: Run tests and verify

**Step 1: Run the test suite**

Run:
```bash
pnpm test
```

Expected: All 3 tests pass (Example, MainProvider, MainLayout).

**Step 2: Run biome check**

Run:
```bash
pnpm check
```

Expected: No lint or format errors.

**Step 3: Run build**

Run:
```bash
pnpm build
```

Expected: Successful Next.js build with no errors.

**Step 4: Verify no leftover references**

Search for any remaining "jest" or "plop" references:
```bash
grep -ri "jest\|plop" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.json" --include="*.yml" --include="*.yaml" src/ __tests__/ .github/ package.json tsconfig.json
```

Expected: Only valid references (e.g. `@testing-library/jest-dom` is fine — it works with Vitest).

**Step 5: Fix any issues found, then commit if needed**

---

### Task 10: Final cleanup commit

**Step 1: Check for any untracked/modified files**

Run:
```bash
git status
```

**Step 2: Stage and commit any remaining changes**

```bash
git add -A
git commit -m "chore: final cleanup after Vitest migration"
```
