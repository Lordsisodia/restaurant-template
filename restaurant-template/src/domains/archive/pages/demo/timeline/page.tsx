import { notFound } from "next/navigation";

import { Component } from "@/components/ui/timeline-component";

export default function TimelineDemo() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <Component />;
}
