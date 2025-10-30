"use client";

import { Clock, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DaySchedule = { open: string; close: string; isOpen: boolean };

export interface HoursCardsProps {
  schedule: Record<DayKey, DaySchedule>;
  className?: string;
  accent?: boolean;
}

const DAY_LABELS: Record<DayKey, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

function formatHours(open: string | undefined, close: string | undefined, isOpen: boolean) {
  const o = open && open.trim() !== "" ? open : undefined;
  const c = close && close.trim() !== "" ? close : undefined;
  if (!isOpen) return "Closed";
  if (o && c) return `${o} – ${c}`;
  if (!o && c) return `Open until ${c}`;
  if (o && !c) return `From ${o}`;
  return "Open";
}

export default function HoursCards({ schedule, className, accent = false }: HoursCardsProps) {
  const today = new Date().getDay(); // 0=Sun ... 6=Sat
  const dayOrder: DayKey[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const items = dayOrder.map((k, idx) => ({
    key: k,
    label: DAY_LABELS[k],
    data: schedule[k],
    isToday: ((today + 6) % 7) === idx, // map JS 0=Sun to our array start Monday
  }));

  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map(({ key, label, data, isToday }) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "rounded-lg p-4 shadow-sm transition-all",
            accent
              ? "border border-orange-500/25 bg-gradient-to-br from-orange-500/5 via-amber-400/5 to-rose-500/5 backdrop-blur hover:shadow-md hover:-translate-y-0.5"
              : "border border-border bg-card",
            isToday && (accent ? "ring-1 ring-amber-400/40" : "ring-1 ring-primary/40")
          )}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              {label}
            </div>
            {isToday && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Today</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="tabular-nums">{formatHours(data?.open, data?.close, !!data?.isOpen)}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
