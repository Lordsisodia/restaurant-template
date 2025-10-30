import type { SidebarContent } from '../../types/schema';

export default function SidebarTemplate2({ widgets }: SidebarContent) {
  return (
    <aside aria-label="Blog sidebar" className="hidden lg:block">
      <div className="space-y-4">
        {widgets.map((widget) => (
          <section key={widget.key} className="rounded-lg border border-gray-200 bg-white p-4 text-gray-900">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{widget.title}</h3>
            {widget.body ? <p className="mt-2 text-sm text-gray-600">{widget.body}</p> : null}
          </section>
        ))}
      </div>
    </aside>
  );
}
