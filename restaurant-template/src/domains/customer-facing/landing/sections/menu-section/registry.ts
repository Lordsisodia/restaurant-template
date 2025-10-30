import type { MenuVariant } from './types';
import type { MenuContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as MenuSignatureDishesMetadata, MenuSignatureDishes } from './templates/signature-dishes';
import { metadata as MenuOverviewMetadata, MenuOverview } from './templates/overview';

export const menuRegistry = createSectionRegistry<MenuVariant, MenuContent>({
  defaultVariant: 'signature-dishes',
  variants: {
    'signature-dishes': {
      label: MenuSignatureDishesMetadata.name,
      description: MenuSignatureDishesMetadata.description,
      screenshot: MenuSignatureDishesMetadata.screenshot,
      tags: MenuSignatureDishesMetadata.tags,
      load: async () => ({ default: MenuSignatureDishes }),
    },
    'overview': {
      label: MenuOverviewMetadata.name,
      description: MenuOverviewMetadata.description,
      screenshot: MenuOverviewMetadata.screenshot,
      tags: MenuOverviewMetadata.tags,
      load: async () => ({ default: MenuOverview }),
    },
  },
});

const components: Record<MenuVariant, (props: MenuContent) => JSX.Element> = {
  'signature-dishes': MenuSignatureDishes,
  'overview': MenuOverview,
};

export function getMenuVariant(variant: string | undefined): MenuVariant {
  return resolveVariant(variant, menuRegistry);
}

export function getMenuComponent(variant: MenuVariant) {
  return components[variant];
}

export function listMenuVariants() {
  return listVariants(menuRegistry);
}
