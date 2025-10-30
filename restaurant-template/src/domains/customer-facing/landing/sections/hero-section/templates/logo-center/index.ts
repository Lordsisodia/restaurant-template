import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Logo Center',
  description: 'Hero layout featuring centered brand mark with supporting text.',
  recommendedUse: ['Brand-led campaigns', 'Launch announcements'],
  tags: ['hero', 'brand', 'logo'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroLogoCenter')).default,
});

export { default as HeroLogoCenter } from './HeroLogoCenter';
