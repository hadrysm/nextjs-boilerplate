import type { Meta, StoryObj } from '@storybook/react';

import { Example } from '.';

export default {
  title: 'Components/Atoms/Example',
  component: Example,
  tags: ['autodocs']
} as Meta<typeof Example>;

type Story = StoryObj<typeof Example>;

export const Default: Story = {};
