import Link from 'next/link';
import { ReactNode } from 'react';

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
      <header className="bg-slate-900 p-4">
        <ul className="flex items-center gap-10 text-gray-50">
          {links.map(({ slug, label }) => (
            <li key={slug}>
              <Link href={slug} className="inline-block p-2 transition-colors hover:text-green-300">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="flex items-center justify-center p-4">
        ©
        <Link href="https://www.linkedin.com/in/mateusz-hadry%C5%9B/" className="pr-2">
          Mateusz Hadryś
        </Link>
        Copyright {new Date().getFullYear()}
      </footer>
    </div>
  );
};
