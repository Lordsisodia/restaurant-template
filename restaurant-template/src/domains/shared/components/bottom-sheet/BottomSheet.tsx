"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BottomSheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children?: ReactNode }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={cn("fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
      role="dialog"
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        role="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close bottom sheet"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClose();
          }
        }}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl border-t border-border bg-background p-5 shadow-xl transition-transform",
          open ? "translate-y-0" : "translate-y-full"
        )}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
      >
        {title ? <div className="mb-3 text-sm font-semibold text-muted-foreground">{title}</div> : null}
        {children}
      </div>
    </div>
  );
}
