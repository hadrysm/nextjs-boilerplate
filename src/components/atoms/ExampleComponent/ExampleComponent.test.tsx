import { render, screen } from '@/tests/test-utils';

import { ExampleComponent } from '.';

describe('ExampleComponent', () => {
  it('should render the heading', () => {
    render(<ExampleComponent />);

    // Assert
    screen.getByRole('heading', { name: /ExampleComponent/i });
  });
});
