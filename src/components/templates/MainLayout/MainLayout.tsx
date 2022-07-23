import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// This is the place responsible for wrapping your app.
// Add here components like Footer, Nav etc.
export const MainLayout: FC<Props> = ({ children }) => (
  <div>
    <header className="p-4 bg-slate-900">
      <ul className="flex items-center gap-10 text-gray-50">
        <li>
          <Link href="/">
            <a className="p-2 inline-block transition-colors hover:text-green-300">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/custom-layout" className="p-2">
            <a className="p-2 inline-block transition-colors hover:text-green-300">Custom layout</a>
          </Link>
        </li>
      </ul>
    </header>
    <main className="bg-[#FCFCFC]">{children}</main>;
  </div>
);
