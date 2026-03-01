# Demo Component Design

## Goal

Extract all page content + navigation into a self-contained `Demo` component in `src/app/Demo/Demo.tsx`. The home page becomes a thin wrapper rendering `<Demo />`.

## Structure

```
src/app/
  Demo/
    Demo.tsx    — full page: header/nav + hero + features + footer
  page.tsx      — renders <Demo />
  layout.tsx    — keeps MainProvider, removes MainLayout
```

## Demo.tsx

Self-contained server component rendering:

- **Header**: nav links + ThemeToggle (copied from MainLayout)
- **Hero**: title, description, Button variant showcase
- **Features grid**: feature cards with icons
- **Footer**: copyright link

Imports: `Button`, `ThemeToggle`, `Link` (next/link), `cn`

## Changes to existing files

- **layout.tsx**: Remove `MainLayout` import/usage. Keep `MainProvider` wrapping `{children}`.
- **page.tsx**: Replace all content with `import Demo from './Demo/Demo'; export default () => <Demo />;`
- **MainLayout**: Untouched (available for future routes)

## Decisions

- No barrel export (index.ts) — keep simple
- Server component (no 'use client')
- MainLayout stays in codebase for other routes
- Frontend-design skill installed at project level for implementation
