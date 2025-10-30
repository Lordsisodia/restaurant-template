import type { Meta, StoryObj } from '@storybook/react';
import { HeroRenderer } from '..';
import { heroMocks } from '../data/mock';

const meta: Meta<typeof HeroRenderer> = {
  title: 'Domains/CustomerFacingChat / HeroSection',
  component: HeroRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof HeroRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: heroMocks['primary'],
  },
};

export const Template1: Story = {
  args: {
    variant: 'template-1',
    content: heroMocks['template-1'],
  },
};

export const Template2: Story = {
  args: {
    variant: 'template-2',
    content: heroMocks['template-2'],
  },
};

export const Template3: Story = {
  args: {
    variant: 'template-3',
    content: heroMocks['template-3'],
  },
};
