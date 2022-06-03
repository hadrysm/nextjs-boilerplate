import { RouterContext } from 'next/dist/shared/lib/router-context';

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    asPath: '/',
    query: {},
    push: () => {}
    //   can override any method in the router
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

// This is the place responsible for grouping all decorators from the storybook app
export const decorators = [];
