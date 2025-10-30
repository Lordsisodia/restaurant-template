import { cn } from "@/lib/utils";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface TimelineProps {
  events?: TimelineEvent[];
  /** color tone for accents */
  tone?: "default" | "brand";
  /** card style */
  variant?: "glass" | "solid" | "dark";
}

/**
 * Modern Timeline (configurable)
 * - Vertical line with glowing nodes
 * - Glass or Solid cards
 * - Two color tones: default (blue/purple) or brand (orange/rose)
 */
export const Component = ({
  events = [
    { year: "2021", title: "Opened Our Doors", description: "Started our journey with a passion for coffee and food." },
    { year: "2022", title: "Community Favorite", description: "Became a go-to spot for locals and visitors alike." },
    { year: "2023", title: "Menu Evolves", description: "Expanded signatures and refined our beverage program." },
    { year: "2024", title: "Recognized", description: "Celebrated milestones with great reviews and community love." },
  ],
  tone = "default",
  variant = "glass",
}: TimelineProps) => {
  const toneClass =
    tone === "brand"
      ? {
          line: "from-orange-400/60 to-rose-500/60 dark:from-orange-500/40 dark:to-rose-600/40",
          node: "from-orange-400 to-rose-500",
          year: "text-orange-600 dark:text-orange-400",
        }
      : {
          line: "from-blue-400/60 to-purple-500/60 dark:from-blue-500/40 dark:to-purple-600/40",
          node: "from-blue-400 to-purple-500",
          year: "text-blue-600 dark:text-blue-400",
        } as const;

  const cardClass =
    variant === "dark"
      ? "bg-black border-white/10"
      : variant === "solid"
      ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200/50 dark:border-orange-300/10"
      : "bg-white/70 dark:bg-neutral-900/70 border-gray-200/50 dark:border-white/10";

  const titleTextClass = variant === "dark" ? "text-white" : "text-gray-900 dark:text-white";
  const bodyTextClass = variant === "dark" ? "text-white/80" : "text-gray-700 dark:text-gray-300";

  const yearPillClass = (() => {
    if (variant === "dark") {
      return "border-white/15 bg-white/10 text-white/80";
    }
    if (tone === "brand") {
      return "border-orange-200/60 bg-orange-50 text-orange-600";
    }
    return "border-blue-200/60 bg-blue-50 text-blue-600";
  })();

  const yearDotShellClass = variant === "dark"
    ? "bg-white/40"
    : tone === "brand"
    ? "bg-orange-500/30"
    : "bg-blue-500/30";

  const yearDotPulseClass = variant === "dark"
    ? "bg-white/70"
    : tone === "brand"
    ? "bg-orange-500/60"
    : "bg-blue-500/60";

  const yearDotCoreClass = variant === "dark"
    ? "bg-white"
    : tone === "brand"
    ? "bg-orange-500"
    : "bg-blue-500";

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-12">
      {/* Vertical line */}
      <div className={cn("absolute left-[18px] top-0 h-full w-[2px] bg-gradient-to-b", toneClass.line)} />

      <div className="space-y-12">
        {events.map((event, idx) => (
          <div key={idx} className="relative flex items-start gap-6 animate-fade-in">
            {/* Timeline node */}
            <div className="relative z-10">
              <div
                className={cn(
                  "h-4 w-4 rounded-full border-2 border-white dark:border-neutral-800",
                  "bg-gradient-to-r",
                  toneClass.node,
                  "shadow-[0_0_12px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-110"
                )}
              />
            </div>

            {/* Content Card */}
            <div
              className={cn(
                "flex-1 rounded-lg p-5 backdrop-blur-xl",
                cardClass,
                "shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
                "hover:shadow-[0_10px_36px_rgba(0,0,0,0.14)] transition-all duration-300"
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] shadow-sm backdrop-blur",
                  yearPillClass
                )}
              >
                <span className={cn("relative flex h-1.5 w-1.5 items-center justify-center rounded-full", yearDotShellClass)}>
                  <span className={cn("flex h-3 w-3 animate-ping items-center justify-center rounded-full", yearDotPulseClass)} />
                  <span className={cn("absolute top-1/2 left-1/2 flex h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full", yearDotCoreClass)} />
                </span>
                {event.year}
              </span>
              <h3 className={cn("mt-1 text-lg font-semibold", titleTextClass)}>
                {event.title}
              </h3>
              <p className={cn("mt-2 text-sm", bodyTextClass)}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
