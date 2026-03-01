import { MainProvider } from '@/components/MainProvider';
import { render, screen } from '@/tests/test-utils';

describe('MainProvider', () => {
  it('should render the children components', () => {
    render(
      <MainProvider>
        <h1>MainLayout children</h1>
      </MainProvider>
    );

    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
