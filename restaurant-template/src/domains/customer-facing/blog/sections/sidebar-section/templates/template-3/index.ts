import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { SidebarContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Sidebar · Template Three',
  description: 'Dark experimental sidebar stack placeholder.',
  recommendedUse: ['Concept testing'],
  tags: ['sidebar', 'draft'],
  status: 'draft',
});

export const load: SectionVariantLoader<SidebarContent> = async () => ({
  default: (await import('./SidebarTemplate3')).default,
});

export { default as SidebarTemplate3 } from './SidebarTemplate3';
