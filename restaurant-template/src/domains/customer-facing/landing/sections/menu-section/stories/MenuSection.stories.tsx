import type { Meta, StoryObj } from '@storybook/react';
import { MenuRenderer } from '..';
import { menuMocks } from '../data/mock';

const meta: Meta<typeof MenuRenderer> = {
  title: 'Domains/Landing / MenuSection',
  component: MenuRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MenuRenderer>;

export const SignatureDishes: Story = {
  args: {
    variant: 'signature-dishes',
    content: menuMocks['signature-dishes'],
  },
};

export const Overview: Story = {
  args: {
    variant: 'overview',
    content: menuMocks['overview'],
  },
};
