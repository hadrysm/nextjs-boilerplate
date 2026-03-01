# Full Dependency Update Design

Date: 2026-03-01

## Scope

Big bang update of all dependencies to latest majors. Node >=24.13.0, pnpm 10.

## Changes

### Core Framework

- react/react-dom: 19.0.0-rc → 19.2.4
- next: 15.1.6 → 16.1.6
- eslint-config-next: 15.1.6 → 16.1.6

### React Types Cleanup

- @types/react: remove npm:types-react alias → 19.2.14
- @types/react-dom: remove npm:types-react-dom alias → 19.2.3
- Remove pnpm.overrides section

### Tailwind CSS 4 Migration

- tailwindcss: 3.4.17 → 4.2.1
- Add @tailwindcss/postcss: 4.2.1
- Remove autoprefixer (built into TW4)
- Delete tailwind.config.js → CSS-based config (@theme directive)
- Update postcss config to use @tailwindcss/postcss
- tailwind-scrollbar: 3.1.0 → 4.0.2
- prettier-plugin-tailwindcss: 0.6.11 → 0.7.2
- tailwind-merge: 3.0.1 → 3.5.0

### Storybook 10

- storybook: 8.5.3 → 10.1.11
- @storybook/nextjs: 8.5.3 → 10.2.10
- @storybook/react: 8.5.0 → 10.2.10
- Remove: addon-essentials, addon-interactions, addon-links, blocks (merged into core)
- Replace: @storybook/testing-library → @storybook/test
- eslint-plugin-storybook: 0.11.2 → 10.2.10

### Testing

- jest: 29.7.0 → 30.2.0
- babel-jest: 29.7.0 → 30.2.0
- jest-environment-jsdom: 29.7.0 → 30.2.0
- @types/jest: 29.5.14 → 30.0.0
- jest-watch-typeahead: 2.2.2 → 3.0.1
- @testing-library/react: 16.0.1 → 16.3.2
- @testing-library/jest-dom: 6.6.3 → 6.9.1

### Zod

- zod: 3.24.1 → 4.3.6
- @t3-oss/env-nextjs: 0.12.0 → 0.13.10
- Verify env config compatibility

### ESLint Ecosystem

- eslint: 9.19.0 → 9.39.3
- @eslint/compat: 1.2.5 → 2.0.2
- @eslint/eslintrc: 3.2.0 → 3.3.4
- @eslint/js: 9.19.0 → latest 9.x
- @typescript-eslint/\*: → 8.56.1
- eslint-config-prettier: 10.0.1 → 10.1.8
- eslint-plugin-prettier: 5.2.3 → 5.5.5
- eslint-plugin-react: 7.37.4 → 7.37.5
- eslint-plugin-react-hooks: 5.1.0 → 7.0.1
- eslint-plugin-testing-library: 7.1.1 → 7.16.0
- globals: 15.14.0 → 17.4.0

### Other Dev Dependencies

- typescript: 5.7.3 → 5.9.3
- prettier: 3.4.2 → 3.8.1
- postcss: 8.5.1 → 8.5.6
- lint-staged: 15.4.3 → 16.1.6
- plop: 4.0.1 → 4.0.5
- @types/node: 22.10.7 → latest for Node 24

### Infrastructure

- packageManager: pnpm 9.1.1 → 10.30.3
- engines.node: >=18.20.2 → >=24.13.0
- Regenerate pnpm-lock.yaml

## Config Changes

- Delete tailwind.config.js → migrate to CSS @theme
- Update postcss config → @tailwindcss/postcss
- Update Storybook config → remove merged addon imports
- Remove pnpm.overrides for React types

## Verification

- pnpm install succeeds
- pnpm build succeeds
- pnpm test passes
- pnpm lint passes
- pnpm storybook:build succeeds

## Risks

- @t3-oss/env-nextjs + Zod 4 compatibility
- Storybook 10 config format changes
- eslint-plugin-react-hooks v7 rule changes
- tailwind-scrollbar v4 plugin API changes
