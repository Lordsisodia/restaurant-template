import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { StoryContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Story · Teaser',
  description: 'Split layout or carousel to showcase brand story with CTA and highlights.',
  recommendedUse: ['About previews', 'Landing storytelling blocks', 'Campaign narrative sections'],
  tags: ['story', 'carousel', 'narrative'],
});

export const load: SectionVariantLoader<StoryContent> = async () => ({
  default: (await import('./StoryPrimary')).default,
});

export { default as StoryPrimary } from './StoryPrimary';
