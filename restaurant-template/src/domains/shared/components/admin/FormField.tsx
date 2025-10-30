import type { ReactNode } from 'react';

export function FormField({ label, children, hint, className }: { label: string; children: ReactNode; hint?: string; className?: string }) {
  return (
    <label className={("flex flex-col text-xs ") + (className ?? "")}>
      <span className="mb-1 font-semibold text-muted-foreground">{label}</span>
      {children}
      {hint ? <span className="mt-1 text-[10px] text-muted-foreground/80">{hint}</span> : null}
    </label>
  );
}

