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
