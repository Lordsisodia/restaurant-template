import type { Meta, StoryObj } from '@storybook/react';
import { LoyaltyTierHighlightsRenderer } from '..';
import { loyaltyTierHighlightsMocks } from '../data/mock';

const meta: Meta<typeof LoyaltyTierHighlightsRenderer> = {
  title: 'Domains/CustomerFacingLoyalty / TierHighlights',
  component: LoyaltyTierHighlightsRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof LoyaltyTierHighlightsRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: loyaltyTierHighlightsMocks['primary'],
  },
};

export const Template2: Story = {
  args: {
    variant: 'template-2',
    content: loyaltyTierHighlightsMocks['template-2'],
  },
};

export const Template3: Story = {
  args: {
    variant: 'template-3',
    content: loyaltyTierHighlightsMocks['template-3'],
  },
};
