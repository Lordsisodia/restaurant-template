import type { Meta, StoryObj } from '@storybook/react';
import { StoryRenderer } from '..';
import { storyMocks } from '../data/mock';

const meta: Meta<typeof StoryRenderer> = {
  title: 'Domains/Landing / StorySection',
  component: StoryRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof StoryRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: storyMocks['primary'],
  },
};
