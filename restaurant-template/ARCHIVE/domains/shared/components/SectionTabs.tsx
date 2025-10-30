"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/menu", label: "Menu" },
  { href: "/specials", label: "Specials" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function SectionTabs({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <div className={cn("border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="mx-auto w-full max-w-6xl overflow-x-auto px-6">
        <ul className="-mb-px flex gap-3 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => {
            const active = pathname === tab.href || (tab.href !== "/" && pathname?.startsWith(`${tab.href}/`));
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                    active ? "border-primary/40 bg-primary/10 text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

