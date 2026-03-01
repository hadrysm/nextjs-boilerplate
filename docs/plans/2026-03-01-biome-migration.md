# Biome Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace ESLint + Prettier with Biome for linting and formatting.

**Architecture:** Clean removal of all ESLint/Prettier packages and configs, fresh Biome setup with matching formatting preferences. Single `biome check` command replaces separate lint and format steps everywhere (scripts, lint-staged, CI).

**Tech Stack:** Biome, pnpm, GitHub Actions

---

### Task 1: Install Biome

**Files:**
- Modify: `package.json`

**Step 1: Install @biomejs/biome**

Run: `pnpm add -D @biomejs/biome`

**Step 2: Verify installation**

Run: `pnpm biome --version`
Expected: version number printed (e.g. `2.x.x`)

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "build: install @biomejs/biome"
```

---

### Task 2: Create Biome config

**Files:**
- Create: `biome.json`

**Step 1: Create `biome.json`**

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignore": ["**/coverage/**", "**/.next/**", "**/out/**"]
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "none",
      "semicolons": "always"
    }
  },
  "linter": {
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error",
        "noUnusedImports": "error"
      },
      "suspicious": {
        "noConsole": {
          "level": "error",
          "options": { "allow": ["warn", "error"] }
        }
      }
    }
  },
  "organizeImports": {
    "enabled": true
  }
}
```

**Step 2: Verify config is valid**

Run: `pnpm biome check --max-diagnostics=5 src`
Expected: Biome runs (may show diagnostics — that's fine, confirms config is loaded)

**Step 3: Commit**

```bash
git add biome.json
git commit -m "build: add biome.json configuration"
```

---

### Task 3: Reformat codebase with Biome

**Files:**
- Modify: all `src/**/*.{ts,tsx,js,jsx}` files, plus root JSON/config files

**Step 1: Run Biome format + lint fix on entire codebase**

Run: `pnpm biome check --write .`
Expected: Files reformatted. Some lint issues may remain if they require manual fixes.

**Step 2: Check for remaining issues**

Run: `pnpm biome check .`
Expected: If errors remain, fix them manually. Common issues:
- `noUnusedVariables` on vars that were previously ignored
- `noConsole` on console.log calls
- Any new rules from Biome's recommended set

Fix any remaining errors. If a rule is too noisy, disable it in `biome.json` under the appropriate category.

**Step 3: Commit**

```bash
git add -A
git commit -m "style: reformat codebase with Biome"
```

---

### Task 4: Remove ESLint and Prettier packages

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`

**Step 1: Uninstall all 16 packages**

Run:
```bash
pnpm remove eslint @eslint/js eslint-config-next eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-prettier eslint-plugin-storybook eslint-plugin-testing-library eslint-plugin-import-helpers @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript-eslint globals prettier prettier-plugin-tailwindcss
```

**Step 2: Verify no ESLint/Prettier packages remain**

Run: `pnpm ls | grep -iE 'eslint|prettier' || echo "Clean"`
Expected: "Clean" (no matches)

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "build: remove ESLint and Prettier packages"
```

---

### Task 5: Delete old config files

**Files:**
- Delete: `eslint.config.mjs`
- Delete: `prettier.config.js`
- Delete: `.prettierrc`
- Delete: `.prettierignore`

**Step 1: Delete all ESLint/Prettier config files**

Run:
```bash
rm eslint.config.mjs prettier.config.js .prettierrc .prettierignore
```

**Step 2: Verify files are gone**

Run: `ls eslint.config.mjs prettier.config.js .prettierrc .prettierignore 2>&1`
Expected: "No such file or directory" for each

**Step 3: Commit**

```bash
git add eslint.config.mjs prettier.config.js .prettierrc .prettierignore
git commit -m "build: delete ESLint and Prettier config files"
```

---

### Task 6: Update package.json scripts and lint-staged

**Files:**
- Modify: `package.json`

**Step 1: Replace scripts**

Remove these scripts:
- `"prettier:format": "prettier --write ."`
- `"prettier:check": "prettier --check \"**/*.{ts,tsx,json}\""`
- `"lint": "eslint src"`
- `"eslint:format": "eslint src --fix"`

Add these scripts:
- `"lint": "biome lint src"`
- `"format": "biome format --write ."`
- `"check": "biome check ."`
- `"fix": "biome check --write ."`

**Step 2: Update lint-staged config**

Replace:
```json
"lint-staged": {
  "src/**/*": [
    "pnpm prettier:format",
    "pnpm eslint:format"
  ]
}
```

With:
```json
"lint-staged": {
  "src/**/*": [
    "biome check --write --no-errors-on-unmatched"
  ]
}
```

**Step 3: Update description**

Replace `"eslint + prettier"` with `"biome"` in the `description` field.

**Step 4: Verify scripts work**

Run: `pnpm lint`
Expected: Biome lint runs on `src/` with no errors

Run: `pnpm check`
Expected: Biome check (lint + format) runs on `.` with no errors

**Step 5: Commit**

```bash
git add package.json
git commit -m "build: update scripts and lint-staged for Biome"
```

---

### Task 7: Update GitHub Actions workflow

**Files:**
- Modify: `.github/workflows/main.yml`

**Step 1: Replace `prettier-check` and `eslint-check` jobs with single `biome-check` job**

Remove the `prettier-check` job (lines 12-29) and `eslint-check` job (lines 31-48).

Add this single job in their place:

```yaml
  biome-check:
    name: Biome check
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
      - name: Run Biome check
        run: pnpm check
```

**Step 2: Update `jest-check` job dependency**

Change `needs: [prettier-check, eslint-check]` to `needs: [biome-check]`

**Step 3: Commit**

```bash
git add .github/workflows/main.yml
git commit -m "ci: replace ESLint/Prettier CI jobs with Biome check"
```

---

### Task 8: Final verification

**Step 1: Run full Biome check**

Run: `pnpm check`
Expected: 0 errors, 0 warnings

**Step 2: Run tests to ensure nothing broke**

Run: `pnpm test:ci`
Expected: All tests pass

**Step 3: Run Next.js build**

Run: `pnpm build`
Expected: Build succeeds

**Step 4: Test lint-staged hook**

Run:
```bash
echo "// test" >> src/app/page.tsx && git add src/app/page.tsx && git commit -m "test: verify lint-staged" --no-verify
```
Then revert: `git reset HEAD~1 && git checkout src/app/page.tsx`

Or simply run: `pnpm lint-staged`
Expected: Biome runs on staged files

**Step 5: Commit any remaining fixes**

If any fixes were needed:
```bash
git add -A
git commit -m "fix: resolve remaining Biome issues"
```
