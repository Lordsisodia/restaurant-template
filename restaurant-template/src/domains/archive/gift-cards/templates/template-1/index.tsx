/**
 * Gift Cards Template 1 - Form with Preview
 * 🎨 REPLACE WITH v0.dev TEMPLATE
 *
 * This template should include server actions, so it can't be used through Host.
 * For now, the page itself contains the template logic.
 * Future: Split into pure UI template + server action wrapper.
 */

import type { GiftCardsTemplateProps } from '../types';

export default function GiftCardsTemplate1({ tenant, denominations }: GiftCardsTemplateProps) {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <h1 className="text-center text-4xl font-bold">Gift Cards - {tenant.displayName}</h1>
      <p className="mt-4 text-center text-muted-foreground">
        🚧 This template is a placeholder. The actual page is in pages/GiftCardsPage.tsx
      </p>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        💡 v0.dev templates with server actions should be imported directly into the page file.
      </p>
    </div>
  );
}
