# Documentation Update Design

## Context

PR #1621 modernizes the entire toolchain. The README, package.json description, and project docs are stale. Need to update documentation to reflect current state.

## Scope

### README.md — Minimal factual update

1. **Title**: Next JS 15+, Tailwind CSS 3 → Next.js 16, Tailwind CSS 4
2. **Subtitle**: Remove Jest/Plop, add Vitest, keep Biome
3. **Features list**:
   - Replace Jest → Vitest
   - Remove Plop/atomic design line
   - Add: dark mode (next-themes), CVA variants, Base UI
   - Update React 18 → React 19, Storybook reference
4. **Testing section**: Jest → Vitest, collocated → `__tests__/` mirrored structure
5. **Remove**: "Generating components" section (Plop gone)
6. **License year**: 2024 → 2026

### package.json description

Verify/update to match current stack.

### CHANGELOG.md (new file)

Single entry summarizing the migration: deps, Biome, Vitest, structure changes, new components.

## Approach

Minimal factual update — change facts in-place, smallest diff. Keep existing emoji-rich style.

## Unresolved questions

None.
