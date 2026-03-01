import { ThemeProvider } from '@/components/ThemeProvider';
import { render, screen } from '@/tests/test-utils';

describe('ThemeProvider', () => {
  it('should render the children components', () => {
    render(
      <ThemeProvider>
        <h1>Theme children</h1>
      </ThemeProvider>
    );

    screen.getByRole('heading', { name: /Theme children/i });
  });
});
