# shadcn-style Component System with Base UI — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Set up a shadcn-inspired component scaffold with Base UI primitives, dark/light mode via next-themes, and Button as the example component.

**Architecture:** shadcn's HSL CSS variable color system in globals.css. Tailwind v4 class-based dark mode via `@custom-variant`. next-themes ThemeProvider in MainProvider. CVA for component variants. Base UI installed for future complex components.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, next-themes, @base-ui-components/react, class-variance-authority, lucide-react

---

### Task 1: Install dependencies

**Step 1: Install packages**

Run:
```bash
pnpm add next-themes @base-ui-components/react class-variance-authority lucide-react
```

**Step 2: Verify install succeeded**

Run: `pnpm ls next-themes @base-ui-components/react class-variance-authority lucide-react`
Expected: All 4 packages listed with versions.

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "build: add next-themes, base-ui, cva, lucide-react"
```

---

### Task 2: Set up theming in globals.css

**Files:**
- Modify: `src/styles/globals.css`

**Step 1: Replace globals.css with themed version**

Replace entire contents of `src/styles/globals.css` with:

```css
@import 'tailwindcss';
@plugin 'tailwind-scrollbar';
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-primary: var(--font-primary);

  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));

  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));

  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));

  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));

  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));

  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));

  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.625rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

**Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "style: add shadcn HSL color tokens and dark mode to globals.css"
```

---

### Task 3: Create ThemeProvider component

**Files:**
- Create: `src/components/ThemeProvider/ThemeProvider.tsx`
- Create: `src/components/ThemeProvider/index.ts`

**Step 1: Write the test**

Create `__tests__/components/ThemeProvider/ThemeProvider.test.tsx`:

```tsx
import { ThemeProvider } from '@/components/ThemeProvider';
import { render, screen } from '@/tests/test-utils';

