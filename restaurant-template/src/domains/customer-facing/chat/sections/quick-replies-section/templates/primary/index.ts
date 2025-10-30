import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { QuickRepliesContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Chat Quick Replies · Grid',
  description: 'Grid layout that surfaces assistant macros, tags, and freshness timestamps.',
  recommendedUse: ['Chat landing pages', 'Assistant knowledge base previews'],
  tags: ['chat', 'quick-replies', 'macros'],
});

export const load: SectionVariantLoader<QuickRepliesContent> = async () => ({
  default: (await import('./QuickRepliesPrimary')).default,
});

export { default as QuickRepliesPrimary } from './QuickRepliesPrimary';
