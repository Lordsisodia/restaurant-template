import type { SidebarVariant } from './types';
import type { SidebarContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as SidebarPrimaryMetadata, SidebarPrimary } from './templates/primary';
import { metadata as SidebarTemplate2Metadata, SidebarTemplate2 } from './templates/template-2';
import { metadata as SidebarTemplate3Metadata, SidebarTemplate3 } from './templates/template-3';

export const sidebarRegistry = createSectionRegistry<SidebarVariant, SidebarContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: SidebarPrimaryMetadata.name,
      description: SidebarPrimaryMetadata.description,
      screenshot: SidebarPrimaryMetadata.screenshot,
      tags: SidebarPrimaryMetadata.tags,
      load: async () => ({ default: SidebarPrimary }),
    },
    'template-2': {
      label: SidebarTemplate2Metadata.name,
      description: SidebarTemplate2Metadata.description,
      screenshot: SidebarTemplate2Metadata.screenshot,
      tags: SidebarTemplate2Metadata.tags,
      load: async () => ({ default: SidebarTemplate2 }),
    },
    'template-3': {
      label: SidebarTemplate3Metadata.name,
      description: SidebarTemplate3Metadata.description,
      screenshot: SidebarTemplate3Metadata.screenshot,
      tags: SidebarTemplate3Metadata.tags,
      load: async () => ({ default: SidebarTemplate3 }),
    },
  },
});

const components: Record<SidebarVariant, (props: SidebarContent) => JSX.Element> = {
  'primary': SidebarPrimary,
  'template-2': SidebarTemplate2,
  'template-3': SidebarTemplate3,
};

export function getSidebarVariant(variant: string | undefined): SidebarVariant {
  return resolveVariant(variant, sidebarRegistry);
}

export function getSidebarComponent(variant: SidebarVariant) {
  return components[variant];
}

export function listSidebarVariants() {
  return listVariants(sidebarRegistry);
}
