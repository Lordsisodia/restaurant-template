import type { Meta, StoryObj } from '@storybook/react';
import { LoyaltyMembershipShowcaseRenderer } from '..';
import { loyaltyMembershipShowcaseMocks } from '../data/mock';

const meta: Meta<typeof LoyaltyMembershipShowcaseRenderer> = {
  title: 'Domains/CustomerFacingLoyalty / MembershipShowcase',
  component: LoyaltyMembershipShowcaseRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof LoyaltyMembershipShowcaseRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: loyaltyMembershipShowcaseMocks['primary'],
  },
};

export const Template2: Story = {
  args: {
    variant: 'template-2',
    content: loyaltyMembershipShowcaseMocks['template-2'],
  },
};

export const Template3: Story = {
  args: {
    variant: 'template-3',
    content: loyaltyMembershipShowcaseMocks['template-3'],
  },
};
