import type { GiftCardsTemplateProps, GiftCardsVariant } from './types';
import Template1 from './template-1';
import Template2 from './template-2';
import Template3 from './template-3';

const VARIANTS: Record<GiftCardsVariant, (props: GiftCardsTemplateProps) => JSX.Element> = {
  'template-1': Template1,
  'template-2': Template2,
  'template-3': Template3,
};

export function GiftCardsHost({
  variant = 'template-1',
  ...props
}: GiftCardsTemplateProps & { variant?: GiftCardsVariant }) {
  const Component = VARIANTS[variant] ?? Template1;
  return <Component {...props} />;
}

export const giftCardsVariants = Object.keys(VARIANTS) as GiftCardsVariant[];
