# Project History

Archive for docs that are no longer the active source of truth but still carry useful context (plans, retros, incident write-ups). Nothing here should be referenced for day-to-day implementation—treat it as the “library” of previous states.

## Structure
- `domains/` – Past domain plans/implementation logs (e.g. legacy About Us plan). Every subfolder has a README explaining what era it covers.
- `template-system/setup/` – Long-form setup walkthroughs superseded by the concise guides in `docs/template-system/setup/` (dated for traceability).
- Root files (e.g. `MOBILE-VIEWPORT-FIX.md`, `SCAFFOLDING-COMPLETE.md`) – Milestone summaries, post-mortems, or status memos.

## How to Use
1. When you replace a doc in `docs/`, move the old version here and timestamp the filename (`YYYY-MM-DD-description.md`).
2. Add or update a README in the relevant subfolder so future readers know what they’re looking at.
3. Link back to the active doc if someone needs the current version.

If a document is still authoritative, it belongs in `docs/`, not here.
