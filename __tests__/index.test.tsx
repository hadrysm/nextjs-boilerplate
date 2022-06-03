import { render, screen } from '@/tests/test-utils';
import Home from '@/pages/index';

describe('Home Page', () => {
  it('renders a heading', () => {
    render(<Home />);

    screen.getByRole('heading', {
      name: /Nextjs boilerplate/i
    });
  });
});
