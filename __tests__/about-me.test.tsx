import AboutMe from '@/pages/about-me';
import { render, screen } from '@/tests/test-utils';

describe('AboutMe Page', () => {
  it('renders a heading', () => {
    render(<AboutMe />);

    // Assert
    screen.getByRole('heading', {
      name: /Nextjs boilerplate - About Me/i
    });
  });
});
