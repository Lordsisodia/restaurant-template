# Customer Database & CRM Module

**Route:** `/admin/customers`
**Priority:** Tier 1 - Essential

## Purpose
Comprehensive customer relationship management (CRM) system to understand, segment, and engage with customers. Build lasting relationships and increase customer lifetime value.

## Key Features

### Customer Database
- **Complete Customer List** - All registered customers
- **Advanced Search** - By name, email, phone, tags
- **Smart Filters** - By segment, spend, visit frequency
- **Bulk Actions** - Tag, email, export multiple customers
- **Import/Export** - CSV import for migration

### 360° Customer View
Each customer profile shows:

#### Basic Information
- Name, email, phone
- Birthday/anniversary
- Preferred contact method
- Profile photo
- Account creation date

#### Dining History
- **All Orders** - Complete order history
- **Total Spent** - Lifetime value
- **Order Frequency** - Visits per month
- **Favorite Items** - Most ordered dishes
- **Average Order Value** - Per visit
- **Last Visit** - Days since last order

#### Reservation History
- Past reservations
- Preferred seating
- Party size patterns
- No-show history
- Special requests

#### Preferences & Notes
- **Dietary Restrictions** - Allergies, preferences
- **Seating Preferences** - Window, quiet, patio
- **Special Occasions** - Birthdays, anniversaries
- **VIP Notes** - Important customer details
- **Communication Preferences** - Email, SMS, push

#### Engagement History
- **Reviews Left** - All reviews
- **Feedback Submitted** - Survey responses
- **Loyalty Status** - Current tier and points
- **Referrals Made** - Referred customers
- **Campaign Responses** - Marketing engagement

### Customer Segmentation

#### Automatic Segments
- **🌟 VIP Customers** - Top 10% by lifetime value
- **🔥 Regulars** - Visit 2+ times per month
- **🆕 New Customers** - First visit within 30 days
- **⚠️ At-Risk** - Haven't visited in 60+ days
- **💰 High Spenders** - AOV > $100
- **🎂 Occasion Diners** - Only special events
- **📧 Email Subscribers** - Marketing opt-in
- **🎁 Loyalty Members** - Active in program

#### Custom Segments
Create custom segments based on:
- Order frequency
- Total lifetime spend
- Average order value
- Last visit date
- Favorite categories
- Dietary preferences
- Location proximity
- Review activity
- Referral status

### Customer Lifetime Value (CLV)
Automatic calculation:
```
CLV = (Total Spent) + (Predicted Future Value)
```

Factors:
- Order frequency trend
- Average order value
- Time since last visit
- Loyalty tier
- Engagement level

### Marketing Automation

#### Campaign Types
- **Email Campaigns** - Bulk or targeted
- **SMS Campaigns** - Text message blasts
- **Push Notifications** - Mobile app alerts
- **Personalized Offers** - Individual discounts

#### Automated Campaigns
- **Welcome Series** - New customer onboarding
- **Birthday/Anniversary** - Special occasion offers
- **Win-Back** - Lapsed customer re-engagement
- **Post-Visit** - Thank you + review request
- **Loyalty Milestones** - Tier upgrades, rewards
- **VIP Exclusives** - Early access, special events
- **Referral Incentives** - Bring-a-friend rewards

#### Campaign Performance
- Open rates
- Click-through rates
- Conversion rates
- Revenue generated
- ROI calculation

### Loyalty Program Management
- **Points Balance** - Current points
- **Tier Status** - Bronze/Silver/Gold/Platinum
- **Rewards History** - Redeemed rewards
- **Points Activity** - Earn/burn log
- **Tier Progress** - Points to next tier
- **Expiration Alerts** - Points expiring soon

### Feedback & Review Management
- **Review Aggregation** - Google, Yelp, Facebook
- **In-App Feedback** - Post-visit surveys
- **Sentiment Analysis** - Positive/neutral/negative
- **Response Management** - Reply to reviews
- **Issue Escalation** - Flag problems for manager
- **Follow-up Tracking** - Resolution status

### Customer Communication

#### Bulk Messaging
- Select segment or individual customers
- Choose channel (email/SMS/push)
- Use templates or custom message
- Schedule or send immediately
- Track delivery and opens

#### Triggered Messages
- Order confirmation
- Reservation reminder
- Order ready notification
- Feedback request
- Special occasion greeting

