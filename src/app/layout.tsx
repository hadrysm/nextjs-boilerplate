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
