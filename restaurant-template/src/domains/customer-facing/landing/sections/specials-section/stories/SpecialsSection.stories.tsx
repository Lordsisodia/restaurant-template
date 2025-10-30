import type { Meta, StoryObj } from '@storybook/react';
import { SpecialsRenderer } from '..';
import { specialsMocks } from '../data/mock';

const meta: Meta<typeof SpecialsRenderer> = {
  title: 'Domains/Landing / SpecialsSection',
  component: SpecialsRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof SpecialsRenderer>;

export const Grid: Story = {
  args: {
    variant: 'grid',
    content: specialsMocks['grid'],
  },
};

export const Slider: Story = {
  args: {
    variant: 'slider',
    content: specialsMocks['slider'],
  },
};
