# Reviews Page — Feedback Notes

Date: 2025-10-27

- Our Journey section: keep the section but use a different timeline component with a modern glassmorphism look and smooth animations.
  - Component to use: `@/components/ui/timeline-component` (exported as `Component`).
  - This replaces the existing visual for the journey/timeline to better match the design direction.

- Routing check: added `src/app/reviews/page.tsx` to hook up the Reviews domain page to the `/reviews` route (was missing a route file).

- Tailwind styles: imported `tw-animate-css` in `src/app/globals.css` to ensure animation utilities are available. The project already had an `animate-fade-in` utility; left it as‑is.

Next:
- If we want this new timeline to display dynamic milestones, consider adapting the component to accept a `milestones` prop and map data instead of using static `events`.

