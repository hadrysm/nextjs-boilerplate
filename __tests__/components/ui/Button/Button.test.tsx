import { Button } from '@/components/ui/Button';
import { render, screen } from '@/tests/test-utils';

describe('Button', () => {
  it('should render with children text', () => {
    render(<Button>Click me</Button>);

    screen.getByRole('button', { name: /Click me/i });
  });

  it('should apply variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);

    const button = screen.getByRole('button', { name: /Delete/i });
    expect(button.className).toContain('bg-destructive');
  });

  it('should apply size classes', () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole('button', { name: /Small/i });
    expect(button.className).toContain('h-9');
  });

  it('should forward ref', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
    render(<Button ref={ref}>Ref test</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should merge custom className', () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole('button', { name: /Custom/i });
    expect(button.className).toContain('custom-class');
  });

  it('should pass through native button props', () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole('button', { name: /Disabled/i })).toBeDisabled();
  });
});
