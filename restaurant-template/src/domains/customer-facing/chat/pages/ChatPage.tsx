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
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl justify-center px-6 py-12">
        <AiAssistantCard
          userName={tenant.displayName ?? 'there'}
          headline="Let's make your Draco visit perfect."
          description="Ask anything about reservations, menu highlights, or special experiences and our team will tailor the answer for you."
          suggestions={suggestions}
          modelOptions={modelOptions}
          defaultModel="concierge"
        />
      </div>
    </>
  );
}
