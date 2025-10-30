import type { SidebarContent } from '../../types/schema';

export default function SidebarPrimary({ widgets }: SidebarContent) {
  if (!widgets || widgets.length === 0) {
    return null;
  }

  return (
    <aside aria-label="Blog sidebar" className="hidden lg:block">
      <div className="flex flex-col gap-6">
        {widgets.map((widget) => (
          <section key={widget.key} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
            <h3 className="text-base font-semibold text-white">{widget.title}</h3>
            {widget.body ? <p className="mt-3 text-sm text-white/70">{widget.body}</p> : null}
            {widget.items ? (
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {widget.items.map((item, index) => (
                  <li key={`${widget.key}-item-${index}`}>
                    {item.href ? (
                      <a href={item.href} className="hover:text-white">
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    {item.description ? <p className="text-xs text-white/60">{item.description}</p> : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </aside>
  );
}
