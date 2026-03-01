import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon']
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' }
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' }
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' }
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' }
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' }
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' }
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' }
};
