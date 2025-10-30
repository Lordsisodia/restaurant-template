import type { Meta, StoryObj } from '@storybook/react';
import { CtaRenderer } from '..';
import { ctaMocks } from '../data/mock';

const meta: Meta<typeof CtaRenderer> = {
  title: 'Domains/Landing / CtaSection',
  component: CtaRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof CtaRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: ctaMocks['primary'],
  },
};
