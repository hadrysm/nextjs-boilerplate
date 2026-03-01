# Biome Migration Design

Replace ESLint + Prettier with Biome. Clean manual setup.

## Decisions

- **Tailwind class sorting**: dropped
- **Import ordering**: Biome defaults (no custom groups)
- **Storybook/Testing Library plugins**: dropped
- **Formatting style**: preserved (single quotes, no trailing commas, 100 width, 2-space indent, semicolons)
- **Approach**: clean manual setup (no migration CLI)

## Removal Scope

### Packages (16)

`eslint`, `@eslint/js`, `eslint-config-next`, `eslint-config-prettier`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-prettier`, `eslint-plugin-storybook`, `eslint-plugin-testing-library`, `eslint-plugin-import-helpers`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `typescript-eslint`, `globals`, `prettier`, `prettier-plugin-tailwindcss`

### Config Files (4)

- `eslint.config.mjs`
- `prettier.config.js`
- `.prettierrc`
- `.prettierignore`

### Scripts (4)

- `lint`, `eslint:format`, `prettier:format`, `prettier:check`

## New Setup

### Package

`@biomejs/biome` (devDependency)

### Config (`biome.json`)

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

### Scripts

| Script | Command |
|--------|---------|
| `lint` | `biome lint src` |
| `format` | `biome format --write .` |
| `check` | `biome check .` |
| `fix` | `biome check --write .` |

### lint-staged

```json
{
  "src/**/*": ["biome check --write --no-errors-on-unmatched"]
}
```

### GitHub Actions

Merge `prettier-check` and `eslint-check` jobs into single `biome-check` job:

```yaml
- name: Run Biome check
  run: pnpm check
```

## Rule Mapping

| ESLint Rule | Biome Equivalent |
|---|---|
| `no-console` (allow warn/error) | `noConsole` with allow list |
| `@typescript-eslint/no-unused-vars` (_prefix) | `noUnusedVariables` (handles _ by default) |
| `newline-before-return` | Dropped (no equivalent) |
| `import-helpers/order-imports` | `organizeImports` (Biome defaults) |
| `react/prop-types: off` | N/A |
| `react/react-in-jsx-scope: off` | N/A |

## What's Lost

- `newline-before-return` enforcement
- Storybook-specific lint rules
- Testing Library-specific lint rules
- Tailwind CSS class sorting

## Execution Order

1. Install `@biomejs/biome`
2. Create `biome.json`
3. Run `biome check --write .` to reformat codebase
4. Remove 16 ESLint/Prettier packages
5. Delete 4 config files
6. Update package.json scripts
7. Update lint-staged config
8. Update GitHub Actions workflow
9. Verify with `biome check`
10. Commit
