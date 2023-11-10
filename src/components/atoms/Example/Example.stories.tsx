import type { Meta, StoryObj } from '@storybook/react';

import { Example } from './Example';

const meta: Meta<typeof Example> = {
  title: 'toms/Example',
  component: Example,
  tags: ['autodocs'],
  args: {
    children: 'Example',
    variant: 'default'
  }
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Default: Story = {};
