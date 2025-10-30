# Settings & Configuration Module

**Route:** `/admin/settings`
**Priority:** Tier 1 - Essential

## Purpose
Centralized configuration hub for all restaurant settings, integrations, branding, and system preferences. One-stop-shop for system administration.

## Key Features

### General Settings

#### Restaurant Information
- **Restaurant Name** - Display name
- **Legal Name** - For invoices/receipts
- **Description** - About the restaurant
- **Logo Upload** - Primary logo (multiple sizes)
- **Cover Photo** - Hero image
- **Contact Information**
  - Phone number
  - Email address
  - Website URL
  - Social media links

#### Location & Hours
- **Address** - Street, city, state, zip
- **Coordinates** - Lat/long for maps
- **Timezone** - Operating timezone
- **Operating Hours** - By day of week
  - Regular hours
  - Happy hour
  - Special event hours
- **Holiday Hours** - Override normal hours
- **Temporarily Closed** - Quick toggle

#### Business Settings
- **Currency** - USD, EUR, GBP, etc.
- **Tax Rate** - Sales tax percentage
- **Service Charge** - Optional auto-gratuity
- **Tax Inclusive** - Prices include tax?
- **Rounding** - Round to nearest $0.05?
- **Receipt Footer** - Custom message

### Branding & Theme

#### Visual Identity
- **Primary Color** - Brand color
- **Secondary Color** - Accent color
- **Logo Variants**
  - Primary logo
  - Icon/favicon
  - Dark mode logo
  - Email header logo
- **Fonts**
  - Heading font
  - Body font
  - Menu font
- **Color Palette** - Full brand colors

#### Email Branding
- Email header design
- Email footer design
- Social media icons
- Unsubscribe preferences
- Template customization

#### Receipt/Invoice Branding
- Header design
- Footer message
- Logo placement
- Color scheme
- Legal text

### Integrations

#### Payment Gateways
- **Stripe** - Credit/debit cards
- **Square** - POS integration
- **PayPal** - Alternative payment
- **Apple Pay / Google Pay** - Mobile wallets
- Test mode toggle
- API key management

#### Delivery Platforms
- **UberEats** - Menu sync, order import
- **DoorDash** - Integration settings
- **Grubhub** - API credentials
- **Postmates** - Order management
- Commission tracking
- Menu synchronization

#### POS Systems
- **Square POS** - Transaction sync
- **Toast** - Full integration
- **Clover** - Order import
- **TouchBistro** - Menu sync
- Inventory sync
- Staff management sync

#### Accounting Software
- **QuickBooks** - Financial sync
- **Xero** - Transaction export
- **FreshBooks** - Invoicing
- Auto-reconciliation
- Export schedules

#### Email & Communication
- **SendGrid** - Transactional emails
- **Mailchimp** - Marketing emails
- **Twilio** - SMS notifications
- **Slack** - Staff notifications
- **Discord** - Community

#### Review & Feedback
- **Google My Business** - Review monitoring
- **Yelp** - Review aggregation
- **TripAdvisor** - Listing management
- **Facebook** - Social integration
- Auto-response settings

### Notification Settings

#### Email Notifications
- **New Order** - Admin notification
- **Order Status** - Customer updates
- **Reservation Confirmed** - Both parties
- **Reservation Reminder** - Customer only
- **Review Posted** - Admin alert
- **Low Inventory** - Manager alert
- **Daily Summary** - End-of-day report
- **Weekly Report** - Analytics digest

#### SMS Notifications
- **Order Ready** - Customer pickup
- **Reservation Reminder** - 2 hours before
- **Waitlist Alert** - Table available
- **Promotional** - Marketing messages
- **Two-Factor Auth** - Security codes

#### Push Notifications
- **Order Updates** - Mobile app
- **Special Offers** - Targeted deals
- **Loyalty Rewards** - Points earned
- **New Blog Post** - Content updates

#### Staff Notifications
- **New Order** - Kitchen alert
- **Reservation** - Host notification
- **Customer Feedback** - Manager alert
- **Shift Reminder** - Staff schedule
- **Low Stock** - Inventory alert

### Security & Access

#### User Management
- **Admin Users** - Full system access
- **Manager Accounts** - Operations access
- **Staff Accounts** - Limited access
- **Role Assignment** - Permission levels
- **Password Policy** - Complexity rules
- **Session Timeout** - Auto-logout

#### Two-Factor Authentication
- **Enable 2FA** - Required for admins
- **SMS Verification** - Phone-based 2FA
- **Authenticator App** - TOTP support
- **Backup Codes** - Recovery options

