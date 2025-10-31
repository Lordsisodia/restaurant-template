"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { groupMenuItemsByCategory } from '@/domains/customer-facing/menu/shared/hooks';
import type { MenuCategory, MenuItem } from '@/domains/customer-facing/menu/shared/types';
import MenuLoadingState from '../../shared/components/MenuLoadingState';
import MenuErrorAlert from '../../shared/components/MenuErrorAlert';
import MenuEmptyState from '../../shared/components/MenuEmptyState';
import MenuAboutSection from '../../shared/components/MenuAboutSection';
import {
  MenuItemCardRenderer,
  type MenuItemCardContent,
} from '@/domains/customer-facing/menu/sections/menu-item-card';
import {
  MenuItemDetailRenderer,
  type MenuItemDetailContent,
} from '@/domains/customer-facing/menu/sections/menu-item-detail';
import type { MenuCategoriesContent } from '../../types';

const GROUP_DEFINITIONS = [
  { key: 'breakfast', label: 'Breakfast', patterns: [/breakfast/i, /brunch/i, /morning/i] },
  { key: 'starters', label: 'Starters', patterns: [/starter/i, /appet/i, /snack/i, /small plate/i, /bite/i] },
  { key: 'mains', label: 'Main Meals', patterns: [/main/i, /entree/i, /pasta/i, /pizza/i, /burger/i, /rice/i, /nasi/i, /noodle/i, /grill/i, /steak/i] },
  { key: 'sides', label: 'Sides', patterns: [/side/i, /salad/i, /soup/i, /fries/i, /share/i, /snack/i] },
  { key: 'dessert', label: 'Dessert', patterns: [/dessert/i, /sweet/i, /cake/i, /pastry/i, /bake/i, /ice cream/i] },
  { key: 'coffee', label: 'Coffee & Tea', patterns: [/coffee/i, /espresso/i, /latte/i, /cappuccino/i, /tea/i, /matcha/i] },
  { key: 'juices', label: 'Juices & Soft Drinks', patterns: [/juice/i, /smoothie/i, /shake/i, /soda/i, /mocktail/i, /lemonade/i, /cold brew/i] },
  { key: 'alcohol', label: 'Alcoholic Drinks', patterns: [/alcohol/i, /cocktail/i, /wine/i, /beer/i, /spirit/i, /liquor/i] },
];

const DEFAULT_GROUP = { key: 'other', label: 'More to Explore' } as const;

function resolveGroupForCategory(name: string) {
  const match = GROUP_DEFINITIONS.find((definition) =>
    definition.patterns.some((pattern) => pattern.test(name))
  );

  if (match) {
    return match;
  }

  return DEFAULT_GROUP;
}

