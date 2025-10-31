import type { Metadata } from 'next';

import { MenuCategoriesPageShell } from './MenuCategoriesPageShell';

export const metadata: Metadata = {
  title: 'Menu Categories | Draco Coffee & Eatery',
  description: 'Browse every category at Draco Coffee & Eatery – grouped sections, curated recommendations, and detailed item information.',
};

export default function MenuCategoriesPage() {
  return <MenuCategoriesPageShell />;
}
