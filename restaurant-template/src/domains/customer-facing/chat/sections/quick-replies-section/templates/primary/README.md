# Quick Replies · Primary

- **Best for**: Listing saved assistant macros (common questions) on the chat landing page.
- **Layout**: Responsive two-column cards with tags, prompt copy, and last-updated timestamp.
- **Content fields**: `heading`, `description`, `emptyStateMessage`, `locale`, `macros[]` (id, title, prompt, tags, createdAt).
- **Notes**: Macros should be sorted newest-first. Locale controls the `toLocaleDateString` formatting.
