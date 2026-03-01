# Full Dependency Update Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update all dependencies to latest versions including major bumps (React 19 stable, Next 16, Tailwind 4, Storybook 10, Jest 30, Zod 4, pnpm 10, Node >=24.13.0).

**Architecture:** Big bang approach — all changes in one branch. Update package.json versions, migrate config files for breaking changes (Tailwind CSS-first config, Storybook addon consolidation), update CI workflows, verify with build/test/lint.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Storybook 10, Jest 30, Zod 4, TypeScript 5.9, pnpm 10

---

### Task 1: Update package.json — dependencies and infrastructure

**Files:**

- Modify: `package.json`

**Step 1: Update package.json with all new versions**

Replace the entire `package.json` with updated versions. Key changes:

- All dependency versions bumped to latest
- Remove `autoprefixer` (built into TW4)
- Add `@tailwindcss/postcss`
- Remove `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-links`, `@storybook/blocks`
- Replace `@storybook/testing-library` with `@storybook/test`
- Remove `npm:types-react` aliases → use native `@types/react`
- Remove `pnpm.overrides` section
- Update `engines.node` to `>=24.13.0`
- Update `packageManager` to `pnpm@10.30.3`

```json
{
  "name": "nextjs-boilerplate",
  "version": "0.1.0",
  "description": "Next.js boilerplate with husky, lint-staged, eslint + prettier, jest, react-testing-library, storybook, ghaction and plop.",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "prettier:format": "prettier --write .",
    "prettier:check": "prettier --check \"**/*.{ts,tsx,json}\"",
    "lint": "next lint",
    "eslint:format": "eslint src --fix",
    "test": "jest test",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "postinstall": "husky",
    "generate": "pnpm plop --plopfile ./.plop/plopfile.js"
  },
  "engines": {
    "node": ">=24.13.0"
  },
  "packageManager": "pnpm@10.30.3",
  "dependencies": {
    "@t3-oss/env-nextjs": "0.13.10",
    "clsx": "2.1.1",
    "next": "16.1.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwind-merge": "3.5.0",
    "zod": "4.3.6"
  },
  "devDependencies": {
    "@eslint/compat": "2.0.2",
    "@eslint/eslintrc": "3.3.4",
    "@eslint/js": "9.39.3",
    "@storybook/nextjs": "10.2.10",
    "@storybook/react": "10.2.10",
    "@storybook/test": "10.2.10",
    "@tailwindcss/postcss": "4.2.1",
    "@testing-library/jest-dom": "6.9.1",
    "@testing-library/react": "16.3.2",
    "@testing-library/user-event": "14.6.1",
    "@types/jest": "30.0.0",
    "@types/node": "24.0.0",
    "@types/react": "19.2.14",
    "@types/react-dom": "19.2.3",
    "@typescript-eslint/eslint-plugin": "8.56.1",
    "@typescript-eslint/parser": "8.56.1",
    "babel-jest": "30.2.0",
    "eslint": "9.39.3",
    "eslint-config-next": "16.1.6",
    "eslint-config-prettier": "10.1.8",
    "eslint-plugin-import-helpers": "2.0.1",
    "eslint-plugin-prettier": "5.5.5",
    "eslint-plugin-react": "7.37.5",
    "eslint-plugin-react-hooks": "7.0.1",
    "eslint-plugin-storybook": "10.2.10",
    "eslint-plugin-testing-library": "7.16.0",
    "globals": "17.4.0",
    "husky": "9.1.7",
    "identity-obj-proxy": "3.0.0",
    "jest": "30.2.0",
    "jest-environment-jsdom": "30.2.0",
    "jest-watch-typeahead": "3.0.1",
    "lint-staged": "16.1.6",
    "pinst": "3.0.0",
    "plop": "4.0.5",
    "postcss": "8.5.6",
    "prettier": "3.8.1",
    "prettier-plugin-tailwindcss": "0.7.2",
    "storybook": "10.1.11",
    "tailwind-scrollbar": "4.0.2",
    "tailwindcss": "4.2.1",
    "typescript": "5.9.3"
  },
  "lint-staged": {
    "src/**/*": ["pnpm prettier:format", "pnpm eslint:format"]
  }
}
```

**Step 2: Delete old lockfile and install**

Run: `rm pnpm-lock.yaml && pnpm install`
Expected: Install completes. Resolve any peer dependency conflicts by checking error messages.

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "build(deps): update all dependencies to latest versions"
```

---

### Task 2: Migrate Tailwind CSS 3 → 4

**Files:**

- Delete: `tailwind.config.js`
- Modify: `postcss.config.js`
- Modify: `src/styles/globals.css`
- Modify: `prettier.config.js`

**Step 1: Replace postcss.config.js**

Replace contents of `postcss.config.js` with:

```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};
```

**Step 2: Migrate globals.css to Tailwind 4 format**

Replace contents of `src/styles/globals.css` with:

```css
@import 'tailwindcss';
@plugin 'tailwind-scrollbar';

