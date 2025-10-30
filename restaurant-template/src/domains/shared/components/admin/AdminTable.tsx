import type { ReactNode } from 'react';

export function AdminTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="min-w-full divide-y divide-border text-sm">{children}</table>
    </div>
  );
}

export function AdminThead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
      {children}
    </thead>
  );
}

export function AdminTbody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-border bg-background">{children}</tbody>;
}

