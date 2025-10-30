import type { Meta, StoryObj } from '@storybook/react';
import { PostRenderer } from '..';
import { postMocks } from '../data/mock';

const meta: Meta<typeof PostRenderer> = {
  title: 'Domains/Blog / PostSection',
  component: PostRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof PostRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: postMocks['primary'],
  },
};

export const TemplateTwo: Story = {
  args: {
    variant: 'template-2',
    content: postMocks['template-2'],
  },
};

export const TemplateThree: Story = {
  args: {
    variant: 'template-3',
    content: postMocks['template-3'],
  },
};
