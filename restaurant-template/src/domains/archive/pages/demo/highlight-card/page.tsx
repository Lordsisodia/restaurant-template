import { notFound } from "next/navigation";

import { HighlightCard } from "@/domains/shared/components-5";
import { Star } from "lucide-react"; // Using lucide-react for icons

export default function HighlightCardDemo() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <HighlightCard
        title="Highlights"
        description="You are taking fewer sleeps than you usually do by now"
        metricValue="8,3 hours"
        metricLabel="Daily average on last month"
        buttonText="See All"
        onButtonClick={() => alert("'See All' button clicked!")}
        icon={<Star className="h-6 w-6" fill="currentColor" />}
      />
    </div>
  );
}
