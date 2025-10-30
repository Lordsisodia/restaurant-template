import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Minimal Center',
  description: 'Lightweight centered hero for short copy and strong imagery.',
  recommendedUse: ['Announcements', 'Slim hero sections'],
  tags: ['hero', 'minimal'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroMinimalCenter')).default,
});

export { default as HeroMinimalCenter } from './HeroMinimalCenter';
