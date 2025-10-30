import type { Meta, StoryObj } from '@storybook/react';
import { LoyaltyTopDinersRenderer } from '..';
import { loyaltyTopDinersMocks } from '../data/mock';

const meta: Meta<typeof LoyaltyTopDinersRenderer> = {
  title: 'Domains/CustomerFacingLoyalty / TopDinersLeaderboard',
  component: LoyaltyTopDinersRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof LoyaltyTopDinersRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: loyaltyTopDinersMocks['primary'],
  },
};

export const Template2: Story = {
  args: {
    variant: 'template-2',
    content: loyaltyTopDinersMocks['template-2'],
  },
};

export const Template3: Story = {
  args: {
    variant: 'template-3',
    content: loyaltyTopDinersMocks['template-3'],
  },
};
