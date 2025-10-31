import { Component as AiAssistantCard } from '@/components/ui/ai-assistant-card';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

export default async function ChatPage() {
  const tenant = await getTenantFromRequest();

  const suggestions = [
    { label: "Ask about today's specials", iconKey: 'sparkles', colorClass: 'text-amber-500' },
    { label: 'Plan a visit', iconKey: 'calendarClock', colorClass: 'text-sky-500' },
    { label: 'Get menu recommendations', iconKey: 'utensilsCrossed', colorClass: 'text-emerald-500' },
    { label: 'Contact the team', iconKey: 'messageCircle', colorClass: 'text-rose-500' },
  ];

  const modelOptions = [
    { value: 'concierge', label: 'Concierge' },
    { value: 'menu-expert', label: 'Menu Expert' },
    { value: 'event-planner', label: 'Event Planner' },
  ];

  return (
    <>
      <style>{`main + footer { display: none; }`}</style>
      <div className="relative flex h-svh w-full flex-col overflow-hidden bg-muted/30">
        <div className="flex flex-1 items-stretch justify-center px-4 sm:px-8 lg:px-12">
          <AiAssistantCard
            userName={tenant.displayName ?? 'there'}
            headline="Let's make your Draco visit perfect."
            description="Ask anything about reservations, menu highlights, or special experiences and our team will tailor the answer for you."
            suggestions={suggestions}
            modelOptions={modelOptions}
            defaultModel="concierge"
            showToolbar={false}
            showUserName={false}
            disableMinHeight
            compact
            descriptionClassName="text-xs sm:text-sm"
            className="mt-[108px] mb-8 flex h-[calc(100svh-140px)] w-full max-w-4xl flex-col overflow-hidden border border-border/60 bg-background/95 shadow-lg backdrop-blur-sm p-0 sm:mt-28 sm:mb-10 sm:h-[calc(100svh-152px)]"
            contentClassName="flex h-full min-h-0 flex-col overflow-hidden p-0"
          />
        </div>
      </div>
    </>
  );
}
