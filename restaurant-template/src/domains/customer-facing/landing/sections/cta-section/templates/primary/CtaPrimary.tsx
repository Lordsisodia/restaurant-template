"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, MessageCircle } from "lucide-react";
import type { CtaContent } from "../../types/schema";

export default function CtaPrimary({ primaryCTA, secondaryCTA, showAfterScroll = 30 }: CtaContent) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? (currentScrollY / scrollHeight) * 100 : 0;

        setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
        setLastScrollY(currentScrollY);

        const shouldShow =
          scrollDirection === "down" &&
          scrollPercent > showAfterScroll &&
          scrollPercent < 90;

        setIsVisible(shouldShow);
        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection, lastScrollY, showAfterScroll]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-lg transition-transform duration-300 md:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-3">
        <Link
          href={primaryCTA.href}
          target={primaryCTA.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-95"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{primaryCTA.label}</span>
        </Link>

        <Link
          href={secondaryCTA.href}
          target={secondaryCTA.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{secondaryCTA.label}</span>
        </Link>
      </div>
    </div>
  );
}
