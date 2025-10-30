
import { Button } from '@/domains/shared/components';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import type { MenuCategoriesAbout } from '../../types/schema';

type MenuAboutSectionProps = {
  about?: MenuCategoriesAbout;
};

const DEFAULT_PARAGRAPHS = [
  'Located at 108 Cricklewood Broadway, London NW2 3EJ, Elementree offers authentic Italian cuisine and 100% Neapolitan pizzas made by our Italian pizzaiolo from Naples, using traditional recipes passed down through generations.',
  'Our menu celebrates the perfect balance of the four elements: earth, water, fire, and air. We use locally sourced ingredients and offer a range of options for vegetarians, vegans, and those with gluten-free requirements.',
  'For any special dietary needs or inquiries, please contact us at +44 20 8830 9344 or ask your server for assistance.',
];

const MenuAboutSection = ({ about }: MenuAboutSectionProps) => {
  const heading = about?.heading ?? 'About Our Menu';
  const paragraphs = about?.paragraphs && about.paragraphs.length > 0 ? about.paragraphs : DEFAULT_PARAGRAPHS;
  const ctaLabel = about?.ctaLabel ?? 'Order Online Now';
  const ctaHref = about?.ctaHref ?? '/order';

  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-xl border border-elementree-light bg-gradient-to-br from-elementree-light to-white p-6 shadow-sm">
      <h3 className="font-serif text-xl font-medium text-elementree-water">{heading}</h3>
      <div className="mt-4 space-y-4 text-sm text-muted-foreground">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button asChild className="rounded-full bg-elementree-water shadow-md transition-transform hover:scale-105 hover:bg-elementree-water/90">
          <Link href={ctaHref}>
            <ShoppingBag className="mr-2" />
            {ctaLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MenuAboutSection;
