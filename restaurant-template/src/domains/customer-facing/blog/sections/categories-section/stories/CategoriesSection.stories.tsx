import type { Meta, StoryObj } from '@storybook/react';
import { CategoriesRenderer } from '..';
import { categoriesMocks } from '../data/mock';

const meta: Meta<typeof CategoriesRenderer> = {
  title: 'Domains/Blog / CategoriesSection',
  component: CategoriesRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof CategoriesRenderer>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    content: categoriesMocks['primary'],
  },
};

export const TemplateTwo: Story = {
  args: {
    variant: 'template-2',
    content: categoriesMocks['template-2'],
  },
};

export const TemplateThree: Story = {
  args: {
    variant: 'template-3',
    content: categoriesMocks['template-3'],
  },
};
