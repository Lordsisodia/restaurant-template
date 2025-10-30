import { notFound } from "next/navigation";

import { Component } from "@/components/ui/membership-card";

export default function MembershipDemo() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Component />
    </div>
  );
}
