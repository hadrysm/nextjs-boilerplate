import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

type ProvidersProps = {
  readonly children?: ReactNode;
};

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: ProvidersProps) => {
  return children;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
