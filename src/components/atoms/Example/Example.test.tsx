import { render, screen } from '@/tests/test-utils';

import { Example } from '.';

describe('Example', () => {
  it('should render the heading', () => {
    render(<Example />);

    // Assert
    screen.getByRole('heading', { name: /Example/i });
  });
});
