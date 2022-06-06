import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Example } from '.';

export default {
  title: 'Example',
  component: Example
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = (args) => <Example {...args} />;

export const Default = Template.bind({});
