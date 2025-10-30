import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { SidebarContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Sidebar · Primary',
  description: 'Widget stack for supporting content alongside articles.',
  recommendedUse: ['Blog detail page', 'Blog landing sidebar'],
  tags: ['sidebar', 'widgets'],
});

export const load: SectionVariantLoader<SidebarContent> = async () => ({
  default: (await import('./SidebarPrimary')).default,
});

export { default as SidebarPrimary } from './SidebarPrimary';
