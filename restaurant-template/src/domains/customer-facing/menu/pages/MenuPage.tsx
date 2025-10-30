'use client';

/**
 * Menu Domain - Menu Page
 * Domain-Based Architecture
 *
 * Main menu page with category tabs, filters, and responsive layout
 */

import { useEffect } from 'react';

import { useMenuItems, useMenuCategories } from '../shared/hooks';

// Sections
import { MenuHeaderRenderer } from "../sections/menu-header";
import type { MenuHeaderContent } from "../sections/menu-header";
import { MenuCategoriesRenderer } from "../sections/menu-categories";
import type { MenuCategoriesContent } from "../sections/menu-categories";

type MenuPageProps = {
  isSignedIn?: boolean;
};

const defaultHeaderContent: MenuHeaderContent = {
  title: "Our Menu",
  subtitle: "Discover our handcrafted dishes from Draco Coffee & Eatery",
  tagline: "From espresso to nasi bakar, every plate is made to delight.",
  showSeedButton: false,
  cta: {
    label: "Order Online",
    href: "/order",
    icon: "shopping-bag",
  },
};

const MenuPage = ({ isSignedIn = false }: MenuPageProps) => {
  useEffect(() => {
    document.title = "Menu | Elementree Eatscape";
  }, []);

  const { data: menuItems, isLoading: isLoadingItems, error: menuItemsError } = useMenuItems();
  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useMenuCategories();

  const hasError = menuItemsError || categoriesError;
  const isEmpty = (!isLoadingItems && !isLoadingCategories) &&
                 (!menuItems || menuItems.length === 0) &&
                 (!categories || categories.length === 0);

  const isLoading = isLoadingItems || isLoadingCategories;

  const categoriesContent: MenuCategoriesContent = {
    categories: categories ?? [],
    items: menuItems ?? [],
    isLoading,
    hasError: Boolean(hasError),
    errorMessage: hasError ? (menuItemsError ?? categoriesError)?.message : undefined,
    isEmpty,
    isSignedIn,
    about: {
      heading: 'About Our Menu',
      paragraphs: [
        'Located at 108 Cricklewood Broadway, London NW2 3EJ, Elementree offers authentic Italian cuisine and 100% Neapolitan pizzas made by our Italian pizzaiolo from Naples, using traditional recipes passed down through generations.',
        'Our menu celebrates the perfect balance of the four elements: earth, water, fire, and air. We use locally sourced ingredients and offer a range of options for vegetarians, vegans, and those with gluten-free requirements.',
        'For any special dietary needs or inquiries, please contact us at +44 20 8830 9344 or ask your server for assistance.',
      ],
      ctaLabel: 'Order Online Now',
      ctaHref: '/order',
    },
  };

  const headerContent: MenuHeaderContent = {
    ...defaultHeaderContent,
    showSeedButton: isSignedIn,
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Ambient Background Effects - Enhanced for Pure Black */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top Glow - Orange */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '8s' }} />

        {/* Bottom Glow - Amber */}
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '10s', animationDelay: '2s' }} />

        {/* Side Accent - Purple */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-3xl" />

        {/* Side Accent - Purple (Right) */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-14 md:py-20 relative z-10">
        <div className="relative">
          <MenuHeaderRenderer content={headerContent} />
        </div>

        <div className="mt-12 max-w-7xl mx-auto">
        <MenuCategoriesRenderer content={categoriesContent} />
      </div>
    </div>
  </div>
  );
};

export default MenuPage;
