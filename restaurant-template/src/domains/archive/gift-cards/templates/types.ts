export type GiftCardsVariant = 'template-1' | 'template-2' | 'template-3';

export interface GiftCardsTemplateProps {
  tenant: { displayName: string; slug: string };
  denominations?: number[];
}
