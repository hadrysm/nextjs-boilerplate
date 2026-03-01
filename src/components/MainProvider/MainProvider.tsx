import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/ThemeProvider';

interface Props {
  children: ReactNode;
}

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children }: Props) => <ThemeProvider>{children}</ThemeProvider>;
