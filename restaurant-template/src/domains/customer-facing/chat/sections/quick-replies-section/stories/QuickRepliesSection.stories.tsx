import type { Meta, StoryObj } from '@storybook/react';
import { QuickRepliesRenderer } from '..';
import { quickRepliesMocks } from '../data/mock';

const meta: Meta<typeof QuickRepliesRenderer> = {
  title: 'Domains/CustomerFacingChat / QuickRepliesSection',
  component: QuickRepliesRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof QuickRepliesRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: quickRepliesMocks['primary'],
  },
};
