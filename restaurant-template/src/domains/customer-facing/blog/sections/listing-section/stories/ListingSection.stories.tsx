import type { Meta, StoryObj } from '@storybook/react';
import { ListingRenderer } from '..';
import { listingMocks } from '../data/mock';

const meta: Meta<typeof ListingRenderer> = {
  title: 'Domains/Blog / ListingSection',
  component: ListingRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ListingRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: listingMocks['primary'],
  },
};

export const TemplateTwo: Story = {
  args: {
    variant: 'template-2',
    content: listingMocks['template-2'],
  },
};

export const TemplateThree: Story = {
  args: {
    variant: 'template-3',
    content: listingMocks['template-3'],
  },
};
