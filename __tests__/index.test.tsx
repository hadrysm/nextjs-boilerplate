import Home from '@/pages/index';
import { render, screen } from '@/tests/test-utils';

describe('Home Page', () => {
  it('renders a heading', () => {
    render(<Home />);

    // Assert
    screen.getByRole('heading', {
      name: /🚀 Features:/i
    });
  });
});
