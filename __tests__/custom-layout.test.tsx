import CustomLayoutPage from '@/pages/custom-layout';
import { render, screen } from '@/tests/test-utils';

describe('CustomLayoutPage Page', () => {
  it('renders a heading', () => {
    render(<CustomLayoutPage />);

    // Assert
    screen.getByRole('heading', {
      name: /Nextjs boilerplate - About Me/i
    });
  });
});
