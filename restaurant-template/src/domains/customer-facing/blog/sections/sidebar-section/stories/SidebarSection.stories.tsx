import type { Meta, StoryObj } from '@storybook/react';
import { SidebarRenderer } from '..';
import { sidebarMocks } from '../data/mock';

const meta: Meta<typeof SidebarRenderer> = {
  title: 'Domains/Blog / SidebarSection',
  component: SidebarRenderer,
};

export default meta;

type Story = StoryObj<typeof SidebarRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: sidebarMocks['primary'],
  },
};

export const TemplateTwo: Story = {
  args: {
    variant: 'template-2',
    content: sidebarMocks['template-2'],
  },
};

export const TemplateThree: Story = {
  args: {
    variant: 'template-3',
    content: sidebarMocks['template-3'],
  },
};
