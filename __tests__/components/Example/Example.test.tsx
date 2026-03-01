import { Example } from '@/components/Example';
import { render, screen } from '@/tests/test-utils';

describe('Example', () => {
  it('should render the heading', () => {
    render(<Example>Example</Example>);

    screen.getByRole('heading', { name: /Example/i });
  });
});
