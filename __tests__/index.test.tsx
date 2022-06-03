import Home from '@/pages/index';
import { render, screen } from '@/tests/test-utils';

describe('Home Page', () => {
  it('renders a heading', () => {
    render(<Home />);

    screen.getByRole('heading', {
      name: /Nextjs boilerplate/i
    });
  });
});
