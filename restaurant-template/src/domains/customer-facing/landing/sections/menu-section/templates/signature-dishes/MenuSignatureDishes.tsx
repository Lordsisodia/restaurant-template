"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { formatIDR } from "@/lib/utils/currency";
import { SectionHeading } from "@/domains/shared/components";
import { SignatureDishCard } from "../../shared/components/SignatureDishCard";
import type { MenuContent } from "../../types/schema";

export default function MenuSignatureDishes({ items, maxItems = 4, deliveryLink }: MenuContent) {
  const featured = useMemo(() => items.slice(0, maxItems), [items, maxItems]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || featured.length === 0) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth } = scrollContainer;
      if (scrollWidth === 0) return;
      const cardWidth = scrollWidth / featured.length;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [featured.length]);

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-10">
      <div className="mx-auto w-full max-w-5xl px-6">
        <SectionHeading
          pillText="Signature Dishes"
          title="What our customers love most"
          subtitle="Chef's picks and customer favorites"
          centered
          className="mb-6"
        />
      </div>

      <div className="sm:hidden">
        <div ref={scrollRef} className="scrollbar-hide overflow-x-auto snap-x snap-mandatory px-6">
          <div className="flex h-[420px] gap-4 pb-4">
            {featured.map((dish) => {
              const priceText =
                (dish as any).priceFormatted ??
                (typeof (dish as any).price === "number" ? formatIDR((dish as any).price) : undefined);
              const isSpecial = !!(dish as any).isSpecial;
              const prepTime = (dish as any).prepTime ?? 15;
              const servingSize = (dish as any).servingSize ?? "Serves 1-2";

              return (
                <div key={dish.id} className="h-full min-w-[85%] snap-center">
                  <SignatureDishCard
                    imageUrl={dish.imageUrl ?? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"}
                    name={dish.name}
                    description={dish.description ?? undefined}
                    priceFormatted={priceText}
                    isSpecial={isSpecial}
                    deliveryLink={deliveryLink}
                    prepTime={prepTime}
                    servingSize={servingSize}
                    withGradient
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 px-6">
          {featured.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const scrollContainer = scrollRef.current;
                if (!scrollContainer) return;
                const cardWidth = scrollContainer.scrollWidth / featured.length;
                scrollContainer.scrollTo({ left: cardWidth * index, behavior: "smooth" });
              }}
              className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-8 bg-white shadow-md" : "w-2 bg-white/40"}`}
              aria-label={`Go to dish ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto hidden w-full max-w-5xl auto-rows-fr gap-6 px-6 sm:grid sm:grid-cols-2">
        {featured.map((dish) => {
          const priceText =
            (dish as any).priceFormatted ??
            (typeof (dish as any).price === "number" ? formatIDR((dish as any).price) : undefined);
          const isSpecial = !!(dish as any).isSpecial;
          const prepTime = (dish as any).prepTime ?? 15;
          const servingSize = (dish as any).servingSize ?? "Serves 1-2";

          return (
            <SignatureDishCard
              key={dish.id}
              imageUrl={dish.imageUrl ?? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"}
              name={dish.name}
              description={dish.description ?? undefined}
              priceFormatted={priceText}
              isSpecial={isSpecial}
              deliveryLink={deliveryLink}
              prepTime={prepTime}
              servingSize={servingSize}
              withGradient
            />
          );
        })}
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-5xl justify-center px-6">
        {deliveryLink ? (
          <a
            href={deliveryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
          >
            <span>Order Now</span>
            <ExternalLink className="h-5 w-5" />
          </a>
        ) : (
          <Link
            href="/menu"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
          >
            View Whole Menu
          </Link>
        )}
      </div>
    </section>
  );
}
