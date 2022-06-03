import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Logo } from '@/components/atoms/Logo';

export default {
  title: 'atoms/Logo',
  component: Logo
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args}>Link content</Logo>;

export const Default = Template.bind({});
