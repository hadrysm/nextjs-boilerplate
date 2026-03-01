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
