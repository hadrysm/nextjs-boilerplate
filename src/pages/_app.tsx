import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { FC, ReactElement, ReactNode } from 'react';

import { MainProvider } from '@/components/providers/MainProvider';
import { MainLayout } from '@/components/templates/MainLayout';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? getDefaultLayout;

  return (
    <MainProvider pageProps={pageProps}>{getLayout(<Component {...pageProps} />)}</MainProvider>
  );
};

const getDefaultLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default MyApp;
