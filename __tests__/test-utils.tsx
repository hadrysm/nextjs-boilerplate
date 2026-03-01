import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

type ProvidersProps = {
  readonly children?: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return children;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
