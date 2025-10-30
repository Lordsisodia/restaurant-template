"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function StickyOrderCTA({ href = "/contact", label = "Checkout" }: { href?: string; label?: string }) {
  return (
    <div
      className="fixed inset-x-0 z-40 lg:hidden"
      style={{ bottom: "calc(56px + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-5xl px-4">
        <Link
          href={href}
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      </div>
    </div>
  );
}

