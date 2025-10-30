# Customer Segmentation Module

**Route:** `/admin/customers/segments`
**Priority:** Tier 2 - Enhanced Features

## Purpose
Advanced customer segmentation engine for creating targeted marketing campaigns, personalized experiences, and data-driven customer strategies.

## Key Features

### Segment Builder
- **Visual Builder** - Drag-drop conditions
- **Multiple Criteria** - Combine rules with AND/OR
- **Real-time Preview** - See matching customers instantly
- **Segment Size** - Count of customers in segment
- **Save & Reuse** - Store segments for campaigns

### Segmentation Criteria

#### Behavioral
- **Order Frequency** - Visits per month
- **Total Spend** - Lifetime value
- **Average Order Value** - Spending per visit
- **Last Visit Date** - Days since last order
- **Favorite Categories** - Preferred menu items
- **Time of Day** - Lunch vs dinner crowd
- **Day of Week** - Weekend vs weekday

#### Demographic
- **Age Range** - If birthday provided
- **Location** - Proximity to restaurant
- **Communication Channel** - Email/SMS preference

#### Engagement
- **Email Opens** - Marketing engagement
- **Review Activity** - Left reviews?
- **Loyalty Status** - Current tier
- **Referrals Made** - Advocate behavior
- **Social Media** - Following on Instagram?

#### Custom Attributes
- **Tags** - Custom labels
- **VIP Status** - Manually assigned
- **Special Occasions** - Birthday/anniversary
- **Dietary Preferences** - Vegan, gluten-free

### Pre-built Segments

#### Automatic Segments
- 🌟 **VIP Customers** - Top 10% by spend
- 🔥 **Super Regulars** - 8+ visits/month
- 👋 **New Customers** - First visit < 30 days
- ⚠️ **At-Risk** - No visit in 60+ days
- 💤 **Lapsed** - No visit in 6+ months
- 💰 **High Spenders** - AOV > $100
- 🎂 **Birthday This Month** - Upcoming birthdays
- 📧 **Email Subscribers** - Marketing opt-in
- 🎁 **Loyalty Members** - Active in program
- 🌮 **Lunch Crowd** - Primarily 11am-2pm
- 🍷 **Dinner Regulars** - Primarily 5pm-9pm
- 🥗 **Health-Conscious** - Orders salads/healthy items

#### Dynamic Segments
Automatically update as customer behavior changes:
- Recently became at-risk
- Just reached VIP status
- About to lapse (45 days no visit)
- Tier upgrade eligible

### Segment Actions
- **Send Campaign** - Email/SMS to segment
- **Export List** - Download customer emails
- **Create Lookalike** - Find similar customers
- **Track Performance** - Monitor segment metrics
- **Schedule Auto-Update** - Refresh daily

### Segment Analytics
- **Size Trends** - Growing or shrinking?
- **Segment Overlap** - Customers in multiple segments
- **Revenue Contribution** - % of total revenue
- **Engagement Rates** - Campaign performance
- **Conversion Metrics** - Segment profitability

## Components Structure
```
segments/
├── components/
│   ├── builder/
│   │   ├── SegmentBuilder.tsx
│   │   ├── CriteriaSelector.tsx
│   │   ├── RuleBuilder.tsx
│   │   └── PreviewPanel.tsx
│   ├── library/
│   │   ├── SegmentList.tsx
│   │   ├── SegmentCard.tsx
│   │   └── PrebuiltSegments.tsx
│   ├── analytics/
│   │   ├── SegmentPerformance.tsx
│   │   ├── OverlapAnalysis.tsx
│   │   └── TrendChart.tsx
│   └── actions/
│       ├── CampaignLauncher.tsx
│       ├── ExportSegment.tsx
│       └── LookalikeBuilder.tsx
├── pages/
│   ├── SegmentsPage.tsx
│   └── SegmentBuilder.tsx
└── shared/
    ├── services/
    │   └── segmentationService.ts
    └── types/
        └── segment-types.ts
```

## Example Segments

### "Win-Back Campaign"
```
Criteria:
- Last visit: 30-60 days ago
- Previous frequency: 2+ visits/month
- Lifetime value: > $200
- Email opt-in: Yes

Action: Send 20% off coupon
```

### "VIP Upsell"
```
Criteria:
- Lifetime spend: > $1000
- Loyalty tier: Gold or Platinum
- Never ordered wine

Action: Wine pairing promotion
```

### "New Customer Nurture"
```
Criteria:
- First visit: Within 7 days
- Order value: > $50
- Email opt-in: Yes

Action: Welcome series (3 emails)
```

## Technical Notes
- **Real-time Updates** - Segments recalculate daily
- **Performance** - Indexed queries for speed
- **Caching** - Cache segment sizes
- **Scalability** - Handles millions of customers
- **Export Limits** - Max 10K customers per export

## Use Cases
- Targeted email campaigns
- Personalized promotions
- Churn prevention
- Upselling opportunities
- Loyalty program optimization
- Customer retention strategies

## Success Metrics
- Segment precision: 95%+ accuracy
- Campaign ROI: 400%+ for targeted vs broadcast
- Customer retention: +25% for at-risk segments
- Time to create segment: < 2 minutes
- User satisfaction: "Game-changer for marketing"
