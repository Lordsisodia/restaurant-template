import type { ListingRendererProps, ListingVariant } from './types';
import type { ListingContent } from './types/schema';
import { listingRegistry, getListingVariant, getListingComponent, listListingVariants } from './registry';

export * from './types';
export { listingRegistry, listListingVariants };

export function ListingRenderer({ variant, fallbackVariant, content }: ListingRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getListingVariant(requested);
  const Component = getListingComponent(resolved);
  return <Component {...content} />;
}

export function renderListing(props: ListingRendererProps) {
  const requested = props.variant ?? props.fallbackVariant;
  const resolved = getListingVariant(requested);
  const Component = getListingComponent(resolved);
  return <Component {...props.content} />;
}

export function getListingVariants(): Array<{ key: ListingVariant; label: string; description: string }> {
  return listListingVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { ListingContent };
export type { ListingPost } from './types/schema';
