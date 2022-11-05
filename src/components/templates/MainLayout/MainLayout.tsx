import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const links = [
  { slug: '/', label: 'Homer' },
  { slug: '/custom-layout', label: 'Custom layout' }
];

// This is the place responsible for wrapping your app.
// Add here components like Footer, Nav etc.
export const MainLayout: FC<Props> = ({ children }) => (
  <div>
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
    <main className="bg-[#FCFCFC]">{children}</main>;
  </div>
);
