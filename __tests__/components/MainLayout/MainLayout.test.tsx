import { MainLayout } from '@/components/MainLayout';
import { render, screen } from '@/tests/test-utils';

describe('MainLayout', () => {
  it('should render the children components', () => {
    render(
      <MainLayout>
        <h1>MainLayout children</h1>
      </MainLayout>
    );

    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