#### Personalization
- Use customer name
- Reference favorite items
- Tailor offers to preferences
- Dynamic content based on segment

## Components Structure
```
customers/
├── components/
│   ├── database/
│   │   ├── CustomerList.tsx
│   │   ├── CustomerProfile.tsx
│   │   ├── CustomerCard.tsx
│   │   ├── OrderHistory.tsx
│   │   └── LifetimeValue.tsx
│   ├── segmentation/
│   │   ├── CustomerSegments.tsx
│   │   ├── SegmentBuilder.tsx
│   │   ├── BehaviorAnalysis.tsx
│   │   └── SegmentPreview.tsx
│   ├── engagement/
│   │   ├── EmailCampaigns.tsx
│   │   ├── SMSMarketing.tsx
│   │   ├── PushNotifications.tsx
│   │   └── CampaignBuilder.tsx
│   ├── loyalty/
│   │   ├── LoyaltyTiers.tsx
│   │   ├── PointsManager.tsx
│   │   ├── RewardsRedemption.tsx
│   │   └── TierProgress.tsx
│   └── feedback/
│       ├── ReviewAggregator.tsx
│       ├── SentimentAnalysis.tsx
│       ├── ResponseManager.tsx
│       └── IssueEscalation.tsx
├── pages/
│   ├── CustomersPage.tsx
│   ├── CustomerProfile.tsx
│   ├── SegmentsPage.tsx
│   └── CampaignsPage.tsx
└── shared/
    ├── services/
    │   ├── crmService.ts
    │   ├── loyaltyService.ts
    │   ├── campaignService.ts
    │   └── segmentationService.ts
    └── types/
        └── customer-types.ts
```

## Customer Journey

### 1. Discovery
- First website visit
- Social media interaction
- Referral from friend
- Walk-in customer

### 2. First Visit
- Create customer profile
- Capture contact info
- Note preferences
- Enroll in loyalty program

### 3. Engagement
- Send welcome email
- Offer first-visit discount
- Request feedback
- Encourage review

### 4. Retention
- Birthday/anniversary offers
- Personalized recommendations
- Loyalty rewards
- VIP recognition

### 5. Advocacy
- Referral program
- Review requests
- Social media features
- Ambassador program

## Reports Available
- **Customer Acquisition** - New customers by source
- **Retention Analysis** - Churn rate, repeat visits
- **Lifetime Value** - Top customers, trends
- **Segment Performance** - Compare segment behaviors
- **Campaign ROI** - Revenue per campaign
- **Feedback Summary** - Satisfaction trends

## Technical Notes
- **Data Privacy:** GDPR/CCPA compliant
- **Consent Management:** Opt-in/opt-out tracking
- **Data Encryption:** PII encrypted at rest
- **API Integrations:**
  - Email: SendGrid, Mailchimp
  - SMS: Twilio
  - Reviews: Google/Yelp APIs
- **Real-time Updates:** Live CLV calculation
- **Export:** Customer data export for GDPR requests

## User Personas
- **Marketing Manager** - Campaigns and segmentation
- **Owner** - Customer insights and CLV
- **Manager** - Customer service and issue resolution
- **Host** - Quick customer lookup for VIP treatment

## Success Metrics
- Customer retention rate increase by 20%
- Repeat visit frequency up 30%
- Average CLV increase by 25%
- Email campaign open rate > 25%
- Customer satisfaction score > 4.5/5
- Referral rate increase by 15%

## Privacy & Compliance
- **GDPR Compliance** - Right to access, delete
- **CCPA Compliance** - California privacy law
- **CAN-SPAM** - Email marketing rules
- **TCPA** - SMS/call regulations
- **Data Retention** - Configurable policies
- **Consent Tracking** - Marketing permissions

## Integration Opportunities
- **Email Service Providers** - Mailchimp, Klaviyo
- **SMS Gateways** - Twilio, Plivo
- **Review Platforms** - Podium, Birdeye
- **Social Media** - Facebook, Instagram APIs
- **Analytics** - Google Analytics, Mixpanel
- **CRM Systems** - HubSpot, Salesforce

## Future Enhancements
- AI-powered churn prediction
- Automated personalization engine
- Smart send time optimization
- Predictive lifetime value
- Dynamic segment creation
- Voice of customer analytics
- Customer journey mapping
- Net Promoter Score (NPS) tracking
