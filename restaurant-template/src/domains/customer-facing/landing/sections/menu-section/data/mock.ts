import { defineSectionMocks } from '@/domains/shared/section-tools';
import type { MenuVariant } from '../types';
import type { MenuContent } from '../types/schema';

export const menuMocks = defineSectionMocks<MenuVariant, MenuContent>('Menu Section', {
  defaultVariant: 'signature-dishes',
  variants: {
    'signature-dishes': {
      items: [
        {
          id: 'sig-1',
          name: 'Draco Signature Latte',
          description: 'Single origin espresso with pandan syrup and coconut foam.',
          priceFormatted: 'Rp 48.000',
          imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
          categoryId: 'coffee',
          isSpecial: true,
          prepTime: 4,
          servingSize: 'Serves 1',
        },
        {
          id: 'sig-2',
          name: 'Balinese Fried Chicken',
          description: 'Crispy spiced chicken with sambal matah and pickled veggies.',
          priceFormatted: 'Rp 72.000',
          imageUrl: 'https://images.unsplash.com/photo-1604908176997-12518821ad47?w=800&q=80',
          categoryId: 'mains',
          isSpecial: true,
          prepTime: 15,
          servingSize: 'Serves 1-2',
        },
        {
          id: 'sig-3',
          name: 'Charcoal Waffle',
          description: 'Black coconut waffle with palm sugar caramel and vanilla gelato.',
          priceFormatted: 'Rp 58.000',
          imageUrl: 'https://images.unsplash.com/photo-1478144592103-25e218a04891?w=800&q=80',
          categoryId: 'desserts',
          prepTime: 10,
          servingSize: 'Serves 1',
        },
        {
          id: 'sig-4',
          name: 'Smoked Salmon Brioche',
          description: 'Herbed cream cheese, soft egg, dill, and cured salmon.',
          priceFormatted: 'Rp 65.000',
          imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80',
          categoryId: 'brunch',
          prepTime: 8,
          servingSize: 'Serves 1',
        },
      ],
      maxItems: 4,
      deliveryLink: 'https://grab.onelink.me/12345/draco-coffee',
    },
    'overview': {
      items: [
        {
          id: 'ov-1',
          name: 'Iced Pandan Latte',
          description: 'Cold brew espresso, pandan syrup, coconut cream.',
          priceFormatted: 'Rp 45.000',
          imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
          categoryId: 'coffee',
        },
        {
          id: 'ov-2',
          name: 'Flat White',
          description: 'Velvety espresso with micro-foamed milk.',
          priceFormatted: 'Rp 42.000',
          imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
          categoryId: 'coffee',
        },
        {
          id: 'ov-3',
          name: 'Nasi Goreng Draco',
          description: 'Twice fried rice, smoked chicken, sambal matah.',
          priceFormatted: 'Rp 68.000',
          imageUrl: 'https://images.unsplash.com/photo-1604908177522-40262c1decee?w=800&q=80',
          categoryId: 'mains',
        },
        {
          id: 'ov-4',
          name: 'Crispy Tempe Bites',
          description: 'Curry honey glaze, pickled cucumber.',
          priceFormatted: 'Rp 38.000',
          imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80',
          categoryId: 'snacks',
        },
        {
          id: 'ov-5',
          name: 'Citrus Cold Brew',
          description: 'Orange oleo, tonic, cold brew concentrate.',
          priceFormatted: 'Rp 48.000',
          imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
          categoryId: 'coffee',
        },
        {
          id: 'ov-6',
          name: 'Tropical Smoothie Bowl',
          description: 'Dragon fruit, mango, coconut granola.',
          priceFormatted: 'Rp 55.000',
          imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
          categoryId: 'brunch',
        },
      ],
      viewAllHref: '/menu',
    },
  },
});

export type MenuMockKey = keyof typeof menuMocks;
