import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ExampleComponent } from '.';

export default {
  title: 'ExampleComponent',
  component: ExampleComponent
} as ComponentMeta<typeof ExampleComponent>;

const Template: ComponentStory<typeof ExampleComponent> = (args) => <ExampleComponent {...args} />;

export const Default = Template.bind({});
