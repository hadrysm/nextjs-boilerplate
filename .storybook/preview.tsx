import React from 'react';
import type { Preview } from '@storybook/react';
import * as NextImage from 'next/image';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

// This is the place responsible for grouping all decorators from the storybook app
export const decorators = [];

export default preview;
