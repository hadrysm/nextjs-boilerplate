import { AppProps } from 'next/app';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  pageProps: AppProps['pageProps'];
}

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children }: Props) => <>{children}</>;