#### Audit Logs
- **User Activity** - Who did what, when
- **System Changes** - Configuration updates
- **Data Access** - Customer data views
- **Export Logs** - Data downloads
- **Failed Logins** - Security monitoring
- **Retention Period** - How long to keep logs

#### Data & Privacy
- **GDPR Compliance** - EU privacy
- **CCPA Compliance** - California law
- **Data Export** - Customer data download
- **Data Deletion** - Right to be forgotten
- **Consent Management** - Marketing opt-ins
- **Cookie Policy** - Website tracking

### Advanced Settings

#### Menu Configuration
- **Default Currency Symbol** - Display format
- **Menu Item Sorting** - Default order
- **Category Display** - Grid or list
- **Image Requirements** - Min dimensions
- **Allergen Labels** - Display settings
- **Nutritional Info** - Show/hide

#### Order Configuration
- **Minimum Order** - For delivery
- **Maximum Items** - Per order
- **Order Timeout** - Auto-cancel time
- **Preparation Time** - Default estimate
- **Delivery Radius** - Maximum distance
- **Order Modifications** - Allow changes?

#### Reservation Configuration
- **Booking Window** - How far in advance
- **Minimum Party Size** - Reservation required
- **Maximum Party Size** - Group limit
- **Cancellation Policy** - Time window
- **No-Show Policy** - Penalties
- **Table Hold Time** - Minutes reserved

#### Loyalty Configuration
- **Points per Dollar** - Earn rate
- **Tier Thresholds** - Point requirements
- **Points Expiration** - Validity period
- **Referral Bonus** - Points for referrals
- **Birthday Reward** - Special gift

### Developer Settings

#### API Access
- **API Keys** - Generate/revoke
- **Webhooks** - Event subscriptions
- **Rate Limits** - API throttling
- **CORS Settings** - Allowed origins
- **API Documentation** - Developer portal

#### Debugging
- **Enable Debug Mode** - Verbose logging
- **Error Reporting** - Sentry integration
- **Performance Monitoring** - APM tools
- **Test Mode** - Sandbox environment

## Components Structure
```
settings/
├── components/
│   ├── general/
│   │   ├── RestaurantInfo.tsx
│   │   ├── LocationHours.tsx
│   │   └── BusinessSettings.tsx
│   ├── branding/
│   │   ├── LogoUpload.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── FontSelector.tsx
│   │   └── TemplatePreview.tsx
│   ├── integrations/
│   │   ├── PaymentGateways.tsx
│   │   ├── DeliveryApps.tsx
│   │   ├── POSIntegration.tsx
│   │   └── IntegrationCard.tsx
│   ├── notifications/
│   │   ├── EmailSettings.tsx
│   │   ├── SMSSettings.tsx
│   │   └── PushSettings.tsx
│   └── security/
│       ├── UserManagement.tsx
│       ├── TwoFactorAuth.tsx
│       ├── AuditLogs.tsx
│       └── DataPrivacy.tsx
├── pages/
│   └── SettingsPage.tsx
└── shared/
    ├── services/
    │   └── settingsService.ts
    └── types/
        └── settings-types.ts
```

## Settings Organization

### Tabbed Interface
```
┌─────────────────────────────────────┐
│ General | Branding | Integrations  │
│ Notifications | Security | Advanced │
├─────────────────────────────────────┤
│                                     │
│   [Settings content here]           │
│                                     │
└─────────────────────────────────────┘
```

### Sidebar Navigation
```
┌──────────┬────────────────────────┐
│ General  │  Restaurant Info       │
│ Branding │  - Name & Description  │
│ Integr.  │  - Contact Details     │
│ Notify   │  - Logo Upload         │
│ Security │                        │
│ Advanced │  [Settings fields]     │
│ API      │                        │
└──────────┴────────────────────────┘
```

## Technical Notes
- **Auto-save** - Changes saved automatically
- **Validation** - Real-time field validation
- **Preview** - See changes before saving
- **Rollback** - Undo recent changes
- **Versioning** - Settings history
- **Encryption** - API keys encrypted
- **Caching** - Settings cached for performance

## User Personas
- **Owner** - All settings access
- **Admin** - Most settings, no billing
- **Manager** - Basic settings only
- **Developer** - API and integration settings

## Success Metrics
- Settings update time < 2 seconds
- Zero misconfigurations
- Integration success rate > 95%
- User satisfaction with organization

## Security Considerations
- **Sensitive Data** - API keys encrypted
- **Access Control** - Role-based permissions
- **Change Tracking** - Audit all modifications
- **Password Requirements** - Strong policies
- **Session Security** - Timeout enforcement

## Future Enhancements
- Multi-location management
- Franchise management
- Bulk settings import/export
- Settings templates
- AI-powered recommendations
- Mobile app settings
- Voice control settings
- Advanced automation rules
