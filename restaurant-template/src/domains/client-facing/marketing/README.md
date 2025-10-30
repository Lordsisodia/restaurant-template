# Marketing Hub Module

**Route:** `/admin/marketing`
**Priority:** Tier 2 - Enhanced Features

## Purpose
Comprehensive marketing hub for creating campaigns, managing promotions, scheduling content, and tracking marketing ROI. Empowers restaurant owners to grow their business through targeted marketing.

## Key Features

### Campaign Management
- **Email Campaigns** - Build and send email campaigns
- **SMS Campaigns** - Text message marketing
- **Push Notifications** - Mobile app alerts
- **Campaign Templates** - Pre-built templates
- **A/B Testing** - Test different messages
- **Scheduling** - Schedule for optimal send times

### Promotions & Discounts
- **Discount Codes** - Generate unique codes
- **Coupon Management** - Create and track coupons
- **Happy Hour** - Time-based pricing
- **Daily Specials** - Automated daily deals
- **Limited-Time Offers** - Flash sales
- **Bundle Deals** - Combo offers
- **Buy One Get One** - BOGO promotions
- **First-Time Customer** - New customer discounts

### Content Management
- **Blog Posts** - Write and publish blog content
- **Social Media** - Schedule posts to Facebook, Instagram
- **Event Management** - Create and promote events
- **Photo Gallery** - Manage marketing images
- **Menu Updates** - Push menu changes
- **Announcements** - Restaurant news

### Marketing Analytics
- **Campaign Performance** - Open rates, clicks, conversions
- **ROI Tracking** - Revenue per campaign
- **Channel Performance** - Email vs SMS vs push
- **Customer Acquisition** - Source tracking
- **Conversion Funnel** - See where customers drop off
- **Attribution** - Which campaigns drove sales

## Components Structure
```
marketing/
├── components/
│   ├── campaigns/
│   │   ├── CampaignBuilder.tsx
│   │   ├── EmailTemplates.tsx
│   │   ├── SocialMediaScheduler.tsx
│   │   └── ABTestingManager.tsx
│   ├── promotions/
│   │   ├── DiscountManager.tsx
│   │   ├── CouponGenerator.tsx
│   │   ├── HappyHourScheduler.tsx
│   │   └── BundleBuilder.tsx
│   ├── content/
│   │   ├── BlogPostEditor.tsx
│   │   ├── InstagramIntegration.tsx
│   │   ├── EventsManager.tsx
│   │   └── GalleryManager.tsx
│   └── analytics/
│       ├── CampaignROI.tsx
│       ├── ChannelPerformance.tsx
│       └── ConversionFunnel.tsx
├── pages/
│   ├── MarketingDashboard.tsx
│   ├── CampaignsPage.tsx
│   └── PromotionsPage.tsx
└── shared/
    ├── services/
    │   └── marketingService.ts
    └── types/
        └── marketing-types.ts
```

## Success Metrics
- Campaign ROI > 300%
- Email open rate > 25%
- SMS click-through > 15%
- Promotion redemption rate > 10%
- Social media engagement up 50%
