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
  MenuCategorySelectorRenderer,
  type MenuCategorySelectorContent,
} from '@/domains/customer-facing/menu/sections/menu-category-selector';
import {
  MenuItemCardRenderer,
  type MenuItemCardContent,
} from '@/domains/customer-facing/menu/sections/menu-item-card';
import {
  MenuItemDetailRenderer,
  type MenuItemDetailContent,
} from '@/domains/customer-facing/menu/sections/menu-item-detail';
import type { MenuCategoriesContent } from '../../types';

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
  const [filterCategory, setFilterCategory] = useState<string>('all');
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

  const categoryOptions = useMemo(() => {
    const enriched = sortedCategories.map((cat) => ({
      ...cat,
      itemCount: itemsByCategory[cat.id]?.length ?? 0,
    }));

    return [
      {
        id: 'all',
        name: 'All',
        description: 'Browse all items',
        display_order: -1,
        itemCount: menuItems.length,
      },
      ...enriched,
    ];
  }, [menuItems.length, itemsByCategory, sortedCategories]);

  const visibleCategories = useMemo(() => {
    if (filterCategory === 'all') {
      return sortedCategories;
    }
    return sortedCategories.filter((cat) => cat.id === filterCategory);
  }, [filterCategory, sortedCategories]);

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

  const selectorContent: MenuCategorySelectorContent = {
    heading: 'Browse Our Menu',
    summary: `${menuItems.length} items · ${sortedCategories.length} categories`,
    filterLabel: 'Filter categories',
    allLabel: 'All categories',
    activeCategoryId: filterCategory,
    showFilterToggle: true,
    categories: categoryOptions.map((cat) => ({
      id: cat.id,
      name: cat.name,
      description: cat.description ?? undefined,
      count: cat.itemCount,
      isActive: filterCategory === cat.id,
      pillText: cat.id === 'all' ? 'FEATURED' : undefined,
    })),
  };

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

  const handleSelectCategory = (categoryId: string) => {
    setFilterCategory(categoryId);
  };

  const handleSelectItem = (itemId: string) => {
    const match = menuItems.find((entry) => entry.id === itemId);
    if (match) {
      setSelectedItem(match);
    }
  };

  const closeDetail = () => setSelectedItem(null);

  const renderedCategories = visibleCategories.map((category) => ({
    category,
    items: itemsByCategory[category.id] ?? [],
  }));

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="w-full border-b border-white/10 bg-background/95 px-6 py-8 backdrop-blur-lg">
        <div className="mx-auto w-full max-w-5xl">
          <MenuCategorySelectorRenderer
            content={selectorContent}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </section>

      <div className="space-y-12 px-6 py-10">
        {renderedCategories.some(({ items }) => items.length > 0) ? (
          renderedCategories.map(({ category, items: categoryItems }) => {
            if (categoryItems.length === 0) {
              return null;
            }

            return (
              <motion.section
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/80 shadow-sm backdrop-blur">
                    {category.name}
                    <span className="text-white/50">•</span>
                    <span>{categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}</span>
                  </span>
                </div>

                <div className="mx-auto max-w-6xl">
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {categoryItems.map((item) => (
                      <MenuItemCardRenderer
                        key={item.id}
                        content={toCardContent(item)}
                        onSelectItem={handleSelectItem}
                      />
                    ))}
                  </div>
                </div>
              </motion.section>
            );
          })
        ) : (
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/80">
            No dishes found for this category yet. Please try another filter.
          </div>
        )}
      </div>

      <section className="mt-6 w-full px-6">
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

      <section className="w-full px-6">
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