export default function MenuCategoriesPrimary({
  categories = [],
  items = [],
  isLoading,
  hasError,
  errorMessage,
  isEmpty,
  isSignedIn,
  about,
}: MenuCategoriesContent) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const menuItems = useMemo(() => items as MenuItem[], [items]);

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const orderA = a.display_order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.display_order ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });
  }, [categories]);

  const itemsByCategory = useMemo(
    () => groupMenuItemsByCategory(menuItems),
    [menuItems],
  );

  const loading = Boolean(isLoading);
  const error = hasError ? new Error(errorMessage ?? 'Failed to load menu data.') : null;
  const empty = Boolean(isEmpty) || (!loading && !error && menuItems.length === 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <MenuLoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <MenuErrorAlert error={error} />
      </div>
    );
  }

  if (empty) {
    return (
      <div className="min-h-screen bg-background">
        <MenuEmptyState isSignedIn={Boolean(isSignedIn)} />
      </div>
    );
  }

  const categoryNameById = useMemo(() => {
    return new Map(sortedCategories.map((cat) => [cat.id, cat.name]));
  }, [sortedCategories]);

  const toCardContent = (item: MenuItem): MenuItemCardContent => ({
    id: item.id,
    name: item.name,
    description: item.description ?? undefined,
    price: item.price,
    currency: 'IDR',
    category: categoryNameById.get(item.category) ?? item.category ?? 'Dish',
    imageUrl: item.image_url ?? undefined,
    isVegetarian: item.is_vegetarian,
    isVegan: item.is_vegan,
    isGlutenFree: item.is_gluten_free,
    isSpicy: item.is_spicy,
    calories: item.calories ?? undefined,
    protein: item.protein_g ?? undefined,
    carbs: item.carbs_g ?? undefined,
    sugar: item.sugar_g ?? undefined,
    fat: item.fat_g ?? undefined,
    prepTimeMin: item.prep_time_min ?? undefined,
    spiceLevel: item.spice_level ?? undefined,
    servingSizeGrams: item.serving_size_g ?? undefined,
    isHalal: item.is_halal ?? undefined,
    isKosher: item.is_kosher ?? undefined,
    allergens: item.allergens ?? undefined,
    pairings: item.pairings ?? undefined,
    chefTip: item.chef_tip ?? undefined,
    popularScore: item.popular_score ?? undefined,
    badges: item.is_new ? ['New'] : undefined,
  });

  const toDetailContent = (item: MenuItem): MenuItemDetailContent => ({
    ...toCardContent(item),
    heroImageUrl: item.image_url ?? undefined,
    gallery: undefined,
    origin: undefined,
    availability: undefined,
    winePairing: undefined,
    preparationNotes: undefined,
  });

  const handleSelectItem = (itemId: string) => {
    const match = menuItems.find((entry) => entry.id === itemId);
    if (match) {
      setSelectedItem(match);
    }
  };

  const closeDetail = () => setSelectedItem(null);
  const groupedSections = useMemo(() => {
    type GroupAccumulator = {
      key: string;
      label: string;
      categories: MenuCategory[];
      items: MenuItem[];
    };

    const accumulators = new Map<string, GroupAccumulator>();

    sortedCategories.forEach((category) => {
      const categoryItems = itemsByCategory[category.id] ?? [];

      if (categoryItems.length === 0) {
        return;
      }

      const groupDefinition = resolveGroupForCategory(category.name ?? '');

      if (!accumulators.has(groupDefinition.key)) {
        accumulators.set(groupDefinition.key, {
          key: groupDefinition.key,
          label: groupDefinition.label,
          categories: [],
          items: [],
        });
      }

      const entry = accumulators.get(groupDefinition.key)!;
      entry.categories.push(category);
      entry.items.push(...categoryItems);
    });

    const orderedKeys = [...GROUP_DEFINITIONS.map((definition) => definition.key), DEFAULT_GROUP.key];

    return orderedKeys
      .map((key) => accumulators.get(key))
      .filter((value): value is GroupAccumulator => Boolean(value));
  }, [itemsByCategory, sortedCategories]);

  return (
    <div className="space-y-16">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Menu</p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">Browse Our Menu</h1>
        <p className="text-sm text-white/60 md:text-base">Curated sections keep things simple—jump into breakfast, mains, and drinks without endless scrolling.</p>
      </header>

      {groupedSections.length > 0 ? (
        <div className="space-y-16">
          {groupedSections.map((group) => {
            const subcategorySummary = group.categories
              .map((subcategory) => subcategory.name)
              .filter(Boolean)
              .join(' • ');

            return (
              <motion.section
                key={group.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold text-white md:text-3xl">
                      {group.label}
                    </h2>
                    {subcategorySummary ? (
                      <p className="text-sm text-white/60 md:text-base">
                        {subcategorySummary}
                      </p>
                    ) : null}
                  </div>

                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/50">
                    {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="space-y-10">
                  {group.categories.map((category) => {
                    const categoryItems = itemsByCategory[category.id] ?? [];
                    if (categoryItems.length === 0) {
                      return null;
                    }

                    return (
                      <div key={category.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/80 shadow-sm backdrop-blur">
                            {category.name}
                            <span className="text-white/50">•</span>
                            <span>{categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}</span>
                          </span>
                        </div>

                        <div className="-mx-2 overflow-x-auto pb-2">
                          <div className="flex snap-x snap-mandatory gap-4 px-2 md:gap-6 md:px-3 lg:px-4">
                            {categoryItems.map((item) => (
                              <div
                                key={item.id}
                                className="w-[260px] shrink-0 snap-start md:w-[280px] lg:w-[320px]"
                              >
                                <MenuItemCardRenderer
                                  content={toCardContent(item)}
                                  onSelectItem={handleSelectItem}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/80">
          No dishes found yet. Please check back soon.
        </div>
      )}

      <section className="w-full">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-5 shadow-lg backdrop-blur-md sm:p-6">
            <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-orange-500/20 blur-3xl" />

            <div className="flex flex-col items-start gap-3 text-white/90 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-purple-600/30">🤖</span>
                <div>
                  <p className="text-sm font-semibold sm:text-base">Unsure what to pick?</p>
                  <p className="text-xs text-white/70 sm:text-sm">Our AI assistant can help you choose a dish that matches your tastes.</p>
                </div>
              </div>

              <div className="sm:ml-auto">
                <a
                  href="/chat"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
                >
                  Ask the AI assistant
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto w-full max-w-5xl">
          <MenuAboutSection about={about} />
        </div>
      </section>

      {selectedItem ? (
        <MenuItemDetailRenderer
          content={toDetailContent(selectedItem)}
          isOpen
          onClose={closeDetail}
        />
      ) : null}
    </div>
  );
}
