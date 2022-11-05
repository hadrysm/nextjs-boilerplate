import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

import '@/styles/globals.css';

import { MainProvider } from '@/components/providers/MainProvider';
import { MainLayout } from '@/components/templates/MainLayout';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: Props) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? getDefaultLayout;

  return (
    <MainProvider pageProps={pageProps}>{getLayout(<Component {...pageProps} />)}</MainProvider>
  );
};

const getDefaultLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

export default MyApp;
