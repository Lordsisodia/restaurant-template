import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { MenuContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Menu · Overview Grid',
  description: 'Tabbed grid of menu items with category pills and quick “view all” link.',
  recommendedUse: ['Menu preview blocks', 'Sections following hero', 'Tablet/desktop grids'],
  tags: ['menu', 'grid', 'categories'],
});

export const load: SectionVariantLoader<MenuContent> = async () => ({
  default: (await import('./MenuOverview')).default,
});

export { default as MenuOverview } from './MenuOverview';
