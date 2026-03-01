# Demo Component Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extract all page + layout content into a self-contained `Demo` component; home page becomes a thin `<Demo />` wrapper.

**Architecture:** Create `src/app/Demo/Demo.tsx` containing header/nav, hero, features grid, and footer. Remove `MainLayout` from `layout.tsx` (keep `MainProvider`). `page.tsx` renders only `<Demo />`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript

**Ref:** Use `@frontend-design` skill during implementation - THIS IS VERY IMPORTANT. Create with the skill better UI for my demo component.

---

### Task 1: Create Demo component

**Files:**
- Create: `src/app/Demo/Demo.tsx`

**Step 1: Create the Demo component file**

Create `src/app/Demo/Demo.tsx` combining MainLayout's layout structure with page.tsx's content:

```tsx
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

const links = [{ slug: '/', label: 'Home' }];

const featuresItems = [
  { icon: '🏎️', name: 'Next.js (app routing)' },
  { icon: '🔥', name: 'Type checking TypeScript' },
  { icon: '💅', name: 'Tailwind CSS' },
  { icon: '✨', name: 'Biome' },
  { icon: '🧪', name: 'Vitest' },
  { icon: '🧪', name: 'React Testing Library' },
  { icon: '📕', name: 'Storybook' },
  { icon: '🚀', name: 'GitHub Actions' },
  { icon: '💻', name: 'T3 Env' },
  { icon: '🏁', name: 'Absolute Imports using `@` prefix' }
];

const Demo = () => (
  <div className={cn('flex flex-col min-h-screen')}>
    <header className="flex items-center justify-between border-b border-border bg-background p-4">
      <ul className="flex items-center gap-10">
        {links.map(({ slug, label }) => (
          <li key={slug}>
            <Link
              href={slug}
              className="inline-block p-2 text-foreground transition-colors hover:text-primary"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </header>

    <main className="flex-1">
      <section className="bg-background px-4">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-foreground md:text-5xl xl:text-6xl">
              Next.js Enterprise Boilerplate
            </h1>
            <p className="mb-6 max-w-2xl font-light text-muted-foreground md:text-lg lg:mb-8 lg:text-xl">
              Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer
              experience first: Next.js, TypeScript, Biome, Husky, Lint-Staged, Vitest, React Testing
              Library, PostCSS, Tailwind CSS, Storybook, GH actions.
            </p>
            <div className="flex justify-center gap-4">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-4 max-w-screen-lg px-4">
        <h2 className="text-bold mt-8 mb-10 text-3xl text-foreground">🚀 Features:</h2>
        <ul className="grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuresItems.map(({ icon, name }) => (
            <li
              key={name}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-6 text-center text-card-foreground shadow transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="text-xl">{icon}</span>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>

    <footer className="flex items-center justify-center border-t border-border p-4 text-muted-foreground">
      ©
      <Link href="https://www.linkedin.com/in/mateusz-hadry%C5%9B/" className="pr-2">
        Mateusz Hadryś
      </Link>
      Copyright {new Date().getFullYear()}
    </footer>
  </div>
);

export default Demo;
```

**Step 2: Verify file created**

Run: `ls src/app/Demo/Demo.tsx`
Expected: file exists

---

### Task 2: Update page.tsx

**Files:**
- Modify: `src/app/page.tsx` (replace entirely)

**Step 1: Replace page.tsx content**

```tsx
import Demo from './Demo/Demo';

const HomePage = () => <Demo />;

export default HomePage;
```

**Step 2: Verify file saved**

Run: `cat src/app/page.tsx`
Expected: 5-line file importing and rendering Demo

---

### Task 3: Remove MainLayout from layout.tsx

**Files:**
- Modify: `src/app/layout.tsx:6,28` (remove MainLayout import and wrapper)

**Step 1: Update layout.tsx**

Remove `MainLayout` import and wrapper. Keep `MainProvider`. Result:

```tsx
import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { MainProvider } from '@/components/MainProvider';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-primary' });

export const metadata: Metadata = {
  title: 'Home page | Nextjs boilerplate',
  description:
    '🚀 Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js, TypeScript, Biome, Husky, Lint-Staged, Vitest, React Testing Library, PostCSS, Tailwind CSS, Storybook, GH actions.'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={cn(inter.variable, 'font-primary')} suppressHydrationWarning>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

**Step 2: Verify no double main tag**

Run: `grep -r 'MainLayout' src/app/layout.tsx`
Expected: no matches

---

### Task 4: Verify build + visual check

**Step 1: Run type check**

Run: `pnpm build`
Expected: builds successfully with no errors

**Step 2: Run lint**

Run: `pnpm check`
Expected: no lint errors

**Step 3: Run tests**

Run: `pnpm test`
Expected: all tests pass

**Step 4: Commit**

```bash
git add src/app/Demo/Demo.tsx src/app/page.tsx src/app/layout.tsx
git commit -m "feat: extract Demo component with self-contained layout"
```

---

### Task 5: Remove frontend-design skill from non-Claude agents

The `npx skills add` installer created symlinks/dirs for ~20 other AI agents. Remove all of them, keeping only `.claude/skills/frontend-design` (symlink) and `.agents/skills/frontend-design` (source).

**Step 1: Remove all non-Claude agent skill directories**

Remove these directories (each contains only `skills/frontend-design`, nothing else):

```bash
rm -rf .crush .mux .qwen .openhands .trae .windsurf .mcpjam .qoder .roo .goose .neovate .continue .zencoder .kilocode .commandcode .agent .factory .kiro .codebuddy .pi skills
```

**Step 2: Verify only Claude + source remain**

Run: `find . -maxdepth 3 -path "*/skills/frontend-design" | sort`
Expected:
```
./.agents/skills/frontend-design
./.claude/skills/frontend-design
```

**Step 3: Verify Claude symlink still works**

Run: `ls -la .claude/skills/frontend-design/SKILL.md`
Expected: file readable, symlink points to `../../.agents/skills/frontend-design`

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove frontend-design skill from non-Claude agents"
```
