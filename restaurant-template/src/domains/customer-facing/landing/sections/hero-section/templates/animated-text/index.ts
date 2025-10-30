import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Animated Text',
  description: 'Animated underline headline for bold brand statements.',
  recommendedUse: ['Campaign landers', 'Feature highlights'],
  tags: ['hero', 'text-animation'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroAnimatedText')).default,
});

export { default as HeroAnimatedText } from './HeroAnimatedText';
