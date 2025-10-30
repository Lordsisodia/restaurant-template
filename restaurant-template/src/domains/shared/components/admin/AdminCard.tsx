import type { ReactNode } from 'react';

export function AdminCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={"rounded-3xl border border-border/60 bg-background/95 p-6 shadow-sm " + (className ?? "")}>{children}</div>
  );
}

