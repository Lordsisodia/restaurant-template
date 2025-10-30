"use client";

import { useState } from "react";
import { Button } from "@/domains/shared/components";
import { Sparkles } from "lucide-react";

export default function SeedDataButton() {
  const [loading, setLoading] = useState(false);

  async function handleSeed() {
    try {
      setLoading(true);
      // Placeholder: integrate actual seed action here (e.g., call an API route)
      // await fetch("/api/seed-menu", { method: "POST" });
      console.info("[SeedDataButton] Seeding menu data...");
      setTimeout(() => setLoading(false), 800);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleSeed}
      className="rounded-full shadow-sm bg-elementree-water/90 hover:bg-elementree-water"
      disabled={loading}
    >
      <Sparkles className="mr-2 h-4 w-4" />
      {loading ? "Seeding..." : "Seed Menu Data"}
    </Button>
  );
}

