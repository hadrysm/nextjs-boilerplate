import { ThemeToggle } from '@/components/ThemeToggle';
import { render, screen } from '@/tests/test-utils';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    resolvedTheme: 'light',
    setTheme: vi.fn()
  })
}));

describe('ThemeToggle', () => {
  it('should render a toggle button', () => {
    render(<ThemeToggle />);

    screen.getByRole('button', { name: /toggle theme/i });
  });
});
