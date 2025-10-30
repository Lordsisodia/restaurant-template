import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { SidebarContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Sidebar · Template Two',
  description: 'Placeholder for a light card stack variant.',
  recommendedUse: ['Editorial sidebar (draft)'],
  tags: ['sidebar', 'draft'],
  status: 'draft',
});

export const load: SectionVariantLoader<SidebarContent> = async () => ({
  default: (await import('./SidebarTemplate2')).default,
});

export { default as SidebarTemplate2 } from './SidebarTemplate2';
