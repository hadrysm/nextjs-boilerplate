import type { Meta, StoryObj } from '@storybook/react';

import { Example } from '.';

export default {
  title: 'Atoms/Example',
  component: Example
} as Meta<typeof Example>;

type Story = StoryObj<typeof Example>;

export const Default: Story = {};
