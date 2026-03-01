# Documentation Update Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update README.md and create CHANGELOG.md to reflect the modernized toolchain from PR #1621.

**Architecture:** In-place factual edits to README.md (no restructure). New CHANGELOG.md file. package.json description already accurate — no change needed.

**Tech Stack:** Markdown

---

### Task 1: Update README title and subtitle

**Files:**
- Modify: `README.md:1-3`

**Step 1: Edit title (line 1)**

Change:
```
# Boilerplate and Starter for Next JS 15+, Tailwind CSS 3 and TypeScript
```
To:
```
# Boilerplate and Starter for Next.js 16, Tailwind CSS 4 and TypeScript
```

**Step 2: Edit subtitle (line 3)**

Change:
```
🚀 Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js (app routing), TypeScript, Biome, Husky, Lint-Staged, Jest, React Testing Library, PostCSS, Tailwind CSS, Storybook, Plop, GH actions.
```
To:
```
🚀 Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js (app routing), TypeScript, Biome, Husky, Lint-Staged, Vitest, React Testing Library, PostCSS, Tailwind CSS, Storybook, GH actions.
```

(Jest → Vitest, remove Plop)

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README title and subtitle for new stack"
```

---

### Task 2: Update README features list

**Files:**
- Modify: `README.md:11-26`

**Step 1: Update feature lines**

Replace lines 15, 19, 26 and add new lines. The full features section should become:

```markdown
- [Next.js](https://nextjs.org) for Static Site Generator
- Type checking [TypeScript](https://www.typescriptlang.org)
- Integrate with [Tailwind CSS 4](https://tailwindcss.com) (CSS-first configuration)
- [Storybook](https://storybook.js.org) for components documentation
- Strict Mode for TypeScript and React 19
- Linter and Code Formatter with [Biome](https://biomejs.dev)
- [Husky](https://typicode.github.io/husky/#/) for Git Hooks
- [Lint-staged](https://github.com/okonet/lint-staged) for running linters on Git staged files
- Testing with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/)
- Dark mode with [next-themes](https://github.com/pacocoursey/next-themes)
- Component variants with [CVA](https://cva.style/) and [Base UI](https://base-ui.com/) headless components
- Absolute Imports using `@` prefix
- Nextjs custom layouts
- [T3 env](https://env.t3.gg/) Manage your environment variables with ease
- Message convention for git
- Maximize lighthouse score
- GH actions
```

Key changes:
- Line 13: Add "4" and "(CSS-first configuration)" to Tailwind
- Line 15: React 18 → React 19
- Line 19: Jest → Vitest (with updated link)
- Lines 20-21: New — dark mode, CVA, Base UI
- Line 26 (Plop/atomic design): Removed entirely

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update README features list for modernized stack"
```

---

### Task 3: Update README testing section and remove generating section

**Files:**
- Modify: `README.md:33-79`

**Step 1: Update Testing section (lines 33-35)**

Replace:
```markdown
## 🧪 Testing

All tests are collocated with the source code inside the same directory. So, it makes it easier to find them. Coverage threshold is set to `70%`. In the `.jest` folder there is a custom provider for the all tests.
```
With:
```markdown
## 🧪 Testing

Tests live in the `__tests__/` directory with a mirrored structure matching `src/`. Shared test utilities are in `__tests__/test-utils.tsx`. Run tests with `pnpm test` (Vitest).
```

**Step 2: Remove "Generating components" section (lines 63-79)**

Delete entirely:
```markdown
## :gear: Generating components

```bash
pnpm generate Button
```

Result (if you chose an atom component):

```
└── components
      └── atoms
        └── Button
          ├── index.ts
          ├── Button.stories.tsx
          ├── Button.test.tsx
          └── Button.tsx
```
```

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update testing section, remove Plop generator docs"
```

---

### Task 4: Update README license year

**Files:**
- Modify: `README.md:90`

**Step 1: Update year**

Change:
```
Licensed under the MIT License, Copyright © 2024
```
To:
```
Licensed under the MIT License, Copyright © 2024-2026
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update license year range"
```

---

### Task 5: Create CHANGELOG.md

**Files:**
- Create: `CHANGELOG.md`

**Step 1: Create file with migration entry**

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Dark mode support with `next-themes` and `ThemeToggle` component
- `Button` component with CVA variants and Storybook stories
- `ThemeProvider` component wrapping `next-themes`
- `Base UI` headless component library
- `lucide-react` icon library
- Shadcn-style HSL color tokens in `globals.css`
- `Demo` page showcasing components
- Vitest configuration with `jsdom` environment
- Biome configuration for linting and formatting
- `__tests__/` directory with mirrored source structure

### Changed

- **Next.js** 14 → 16.1
- **React** 18 → 19.2
- **Tailwind CSS** 3 → 4 (CSS-first configuration, removed `tailwind.config.js`)
- **Storybook** 8 → 10
- **Node.js** minimum version → 24
- **pnpm** → 10
- **Testing**: Jest → Vitest
- **Linting/Formatting**: ESLint + Prettier → Biome
- Component structure: atomic design folders (`atoms/molecules/organisms`) → flat structure under `src/components/`
- Tests moved from collocated to `__tests__/` with mirrored structure
- CI workflows updated for Biome, Vitest, Node 24, pnpm 10

### Removed

- Jest and all related configuration
- ESLint and Prettier and all related configuration/plugins
- Plop component generator and templates
- Atomic design folder structure (`.gitkeep` files in `atoms/`, `molecules/`, `organisms/`)
- `Example` component (replaced by `Demo`)
```

**Step 2: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: add CHANGELOG.md with migration summary"
```

---

### Task 6: Final verification

**Step 1: Read README.md end-to-end**

Verify no stale references to Jest, Plop, atomic design, `.jest`, React 18, Tailwind CSS 3, or Next.js 15.

**Step 2: Verify package.json description is accurate**

Run: `grep '"description"' package.json`
Expected: already mentions biome, vitest, storybook — no change needed.

**Step 3: Verify no broken markdown**

Skim README for formatting issues (unclosed code blocks, broken links).
