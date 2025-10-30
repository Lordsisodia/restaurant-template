import type { Meta, StoryObj } from '@storybook/react';
import { LoyaltyHeroRenderer } from '..';
import { loyaltyHeroMocks } from '../data/mock';

const meta: Meta<typeof LoyaltyHeroRenderer> = {
  title: 'Domains/CustomerFacingLoyalty / Hero',
  component: LoyaltyHeroRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof LoyaltyHeroRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: loyaltyHeroMocks['primary'],
  },
};

export const Template2: Story = {
  args: {
    variant: 'template-2',
    content: loyaltyHeroMocks['template-2'],
  },
};

export const Template3: Story = {
  args: {
    variant: 'template-3',
    content: loyaltyHeroMocks['template-3'],
  },
};
