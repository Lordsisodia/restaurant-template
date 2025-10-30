import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { SidebarVariant } from '../types';
import type { SidebarContent } from '../types/schema';

const widgets: SidebarContent['widgets'] = [
  {
    key: 'about',
    title: 'About the Blog',
    body: 'Stories from our kitchen, bar, and community. Updated weekly.',
  },
  {
    key: 'popular',
    title: 'Popular Tags',
    items: [
      { label: '#chef-notes' },
      { label: '#events' },
      { label: '#recipes' },
    ],
  },
];

export const sidebarMocks = defineSectionMocks<SidebarVariant, SidebarContent>('Blog Sidebar Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      widgets,
    },
    'template-2': {
      widgets,
    },
    'template-3': {
      widgets,
    },
  },
});

export type SidebarMockKey = keyof typeof sidebarMocks;
