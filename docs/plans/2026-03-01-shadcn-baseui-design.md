# shadcn-style Component System with Base UI

## Goal

Set up a shadcn-inspired component scaffold using Base UI primitives instead of Radix. Include dark/light mode support via next-themes. Button as the initial example component.

## Approach

**Approach 1 (selected):** shadcn CSS variables + manual Base UI components + CVA variants.

Take shadcn's proven HSL-based color token system. Don't use shadcn CLI. Build components manually with Base UI primitives + Tailwind + CVA.

## New Dependencies

- `next-themes` — dark/light/system mode switching
- `@base-ui-components/react` — headless unstyled primitives (for future complex components)
- `class-variance-authority` — variant management for component styling
- `lucide-react` — icon library (shadcn default)

## Theming (globals.css)

- Add `@custom-variant dark (&:where(.dark, .dark *))` for class-based dark mode in Tailwind v4
- Add `@theme` block mapping CSS variables to Tailwind color utilities (bg-primary, text-foreground, etc.)
- Add `:root` with full shadcn light mode HSL token set
- Add `.dark` with full shadcn dark mode HSL token set
- Tokens: background, foreground, primary, secondary, muted, accent, destructive, border, input, ring, card, popover + their foreground variants
- Border radius tokens: --radius with sm/md/lg/xl computed variants

## Dark Mode (next-themes)

- `ThemeProvider` component wrapping `NextThemesProvider` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`
- `ThemeToggle` component: button cycling light/dark/system with lucide icons (Sun/Moon/Monitor)
- `MainProvider` updated to wrap children with `ThemeProvider`
- `<html>` already has `suppressHydrationWarning`

## Component Architecture

```
src/components/
  ui/
    Button/
      Button.tsx
      index.ts
      Button.stories.tsx
  ThemeProvider/
    ThemeProvider.tsx
    index.ts
  ThemeToggle/
    ThemeToggle.tsx
    index.ts
  MainProvider/    # updated
  MainLayout/      # updated with ThemeToggle
```

- UI components in `src/components/ui/`
- CVA for variant definitions (variant: default/destructive/outline/secondary/ghost/link, size: default/sm/lg/icon)
- `cn` utility (already exists) for class merging
- Base UI primitives used for complex interactive components (Dialog, Select, etc.) — not needed for Button
- Button uses native `<button>` with forwardRef

## Cleanup

- Remove `src/components/Example/` (Example.tsx, Example.stories.tsx, index.ts)
- Update `MainLayout` header to include ThemeToggle
- Update `src/app/page.tsx` to showcase Button variants
