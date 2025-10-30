import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { PostVariant } from '../types';
import type { PostContent } from '../types/schema';

const basePost: PostContent = {
  id: 'post-1',
  title: 'Welcome to Our Kitchen Stories',
  slug: 'welcome-to-our-kitchen-stories',
  excerpt: 'A behind-the-scenes look at the craft and community powering our restaurant.',
  content: '<p>This placeholder content demonstrates the blog post layout. Replace with real copy.</p>',
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  category: 'News',
  imageUrl: '/images/shared/defaults/hero-default.jpg',
  readTimeMinutes: 3,
  backLinkHref: '/blog',
  backLinkLabel: '← Back to Blog',
};

export const postMocks = defineSectionMocks<PostVariant, PostContent>('Blog Post Section', {
  defaultVariant: 'primary',
  variants: {
    'primary': basePost,
    'template-2': basePost,
    'template-3': basePost,
  },
});

export type PostMockKey = keyof typeof postMocks;
