import type { Meta, StoryObj } from '@storybook/react';
import { EssentialsRenderer } from '..';
import { essentialsMocks } from '../data/mock';

const meta: Meta<typeof EssentialsRenderer> = {
  title: 'Domains/Landing / EssentialsSection',
  component: EssentialsRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof EssentialsRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: essentialsMocks['primary'],
  },
};
