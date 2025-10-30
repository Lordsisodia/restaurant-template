"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, SectionHeading } from "@/domains/shared/components";
import { ImageSwiper } from "@/components/ui/image-swiper";
import { MenuItemCard } from "../../shared/components/MenuItemCard";
import type { SpecialsContent } from "../../types/schema";

const DEFAULT_IMAGES: Record<string, string> = {
  Coffee: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=880&q=80",
  Cocktails: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=880&q=80",
  Smoothies: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=880&q=80",
  "Specialty Drinks": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=880&q=80",
  Mocktails: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=880&q=80",
  Tea: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=880&q=80",
};

const CATEGORY_WHITELIST = new Set([
  "Coffee",
  "Cocktails",
  "Smoothies",
  "Specialty Drinks",
  "Mocktails",
  "Tea",
]);

export default function SpecialsSlider({
  items,
  heading = "Specialty Drinks & Delights",
  subtitle = "Handcrafted beverages and signature creations from Draco Coffee & Eatery",
  viewMenuHref = "/menu",
}: SpecialsContent) {
  const specialtyItems = useMemo(() => {
    if (!items?.length) return [];

    const filtered = items.filter((item) => !item.category || CATEGORY_WHITELIST.has(item.category));
    if (filtered.length >= 3) {
      return filtered;
    }

    return filtered.length > 0 ? filtered : items;
  }, [items]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || specialtyItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % specialtyItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, specialtyItems.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? specialtyItems.length - 1 : prev - 1));
  }, [specialtyItems.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % specialtyItems.length);
  }, [specialtyItems.length]);

  const visibleItems = useMemo(() => {
    if (specialtyItems.length === 0) return [];
    return Array.from({ length: 3 }, (_, offset) => specialtyItems[(currentIndex + offset) % specialtyItems.length]);
  }, [specialtyItems, currentIndex]);

  const getImageForItem = (category?: string, imageUrl?: string | null) => {
    if (imageUrl) return imageUrl;
    if (category && DEFAULT_IMAGES[category]) return DEFAULT_IMAGES[category];
    return "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=880&q=80";
  };

  if (specialtyItems.length === 0) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden bg-black py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container relative mx-auto max-w-6xl px-4 text-white">
        <SectionHeading
          pillText="Chef's Picks"
          pillTone="light"
          pillClassName="border-white/30 bg-white/15 text-white"
          title={heading}
          subtitle={subtitle}
          titleClassName="text-3xl md:text-4xl font-semibold text-white"
          className="mb-10"
        />

        <div className="relative">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 transform border border-white/20 bg-white/10 text-white backdrop-blur-sm shadow-lg hover:bg-white/20 md:flex"
              aria-label="Previous item"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 transform border border-white/20 bg-white/10 text-white backdrop-blur-sm shadow-lg hover:bg-white/20 md:flex"
              aria-label="Next item"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="flex justify-center md:hidden">
              <ImageSwiper
                images={specialtyItems
                  .map((item) => getImageForItem(item.category, item.imageUrl ?? undefined))
                  .join(",")}
                cardWidth={280}
                cardHeight={360}
              />
            </div>

            <div className="hidden md:block md:px-12">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visibleItems.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${currentIndex}-${idx}`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <MenuItemCard
                        imageUrl={getImageForItem(item.category, item.imageUrl ?? undefined)}
                        name={item.title}
                        description={item.description ?? undefined}
                        price={item.price}
                        priceFormatted={item.priceFormatted}
                        quantity={item.category}
                        onAdd={() => {
                          if (process.env.NODE_ENV !== "production") {
                            console.log(`Added ${item.title}`);
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {specialtyItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    index === currentIndex ? "w-8 bg-primary" : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  isPaused ? "bg-gray-400" : "bg-green-500 animate-pulse",
                )}
              />
              <span>{isPaused ? "Paused - hover to explore" : "Auto-playing"}</span>
            </div>

            <div className="mt-8 text-center">
              <a href={viewMenuHref ?? "/menu"}>
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-8 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl"
                >
                  View Full Menu →
                </Button>
              </a>
          </div>
        </div>
      </div>
    </section>
  );
}
