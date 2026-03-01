import React from 'react';
import type { Preview } from '@storybook/nextjs';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export const decorators = [];

export default preview;
