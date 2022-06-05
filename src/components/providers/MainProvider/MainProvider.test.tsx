import { render, screen } from '@/tests/test-utils';

import { MainProvider } from '.';

describe('MainProvider', () => {
  it('should render the children components', () => {
    render(
      <MainProvider pageProps={{}}>
        <h1>MainLayout children</h1>
      </MainProvider>
    );

    // Assert
    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
