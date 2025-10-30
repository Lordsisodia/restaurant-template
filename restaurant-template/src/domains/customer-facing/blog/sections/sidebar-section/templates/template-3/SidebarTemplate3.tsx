import type { SidebarContent } from '../../types/schema';

export default function SidebarTemplate3({ widgets }: SidebarContent) {
  return (
    <aside aria-label="Blog sidebar" className="hidden lg:block">
      <div className="space-y-4">
        {widgets.map((widget) => (
          <section key={widget.key} className="rounded-xl border border-white/15 bg-white/5 p-5 text-white">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">{widget.title}</h3>
            {widget.body ? <p className="mt-2 text-sm text-white/70">{widget.body}</p> : null}
          </section>
        ))}
      </div>
    </aside>
  );
}
