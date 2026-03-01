import { render, screen } from '@/tests/test-utils';

import { Example } from '@/components/Example';

describe('Example', () => {
  it('should render the heading', () => {
    render(<Example>Example</Example>);

    screen.getByRole('heading', { name: /Example/i });
  });
});
