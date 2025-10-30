import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { GalleryVariant } from '../types';
import type { GalleryContent } from '../types/schema';

export const galleryMocks = defineSectionMocks<GalleryVariant, GalleryContent>('Gallery Section', {
  defaultVariant: 'grid',
  variants: {
    'grid': {
      heading: 'Inside Draco Coffee',
      subtitle: 'A peek at our roastery, dining room, and late-night lounge.',
      images: [
        'https://images.unsplash.com/photo-1527169402691-feff5539e52c?w=900&q=80',
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=80',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=80',
        'https://images.unsplash.com/photo-1527169402780-7f7239d4765f?w=900&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80',
        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=900&q=80',
      ],
    },
  },
});

export type GalleryMockKey = keyof typeof galleryMocks;
