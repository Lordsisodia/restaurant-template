import type { Meta, StoryObj } from '@storybook/react';
import { GalleryRenderer } from '..';
import { galleryMocks } from '../data/mock';

const meta: Meta<typeof GalleryRenderer> = {
  title: 'Domains/Landing / GallerySection',
  component: GalleryRenderer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof GalleryRenderer>;

export const Grid: Story = {
  args: {
    variant: 'grid',
    content: galleryMocks['grid'],
  },
};
