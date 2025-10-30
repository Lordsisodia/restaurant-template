# Business Information

This folder contains all core business details for the client.

## Files to Create:

### 1. `company-details.md`
```markdown
# Company Details

## Business Name
[Full legal business name]

## Tagline/Slogan
[Main tagline or slogan]

## Description
[2-3 sentence description of the business]

## Story/About
[Origin story, mission, values - longer form content]

## Unique Selling Points
- [USP 1]
- [USP 2]
- [USP 3]
```

### 2. `contact-info.md`
```markdown
# Contact Information

## Phone Numbers
- Main: [+XX XXX-XXX-XXXX]
- Delivery: [+XX XXX-XXX-XXXX]
- WhatsApp: [number]

## Email
- General: [email@example.com]
- Support: [support@example.com]
- Reservations: [reservations@example.com]

## Address
**Street:** [Street address]
**City:** [City]
**State/Province:** [State]
**Postal Code:** [Code]
**Country:** [Country]

## Coordinates
- Latitude: [lat]
- Longitude: [lng]
- Google Maps Plus Code: [code]

## Business Hours
| Day | Hours |
|-----|-------|
| Monday | [9:00 AM - 10:00 PM] |
| Tuesday | [9:00 AM - 10:00 PM] |
| Wednesday | [9:00 AM - 10:00 PM] |
| Thursday | [9:00 AM - 10:00 PM] |
| Friday | [9:00 AM - 11:00 PM] |
| Saturday | [9:00 AM - 11:00 PM] |
| Sunday | [10:00 AM - 9:00 PM] |

**Special Hours:**
- [Holidays, special closures, etc.]
```

### 3. `social-media.md`
```markdown
# Social Media Links

## Social Profiles
- **Website:** [https://example.com]
- **Facebook:** [https://facebook.com/...]
- **Instagram:** [@username]
- **Twitter/X:** [@username]
- **TikTok:** [@username]
- **YouTube:** [Channel URL]
- **LinkedIn:** [Company page]

## Delivery Platforms
- **GrabFood:** [Link]
- **GoFood:** [Link]
- **Uber Eats:** [Link]
- **DoorDash:** [Link]

## Review Sites
- **Google Maps:** [Link to place]
- **TripAdvisor:** [Link]
- **Yelp:** [Link]
- **Zomato:** [Link]

## Credentials (DO NOT COMMIT)
> Store actual credentials in .env file, not here!

- Social media API keys
- Platform integration tokens
```

---

## How to Use

1. Create each file listed above in this folder
2. Fill out all sections with client information
3. Keep this up-to-date as information changes
4. Use this as the source of truth for populating `src/config/client.ts`