@theme {
  --font-primary: var(--font-primary);
}
```

Note: Tailwind 4 uses `@import 'tailwindcss'` instead of the old `@tailwind` directives. The `@theme` directive replaces `theme.extend` in the old config. The `@plugin` directive replaces the `plugins` array. Content detection is automatic in TW4 (no `content` array needed).

**Step 3: Update prettier.config.js for TW4**

Replace contents of `prettier.config.js` with:

```javascript
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn', 'twMerge'],
  tailwindStylesheet: './src/styles/globals.css'
};
```

Note: TW4 requires `tailwindStylesheet` to point to the CSS file that imports tailwindcss, since there's no more `tailwind.config.js`.

**Step 4: Delete tailwind.config.js**

Run: `rm tailwind.config.js`

**Step 5: Verify build**

Run: `pnpm build`
Expected: Build succeeds. If TW classes aren't working, check the `@import` and `@theme` syntax.

**Step 6: Commit**

```bash
git add postcss.config.js src/styles/globals.css prettier.config.js
git rm tailwind.config.js
git commit -m "build: migrate Tailwind CSS 3 to 4 (CSS-first config)"
```

---

### Task 3: Update Storybook 8 → 10 config

**Files:**

- Modify: `.storybook/main.ts`
- Modify: `.storybook/preview.tsx`

**Step 1: Update .storybook/main.ts**

Remove addon imports that were merged into core in SB9+:

```typescript
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  }
};
export default config;
```

Note: `@storybook/addon-links`, `@storybook/addon-essentials`, `@storybook/addon-interactions` are merged into core since SB9. The `addons` array and `docs.autodocs` config are no longer needed.

**Step 2: Update .storybook/preview.tsx**

The `argTypesRegex` parameter is deprecated in SB9+. Clean it up:

```tsx
import React from 'react';
import type { Preview } from '@storybook/react';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export const decorators = [];

export default preview;
```

Note: Removed unused `NextImage` import and `argTypesRegex` (deprecated — SB9+ uses `fn()` for auto-generated actions instead).

**Step 3: Verify storybook builds**

Run: `pnpm storybook:build`
Expected: Build succeeds. If config format errors, check Storybook 10 migration guide.

**Step 4: Commit**

```bash
git add .storybook/main.ts .storybook/preview.tsx
git commit -m "build: migrate Storybook 8 to 10 config"
```

---

### Task 4: Update GitHub Actions CI workflow

**Files:**

- Modify: `.github/workflows/main.yml`

**Step 1: Update CI workflow**

Update Node version, pnpm version, and action versions:

```yaml
name: Test application generation

on:
  push:
    branches:
      - main

  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  prettier-check:
    name: Prettier check
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
      - name: Run prettier check
        run: pnpm prettier:check

  eslint-check:
    name: Eslint check
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
      - name: Run eslint check
        run: pnpm eslint:format

  jest-check:
    name: Tests - jest
    needs: [prettier-check, eslint-check]
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

  nextjs-build-check:
    name: Build nextjs application
    needs: [jest-check]
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
      - name: Build nextjs
        run: pnpm build
        env:
          CI: true

  storybook-build-check:
    name: Build storybook application
    needs: [jest-check]
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
      - name: Build storybook
        run: pnpm storybook:build
        env:
          CI: true
```

Changes:

- `actions/checkout@v3` → `@v4`
- `pnpm/action-setup@v2` → `@v4` (reads `packageManager` from package.json, no `version` needed)
- `actions/setup-node@v3` → `@v4`
- `node-version: 18` → `24`
- Removed explicit `pnpm version` (reads from `packageManager` field)

**Step 2: Update dependency-review workflow**

Update `.github/workflows/dependency-review.yml` action versions:

```yaml
name: 'Dependency Review'
on: [pull_request]

permissions:
  contents: read

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout Repository'
        uses: actions/checkout@v4
      - name: 'Dependency Review'
        uses: actions/dependency-review-action@v4
```

**Step 3: Commit**

```bash
git add .github/workflows/main.yml .github/workflows/dependency-review.yml
git commit -m "ci: update GitHub Actions to Node 24, pnpm 10, latest action versions"
```

---

### Task 5: Verify everything works

**Step 1: Run install**

Run: `pnpm install`
Expected: Clean install with no errors.

**Step 2: Run lint**

Run: `pnpm lint`
Expected: Passes. If `eslint-plugin-react-hooks` v7 introduces new rule errors, fix or configure them.

**Step 3: Run tests**

Run: `pnpm test:ci`
Expected: All tests pass. If Jest 30 has breaking changes in config, adjust `jest.config.js`.

**Step 4: Run build**

Run: `pnpm build`
Expected: Next.js 16 build succeeds.

**Step 5: Run storybook build**

Run: `pnpm storybook:build`
Expected: Storybook 10 build succeeds.

**Step 6: Run prettier check**

Run: `pnpm prettier:check`
Expected: All files formatted correctly.

**Step 7: Fix any issues found in steps 1-6**

Address errors iteratively. Common issues:

- Peer dependency conflicts → adjust versions
- ESLint rule changes → update `eslint.config.mjs`
- Jest config breaking changes → update `jest.config.js`
- Storybook config format changes → update `.storybook/main.ts`
- Zod 4 API changes → update `src/lib/env/env.mjs`

**Step 8: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve compatibility issues from dependency updates"
```
