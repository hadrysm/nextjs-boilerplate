import { render, screen } from '@/tests/test-utils';

import { MainLayout } from '.';

describe('MainLayout', () => {
  it('should render the children components', () => {
    render(
      <MainLayout>
        <h1>MainLayout children</h1>
      </MainLayout>
    );

    // Assert
    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
