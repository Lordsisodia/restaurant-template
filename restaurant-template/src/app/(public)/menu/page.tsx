import type { Metadata } from 'next';

import { MenuPageShell } from './MenuPageShell';

export const metadata: Metadata = {
  title: 'Menu | Draco Coffee & Eatery',
  description: 'Browse signature dishes, specialty coffee, and handcrafted cocktails from Draco Coffee & Eatery.',
};

export default function MenuPage() {
  return <MenuPageShell />;
}