describe('ThemeProvider', () => {
  it('should render the children components', () => {
    render(
      <ThemeProvider>
        <h1>Theme children</h1>
      </ThemeProvider>
    );

    screen.getByRole('heading', { name: /Theme children/i });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test -- __tests__/components/ThemeProvider/ThemeProvider.test.tsx`
Expected: FAIL — module not found.

**Step 3: Create ThemeProvider component**

Create `src/components/ThemeProvider/ThemeProvider.tsx`:

```tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

export const ThemeProvider = ({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    {...props}
  >
    {children}
  </NextThemesProvider>
);
```

Create `src/components/ThemeProvider/index.ts`:

```ts
export * from './ThemeProvider';
```

**Step 4: Run test to verify it passes**

Run: `pnpm test -- __tests__/components/ThemeProvider/ThemeProvider.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/ThemeProvider/ __tests__/components/ThemeProvider/
git commit -m "feat: add ThemeProvider component wrapping next-themes"
```

---

### Task 4: Create Button component

**Files:**
- Create: `src/components/ui/Button/Button.tsx`
- Create: `src/components/ui/Button/index.ts`

**Step 1: Write the test**

Create `__tests__/components/ui/Button/Button.test.tsx`:

```tsx
import { Button } from '@/components/ui/Button';
import { render, screen } from '@/tests/test-utils';

describe('Button', () => {
  it('should render with children text', () => {
    render(<Button>Click me</Button>);

    screen.getByRole('button', { name: /Click me/i });
  });

  it('should apply variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);

    const button = screen.getByRole('button', { name: /Delete/i });
    expect(button.className).toContain('bg-destructive');
  });

  it('should apply size classes', () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole('button', { name: /Small/i });
    expect(button.className).toContain('h-9');
  });

  it('should forward ref', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
    render(<Button ref={ref}>Ref test</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should merge custom className', () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole('button', { name: /Custom/i });
    expect(button.className).toContain('custom-class');
  });

  it('should pass through native button props', () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole('button', { name: /Disabled/i })).toBeDisabled();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test -- __tests__/components/ui/Button/Button.test.tsx`
Expected: FAIL — module not found.

**Step 3: Create Button component**

Create `src/components/ui/Button/Button.tsx`:

```tsx
import { type VariantProps, cva } from 'class-variance-authority';
import { type ComponentProps, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
```

Create `src/components/ui/Button/index.ts`:

```ts
export * from './Button';
```

**Step 4: Run test to verify it passes**

Run: `pnpm test -- __tests__/components/ui/Button/Button.test.tsx`
Expected: PASS (all 6 tests)

**Step 5: Add Storybook story**

Create `src/components/ui/Button/Button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon']
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' }
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' }
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' }
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' }
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' }
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' }
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' }
};
```

**Step 6: Commit**

```bash
git add src/components/ui/Button/ __tests__/components/ui/Button/
git commit -m "feat: add Button component with CVA variants and stories"
```

---

### Task 5: Create ThemeToggle component

**Files:**
- Create: `src/components/ThemeToggle/ThemeToggle.tsx`
- Create: `src/components/ThemeToggle/index.ts`

**Step 1: Write the test**

Create `__tests__/components/ThemeToggle/ThemeToggle.test.tsx`:

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';
import { render, screen } from '@/tests/test-utils';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn()
  })
}));

describe('ThemeToggle', () => {
  it('should render a toggle button', () => {
    render(<ThemeToggle />);

    screen.getByRole('button', { name: /toggle theme/i });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test -- __tests__/components/ThemeToggle/ThemeToggle.test.tsx`
Expected: FAIL — module not found.

**Step 3: Create ThemeToggle component**

Create `src/components/ThemeToggle/ThemeToggle.tsx`:

```tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button';

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
```

Create `src/components/ThemeToggle/index.ts`:

```ts
export * from './ThemeToggle';
```

**Step 4: Run test to verify it passes**

Run: `pnpm test -- __tests__/components/ThemeToggle/ThemeToggle.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/ThemeToggle/ __tests__/components/ThemeToggle/
git commit -m "feat: add ThemeToggle component with sun/moon icons"
```

---

### Task 6: Wire up MainProvider with ThemeProvider

**Files:**
- Modify: `src/components/MainProvider/MainProvider.tsx`

**Step 1: Update MainProvider**

Replace contents of `src/components/MainProvider/MainProvider.tsx` with:

```tsx
import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/ThemeProvider';

interface Props {
  children: ReactNode;
}

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children }: Props) => (
  <ThemeProvider>{children}</ThemeProvider>
);
```

**Step 2: Run existing MainProvider test**

Run: `pnpm test -- __tests__/components/MainProvider/MainProvider.test.tsx`
Expected: PASS

**Step 3: Commit**

```bash
git add src/components/MainProvider/MainProvider.tsx
git commit -m "feat: wire ThemeProvider into MainProvider"
```

---

### Task 7: Update MainLayout with ThemeToggle and theme-aware styles

**Files:**
- Modify: `src/components/MainLayout/MainLayout.tsx`

**Step 1: Update MainLayout**

Replace contents of `src/components/MainLayout/MainLayout.tsx` with:

```tsx
import Link from 'next/link';
import type { ReactNode } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const links = [{ slug: '/', label: 'Home' }];

// This is the place responsible for wrapping your app.
// Add here components like Footer, Nav etc.
export const MainLayout = ({ children, className }: MainLayoutProps) => {
  const wrapperStyles = cn('flex flex-col min-h-screen', className);

  return (
    <div className={wrapperStyles}>
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
      <main className="flex-1">{children}</main>
      <footer className="flex items-center justify-center border-t border-border p-4 text-muted-foreground">
        ©
        <Link href="https://www.linkedin.com/in/mateusz-hadry%C5%9B/" className="pr-2">
          Mateusz Hadryś
        </Link>
        Copyright {new Date().getFullYear()}
      </footer>
    </div>
  );
};
```

**Step 2: Run MainLayout test**

Run: `pnpm test -- __tests__/components/MainLayout/MainLayout.test.tsx`
Expected: PASS (may need mock for next-themes — if it fails, add `vi.mock('next-themes', ...)` to the test).

If test fails, update `__tests__/components/MainLayout/MainLayout.test.tsx`:

```tsx
import { MainLayout } from '@/components/MainLayout';
import { render, screen } from '@/tests/test-utils';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn()
  })
}));

describe('MainLayout', () => {
  it('should render the children components', () => {
    render(
      <MainLayout>
        <h1>MainLayout children</h1>
      </MainLayout>
    );

    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
```

**Step 3: Commit**

```bash
git add src/components/MainLayout/MainLayout.tsx __tests__/components/MainLayout/MainLayout.test.tsx
git commit -m "feat: add ThemeToggle to MainLayout, use theme-aware styles"
```

---

### Task 8: Update page.tsx to use theme tokens

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Update page.tsx with theme-aware classes**

Replace contents of `src/app/page.tsx` with:

```tsx
import { Button } from '@/components/ui/Button';

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

const HomePage = () => (
  <div>
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
  </div>
);

export default HomePage;
```

**Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: update page with theme-aware styles and Button demo"
```

---

### Task 9: Remove Example component

**Files:**
- Delete: `src/components/Example/Example.tsx`
- Delete: `src/components/Example/Example.stories.tsx`
- Delete: `src/components/Example/index.ts`
- Delete: `__tests__/components/Example/Example.test.tsx`

**Step 1: Remove files**

```bash
rm -rf src/components/Example/
rm -rf __tests__/components/Example/
```

**Step 2: Run full test suite**

Run: `pnpm test`
Expected: All remaining tests PASS.

**Step 3: Run build**

Run: `pnpm build`
Expected: Build succeeds.

**Step 4: Run lint**

Run: `pnpm check`
Expected: No errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Example component and its tests"
```

---

### Task 10: Final verification

**Step 1: Run full test suite**

Run: `pnpm test`
Expected: All tests pass.

**Step 2: Run build**

Run: `pnpm build`
Expected: Build succeeds.

**Step 3: Run lint/format check**

Run: `pnpm check`
Expected: No errors.

**Step 4: Run dev server smoke test**

Run: `pnpm dev`
Expected: App loads at localhost:3000. Header shows nav + theme toggle. Clicking toggle switches dark/light. Button variants render on homepage. Kill with Ctrl+C.
