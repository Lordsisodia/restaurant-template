import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { ListingVariant } from '../types';
import type { ListingContent } from '../types/schema';

const samplePosts: ListingContent['posts'] = [
  {
    id: 'post-1',
    title: 'Signature Dish Spotlight',
    slug: 'signature-dish-spotlight',
    excerpt: 'How our chef balances spice, smoke, and sweetness in the new menu headliner.',
    category: 'Features',
    imageUrl: '/images/shared/defaults/dish-placeholder.jpg',
    readTimeMinutes: 4,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'post-2',
    title: 'Weekend Playlist + Pairings',
    slug: 'weekend-playlist-pairings',
    excerpt: 'Curated vinyl, natural wines, and small bites to ease into the weekend.',
    category: 'Culture',
    imageUrl: '/images/shared/defaults/hero-default.jpg',
    readTimeMinutes: 3,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const listingMocks = defineSectionMocks<ListingVariant, ListingContent>('Blog Listing Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': {
      posts: samplePosts,
      featuredPosts: samplePosts.slice(0, 2),
      categoryGroups: [
        {
          name: 'Features',
          posts: samplePosts.filter((post) => post.category === 'Features'),
        },
        {
          name: 'Culture',
          posts: samplePosts.filter((post) => post.category === 'Culture'),
        },
      ],
      emptyStateTitle: 'No stories yet',
      emptyStateMessage: 'Check back soon for fresh updates from the kitchen.',
    },
    'template-2': {
      posts: samplePosts,
      featuredPosts: samplePosts,
      emptyStateTitle: 'Stay tuned',
      emptyStateMessage: 'We are prepping our stories. See you shortly.',
    },
    'template-3': {
      posts: samplePosts,
    },
  },
});

export type ListingMockKey = keyof typeof listingMocks;
