import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/Button';
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
  <div className="flex min-h-screen flex-col">
    {/* ── Header ─────────────────────────────────────────────── */}
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/80 px-6 py-3 backdrop-blur-md">
      <nav>
        <ul className="flex items-center gap-8">
          {links.map(({ slug, label }) => (
            <li key={slug}>
              <Link
                href={slug}
                className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
    </header>

    <main className="flex-1">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-background px-6 py-24 lg:py-36">
        {/* Decorative background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        {/* Decorative gradient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
            Production-Ready Starter
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Next.js Enterprise
            <br />
            <span className="bg-gradient-to-r from-primary/90 to-primary/50 bg-clip-text text-transparent">
              Boilerplate
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript. Made with developer
            experience first: Next.js, TypeScript, Biome, Husky, Lint-Staged, Vitest, React Testing
            Library, PostCSS, Tailwind CSS, Storybook, GH actions.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="border-t border-border/40 bg-muted/30 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-screen-lg">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            What&apos;s Included
          </h2>
          <p className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
            Features
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {featuresItems.map(({ icon, name }, i) => (
              <li
                key={name}
                className={cn(
                  'group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-card px-5 py-7 text-center text-card-foreground shadow-sm',
                  'transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
                  'motion-safe:animate-[fadeInUp_0.5s_ease_both]'
                )}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </span>
                <span className="text-sm font-medium leading-snug">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>

    {/* ── Footer ──────────────────────────────────────────────── */}
    <footer className="border-t border-border/60 bg-background px-6 py-5">
      <p className="text-center text-sm text-muted-foreground">
        &copy;{' '}
        <Link
          href="https://www.linkedin.com/in/mateusz-hadry%C5%9B/"
          className="font-medium text-foreground/70 underline underline-offset-4 transition-colors hover:text-primary"
        >
          Mateusz Hadrys
        </Link>{' '}
        Copyright {new Date().getFullYear()}
      </p>
    </footer>
  </div>
);

export default Demo;
