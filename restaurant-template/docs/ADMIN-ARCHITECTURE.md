# Restaurant Admin System - Comprehensive Architecture Plan

**Version:** 1.0.0
**Last Updated:** 2025-10-30
**Status:** Architecture Design Phase

---

## Table of Contents
- [Overview](#overview)
- [Current State Analysis](#current-state-analysis)
- [System Architecture](#system-architecture)
- [Phase 1: Core Dashboard & Analytics](#phase-1-core-dashboard--analytics)
- [Phase 2: Operations Management](#phase-2-operations-management)
- [Phase 3: Staff & Customer Management](#phase-3-staff--customer-management)
- [Phase 4: Financial & Inventory](#phase-4-financial--inventory)
- [Phase 5: Marketing & Content](#phase-5-marketing--content)
- [Phase 6: Settings & Configuration](#phase-6-settings--configuration)
- [Shared Infrastructure](#shared-admin-infrastructure)
- [Implementation Roadmap](#implementation-roadmap)
- [Technical Stack](#technical-stack)
- [Database Schema](#database-schema)

---

## Overview

This document outlines the comprehensive architecture for the restaurant admin system (client-facing/business owner interface). The system is designed to provide restaurant owners and managers with complete control over their operations, from real-time order management to analytics and reporting.

### Goals
- **Real-time Operations**: Live order tracking, kitchen display, table management
- **Data-Driven Decisions**: Comprehensive analytics and reporting
- **Streamlined Workflows**: Intuitive interfaces for daily operations
- **Scalability**: Support single and multi-location restaurants
- **Mobile-First**: Responsive design for tablets and phones

---

## Current State Analysis

### ✅ Existing Admin Routes
**Location:** `src/app/(admin)/`

Current admin pages:
- Dashboard
- Orders
- Menu
- Specials
- Reservations
- Gift Cards
- Loyalty
- Reviews
- Blog
- Leads
- Chat Assistant
- Pages

### ✅ Customer-Facing Domains
**Location:** `src/domains/customer-facing/`

Active customer domains:
- About Us (with multiple sections: hero, story, team, values, awards, etc.)
- Blog (categories, posts, sidebar)
- Chat (AI assistant)
- Landing (hero, gallery, menu, reviews, specials, etc.)
- Loyalty (tiers, rewards)
- Menu (categories, items)
- Reviews (multiple template variations)

### ✅ Existing Admin Infrastructure

**Layout Components** (`src/domains/client-facing/admin/components/layout/`):
- `AdminSidebar.tsx` - Navigation with icons
- `AdminTopbar.tsx` - Top bar
- `AdminProviders.tsx` - Context providers

**Upload Components** (`src/domains/client-facing/admin/components/`):
- `client-image-uploader.tsx`
- `gallery-uploader.tsx`
- `menu-item-uploader.tsx`
- `SeedDataButton.tsx`

**Current Navigation Items:**
```typescript
const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ClipboardList },
  { label: 'Menu', href: '/admin/menu', icon: UtensilsCrossed },
  { label: 'Specials', href: '/admin/specials', icon: Star },
  { label: 'Reservations', href: '/admin/reservations', icon: CalendarClock },
  { label: 'Gift Cards', href: '/admin/gift-cards', icon: Gift },
  { label: 'Loyalty', href: '/admin/loyalty', icon: Wallet },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
  { label: 'Blog', href: '/admin/blog', icon: Newspaper },
  { label: 'Leads', href: '/admin/leads', icon: Inbox },
  { label: 'Chat Assistant', href: '/admin/chat-assistant', icon: Bot },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
];
```

---

## System Architecture

The admin system follows a domain-driven design with clear separation between customer-facing and client-facing (admin) functionality.

```
src/
├── app/
│   ├── (admin)/          # Admin routes
│   └── (public)/         # Customer routes
├── domains/
│   ├── client-facing/    # Business owner/admin features
│   │   └── admin/
│   ├── customer-facing/  # Public-facing features
│   └── shared/           # Shared utilities
```

---

## Phase 1: Core Dashboard & Analytics

### 1. Main Dashboard
**Location:** `src/domains/client-facing/admin/dashboard/`

```
dashboard/
├── components/
│   ├── analytics/
│   │   ├── RevenueChart.tsx          # Daily/weekly/monthly revenue
│   │   ├── OrdersMetrics.tsx         # Orders count, avg ticket
│   │   ├── ReservationsStats.tsx     # Occupancy, no-shows
│   │   └── TopDishes.tsx             # Best sellers
│   ├── realtime/
│   │   ├── LiveOrders.tsx            # Active orders widget
│   │   ├── KitchenStatus.tsx         # Kitchen load indicator
│   │   └── TableStatus.tsx           # Table availability
│   └── quick-actions/
│       ├── QuickAddSpecial.tsx
│       ├── QuickReservation.tsx
│       └── SendNotification.tsx
├── pages/
│   └── DashboardPage.tsx
└── shared/
    ├── hooks/
    │   ├── useDashboardMetrics.ts
    │   └── useRealtimeUpdates.ts
    └── types/
        └── dashboard-types.ts
```

#### Key Features
- **Real-time Metrics**
  - Today's revenue vs. yesterday/last week
  - Active orders count
  - Current table occupancy
  - Staff on shift

- **Quick Stats Cards**
  - Revenue (today, week, month, year)
  - Orders count with trend indicators
  - Average ticket value
  - Customer satisfaction score

- **Visual Analytics**
  - Revenue line chart (7/30/90 days)
  - Top 5 selling dishes
  - Peak hours heat map
  - Table occupancy visualization

- **Critical Alerts**
  - Low inventory warnings
  - Failed payment alerts
  - Negative review notifications
  - Reservation conflicts

- **Quick Actions**
  - Add special/promotion
  - Create reservation
  - Send customer notification
  - View pending tasks

---

### 2. Advanced Analytics
**Location:** `src/domains/client-facing/admin/analytics/`

```
analytics/
├── components/
│   ├── reports/
│   │   ├── SalesReport.tsx           # Filterable sales data
│   │   ├── CustomerInsights.tsx      # Demographics, behavior
│   │   ├── MenuPerformance.tsx       # Item analysis
│   │   └── StaffPerformance.tsx      # Server metrics
│   ├── charts/
│   │   ├── TimeSeriesChart.tsx
│   │   ├── CategoryBreakdown.tsx
│   │   └── ComparisonChart.tsx
│   └── export/
│       ├── ExportReportButton.tsx    # PDF/Excel/CSV
│       └── ScheduledReports.tsx      # Email automation
├── pages/
│   ├── AnalyticsOverview.tsx
│   └── CustomReports.tsx
└── shared/
    ├── services/
    │   ├── analyticsService.ts
    │   └── reportGenerator.ts
    └── types/
        └── analytics-types.ts
```

#### Metrics to Track

**Revenue Analytics:**
- Revenue by time period (hour, day, week, month, year)
- Revenue by category (appetizers, mains, desserts, drinks)
- Revenue by item
- Payment method breakdown

**Customer Analytics:**
- New vs. returning customers
- Customer lifetime value (CLV)
- Average order value (AOV)
- Customer acquisition cost (CAC)
- Demographics (if available)

**Operational Analytics:**
- Peak hours analysis
- Table turnover rate
- Average wait time
- Order fulfillment time
- Staff productivity metrics

**Menu Analytics:**
- Best/worst selling items
- Item profit margins
- Category performance
- Seasonal trends
- Item pairing analysis

**Marketing Analytics:**
- Campaign ROI
- Channel performance
- Loyalty program engagement
- Referral tracking

---

## Phase 2: Operations Management

### 3. Advanced Order Management
**Location:** `src/domains/client-facing/admin/orders/`

```
orders/
├── components/
│   ├── kitchen-display/
│   │   ├── KitchenDisplaySystem.tsx  # KDS for kitchen
│   │   ├── OrderTicket.tsx
│   │   ├── PrepTimers.tsx
│   │   └── StationView.tsx           # Grill, prep, dessert stations
│   ├── order-management/
│   │   ├── OrderList.tsx             # Filterable list
│   │   ├── OrderDetails.tsx
│   │   ├── OrderTimeline.tsx         # Status tracking
│   │   └── RefundManager.tsx
│   └── delivery/
│       ├── DeliveryTracker.tsx       # 3rd party integration
│       └── DriverAssignment.tsx
├── pages/
│   ├── OrdersPage.tsx
│   └── KitchenDisplayPage.tsx
└── shared/
    ├── hooks/
    │   ├── useOrderStream.ts          # Realtime orders
    │   └── useKitchenNotifications.ts
    └── types/
        └── order-types.ts
```

#### Features

**Order Flow:**
1. **Received** - New order notification (sound + visual)
2. **Confirmed** - Order accepted by restaurant
3. **Preparing** - In kitchen queue
4. **Cooking** - Active on stations
5. **Ready** - Ready for pickup/delivery
6. **Completed** - Order delivered/picked up

**Kitchen Display System (KDS):**
- Real-time order streaming
- Color-coded priority (based on wait time)
- Station-specific views (grill, prep, dessert)
- Prep time timers with alerts
- Order modifications highlighted
- Special requests prominently displayed
- One-tap status updates

**Order Management:**
- Comprehensive order search/filter
- Order modification interface
- Refund/void processing
- Order notes and special requests
- Print ticket automation
- Order history with full details

**Delivery Integration:**
- Third-party delivery tracking (UberEats, DoorDash, etc.)
- Driver assignment for in-house delivery
- Real-time delivery status
- Customer notifications

---

### 4. Enhanced Menu Management
**Location:** `src/domains/client-facing/admin/menu/`

```
menu/
├── components/
│   ├── menu-builder/
│   │   ├── MenuItemEditor.tsx        # Rich editor
│   │   ├── CategoryManager.tsx
│   │   ├── ModifiersBuilder.tsx      # Toppings, sides, etc.
│   │   └── PricingTiers.tsx          # Size variations
│   ├── inventory/
│   │   ├── IngredientTracker.tsx
│   │   ├── RecipeBuilder.tsx         # Cost calculation
│   │   └── LowStockAlerts.tsx
│   ├── scheduling/
│   │   ├── MenuScheduler.tsx         # Breakfast/lunch/dinner
│   │   └── SeasonalMenus.tsx
│   └── optimization/
│       ├── ProfitMarginCalculator.tsx
│       └── PopularityScoring.tsx
├── pages/
│   ├── MenuEditorPage.tsx
│   └── InventoryPage.tsx
└── shared/
    ├── services/
    │   ├── menuService.ts
    │   └── inventoryService.ts
    └── types/
        └── menu-types.ts
```

#### Advanced Features

**Menu Builder:**
- Drag-and-drop menu organization
- Rich text editor for descriptions
- Multi-image upload with cropping
- Category management
- Modifier/addon builder (toppings, sizes, sides)
- Pricing tiers (small/medium/large)
- Allergen & dietary labels
- Preparation time estimation

**Inventory Integration:**
- Link menu items to ingredients
- Auto-disable items when out of stock
- Low stock warnings
- Recipe costing (ingredient costs → menu item cost)
- Profit margin calculation
- Suggested pricing based on target margin

**Menu Scheduling:**
- Time-based menus (breakfast, lunch, dinner)
- Day-specific menus (weekend brunch)
- Seasonal menu rotation
- Special event menus
- Auto-activation based on schedule

**Menu Optimization:**
- Popularity scoring
- Menu item performance tracking
- A/B testing support
- Recommendation engine data
- Menu engineering (star, plow horse, puzzle, dog)

---

### 5. Smart Reservation System
**Location:** `src/domains/client-facing/admin/reservations/`

```
reservations/
├── components/
│   ├── booking/
│   │   ├── TableManagementGrid.tsx   # Visual floor plan
│   │   ├── ReservationCalendar.tsx
│   │   ├── WaitlistManager.tsx
│   │   └── PartySizeOptimizer.tsx
│   ├── customer/
│   │   ├── GuestProfiles.tsx         # Preferences, history
│   │   ├── VIPBadges.tsx
│   │   └── SpecialRequests.tsx
│   ├── automation/
│   │   ├── ConfirmationEmails.tsx
│   │   ├── ReminderSystem.tsx
│   │   └── NoShowTracking.tsx
│   └── capacity/
│       ├── TableTurnoverCalculator.tsx
│       └── OverbookingRules.tsx
├── pages/
│   ├── ReservationsPage.tsx
│   └── FloorPlanEditor.tsx
└── shared/
    ├── hooks/
    │   ├── useReservationStream.ts
    │   └── useTableOptimization.ts
    └── types/
        └── reservation-types.ts
```

#### Smart Features

**Floor Plan Management:**
- Interactive drag-drop floor plan editor
- Table configuration (size, shape, capacity)
- Section/zone management (patio, bar, dining room)
- Table combination rules
- Accessibility considerations

**Intelligent Booking:**
- Auto-suggest table based on party size
- Optimal table assignment algorithm
- Buffer time between seatings
- Table turn time estimation
- Overbooking rules and limits

**Guest Management:**
- Guest profile system
  - Dining history
  - Preferences (window seat, quiet area)
  - Allergies & dietary restrictions
  - VIP status
  - Special occasions (birthdays, anniversaries)
- Guest notes and tags
- Blacklist management (no-shows, problematic guests)

**Waitlist Integration:**
- Real-time waitlist
- SMS notification when table ready
- Waitlist → reservation conversion
- Estimated wait time calculation

**Automation:**
- Automated confirmation emails/SMS
- Reminder notifications (1 day, 2 hours before)
- Post-dining feedback requests
- No-show tracking and penalties
- Cancellation policies

**Capacity Management:**
- Dynamic capacity calculation
- Peak time management
- Special event reservations
- Private dining room booking
- Turn time tracking

---

## Phase 3: Staff & Customer Management

### 6. Staff Management
**Location:** `src/domains/client-facing/admin/staff/`

```
staff/
├── components/
│   ├── scheduling/
│   │   ├── ShiftPlanner.tsx          # Drag-drop scheduler
│   │   ├── AvailabilityManager.tsx
│   │   └── LaborCostCalculator.tsx
│   ├── performance/
│   │   ├── SalesLeaderboard.tsx
│   │   ├── TipReporting.tsx
│   │   └── ReviewsByStaff.tsx
│   ├── permissions/
│   │   ├── RoleManager.tsx           # Admin, Manager, Server, Kitchen
│   │   └── PermissionMatrix.tsx
│   └── onboarding/
│       ├── TrainingModules.tsx
│       └── DocumentVault.tsx
├── pages/
│   ├── StaffDirectory.tsx
│   └── SchedulingPage.tsx
└── shared/
    ├── services/
    │   └── staffService.ts
    └── types/
        └── staff-types.ts
```

#### Features

**Role-Based Permissions:**
- **Admin** - Full system access
- **Manager** - Operations, staff, reports
- **Host** - Reservations, waitlist, seating
- **Server** - Orders, customer info
- **Kitchen** - Kitchen display, order status
- **Cashier** - POS, payments, refunds

**Shift Scheduling:**
- Drag-and-drop weekly scheduler
- Availability management
- Shift swap requests
- Auto-scheduling based on demand
- Labor cost calculation
- Overtime tracking
- Break compliance

**Performance Tracking:**
- Sales per shift
- Average ticket value
- Tips tracking
- Customer reviews by server
- Order accuracy rate
- Leaderboards and gamification

**Staff Management:**
- Staff directory with contact info
- Clock in/out system
- Attendance tracking
- Training progress
- Certification management
- Document storage (W-2, contracts)

---

### 7. Customer Database & CRM
**Location:** `src/domains/client-facing/admin/customers/`

```
customers/
├── components/
│   ├── database/
│   │   ├── CustomerList.tsx          # Searchable, filterable
│   │   ├── CustomerProfile.tsx
│   │   ├── OrderHistory.tsx
│   │   └── LifetimeValue.tsx
│   ├── segmentation/
│   │   ├── CustomerSegments.tsx      # VIP, regulars, at-risk
│   │   └── BehaviorAnalysis.tsx
│   ├── engagement/
│   │   ├── EmailCampaigns.tsx
│   │   ├── SMSMarketing.tsx
│   │   └── PushNotifications.tsx
│   └── loyalty/
│       ├── LoyaltyTiers.tsx
│       ├── PointsManager.tsx
│       └── RewardsRedemption.tsx
├── pages/
│   ├── CustomersPage.tsx
│   └── LoyaltyProgramPage.tsx
└── shared/
    ├── services/
    │   ├── crmService.ts
    │   └── loyaltyService.ts
    └── types/
        └── customer-types.ts
```

#### CRM Features

**360° Customer View:**
- Complete order history
- Reservation history
- Review/feedback history
- Loyalty points balance
- Lifetime value calculation
- Preferred items
- Dining frequency

**Customer Segmentation:**
- **VIP Customers** - High lifetime value
- **Regulars** - Frequent diners
- **New Customers** - First-time or recent
- **At-Risk** - Haven't visited recently
- **Occasion Diners** - Special events only
- Custom segments based on behavior

**Marketing Automation:**
- Birthday/anniversary campaigns
- Win-back campaigns (lapsed customers)
- New customer welcome series
- Loyalty tier upgrades
- Special offer distribution
- Event invitations

**Loyalty Program:**
- Points earning rules
- Tier system (Bronze, Silver, Gold, Platinum)
- Rewards catalog
- Points expiration management
- Referral tracking
- Birthday rewards

**Feedback Management:**
- Review aggregation (Google, Yelp, etc.)
- In-app feedback collection
- Sentiment analysis
- Response management
- Issue escalation

---

## Phase 4: Financial & Inventory

> **Note:** Financial and inventory management features are planned for future phases. The architecture below is designed for when these features are needed.

### 8. Financial Management (Future)
**Location:** `src/domains/client-facing/admin/finance/`

```
finance/
├── components/
│   ├── reporting/
│   │   ├── ProfitLossStatement.tsx
│   │   ├── CashFlowReport.tsx
│   │   └── TaxReporting.tsx
│   ├── payments/
│   │   ├── PaymentMethodManager.tsx  # Stripe, Square, etc.
│   │   ├── RefundProcessor.tsx
│   │   └── TipDistribution.tsx
│   ├── expenses/
│   │   ├── ExpenseTracker.tsx
│   │   ├── VendorPayments.tsx
│   │   └── CategoryBudgets.tsx
│   └── forecasting/
│       ├── RevenueForecast.tsx
│       └── SeasonalTrends.tsx
├── pages/
│   ├── FinancialDashboard.tsx
│   └── ExpensesPage.tsx
└── shared/
    ├── services/
    │   ├── financeService.ts
    │   └── paymentGateway.ts
    └── types/
        └── finance-types.ts
```

#### Features (Future)
- Profit & Loss statements
- Cash flow tracking
- Expense categorization
- Vendor payment management
- Tax reporting
- Revenue forecasting
- Payment gateway integration
- Tip distribution management

---

### 9. Inventory & Supply Chain (Future)
**Location:** `src/domains/client-facing/admin/inventory/`

```
inventory/
├── components/
│   ├── stock/
│   │   ├── InventoryList.tsx
│   │   ├── StockAdjustments.tsx
│   │   └── AutoReorderSystem.tsx
│   ├── suppliers/
│   │   ├── SupplierDirectory.tsx
│   │   ├── PurchaseOrders.tsx
│   │   └── PriceComparison.tsx
│   ├── waste/
│   │   ├── WasteTracker.tsx
│   │   └── ExpirationAlerts.tsx
│   └── receiving/
│       ├── DeliveryReceiving.tsx
│       └── QualityChecks.tsx
├── pages/
│   ├── InventoryPage.tsx
│   └── SuppliersPage.tsx
└── shared/
    ├── services/
    │   ├── inventoryService.ts
    │   └── supplierService.ts
    └── types/
        └── inventory-types.ts
```

#### Features (Future)
- Real-time stock levels
- Auto-reorder triggers
- Supplier management
- Price comparison
- Purchase order management
- Waste tracking
- COGS calculation
- Expiration date tracking
- Recipe-to-ingredient mapping
- Receiving and quality checks

---

## Phase 5: Marketing & Content

### 10. Marketing Hub
**Location:** `src/domains/client-facing/admin/marketing/`

```
marketing/
├── components/
│   ├── campaigns/
│   │   ├── CampaignBuilder.tsx
│   │   ├── EmailTemplates.tsx
│   │   └── SocialMediaScheduler.tsx
│   ├── promotions/
│   │   ├── DiscountManager.tsx
│   │   ├── CouponGenerator.tsx
│   │   └── HappyHourScheduler.tsx
│   ├── content/
│   │   ├── BlogPostEditor.tsx
│   │   ├── InstagramIntegration.tsx
│   │   └── EventsManager.tsx
│   └── analytics/
│       ├── CampaignROI.tsx
│       └── ChannelPerformance.tsx
├── pages/
│   ├── MarketingDashboard.tsx
│   └── CampaignsPage.tsx
└── shared/
    └── services/
        └── marketingService.ts
```

#### Features

**Campaign Management:**
- Email campaign builder
- SMS campaigns
- Push notification campaigns
- Social media post scheduler
- Campaign performance tracking
- A/B testing

**Promotions:**
- Discount code generator
- Coupon management
- Happy hour scheduling
- Daily specials automation
- Limited-time offers
- Bundle deals

**Content Management:**
- Blog post editor (extends existing)
- Social media integration
- Event management
- Photo gallery management
- Menu updates
- Website content updates

**Analytics:**
- Campaign ROI tracking
- Channel performance
- Customer acquisition source
- Conversion tracking
- Engagement metrics

---

## Phase 6: Settings & Configuration

### 11. Restaurant Settings
**Location:** `src/domains/client-facing/admin/settings/`

```
settings/
├── components/
│   ├── general/
│   │   ├── RestaurantInfo.tsx        # Name, address, hours
│   │   ├── BrandingSettings.tsx      # Logo, colors, fonts
│   │   └── LocationsManager.tsx      # Multi-location support
│   ├── integrations/
│   │   ├── POSIntegration.tsx        # Square, Toast, Clover
│   │   ├── DeliveryApps.tsx          # UberEats, DoorDash
│   │   └── PaymentGateways.tsx
│   ├── notifications/
│   │   ├── EmailSettings.tsx
│   │   ├── SMSProvider.tsx
│   │   └── PushConfig.tsx
│   └── security/
│       ├── UserManagement.tsx
│       ├── AuditLogs.tsx
│       └── DataExport.tsx
├── pages/
│   └── SettingsPage.tsx
└── shared/
    └── types/
        └── settings-types.ts
```

#### Configuration Options

**General Settings:**
- Restaurant name and description
- Address and contact info
- Operating hours
- Timezone configuration
- Currency settings
- Tax rates

**Branding:**
- Logo upload
- Color scheme customization
- Font selection
- Email template branding
- Receipt customization

**Integrations:**
- POS system integration (Square, Toast, Clover)
- Delivery platform integration (UberEats, DoorDash, Grubhub)
- Payment gateways (Stripe, PayPal)
- Accounting software (QuickBooks, Xero)
- Email service provider
- SMS gateway

**Notifications:**
- Email notification preferences
- SMS notification settings
- Push notification configuration
- Alert thresholds
- Notification templates

**Security & Compliance:**
- User management
- Role assignments
- Two-factor authentication
- Audit logs
- Data export (GDPR compliance)
- Session management
- API key management

**Multi-Location:**
- Location profiles
- Cross-location analytics
- Centralized menu management
- Location-specific settings

---

## Shared Admin Infrastructure

### Core Components
**Location:** `src/domains/client-facing/admin/shared/`

```
shared/
├── components/
│   ├── data-tables/
│   │   ├── DataTable.tsx             # Reusable table
│   │   ├── Filters.tsx
│   │   ├── Pagination.tsx
│   │   └── ColumnConfig.tsx
│   ├── forms/
│   │   ├── FormBuilder.tsx
│   │   ├── ImageUploadZone.tsx
│   │   ├── RichTextEditor.tsx
│   │   └── DateTimePicker.tsx
│   ├── charts/
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── HeatMap.tsx
│   │   └── AreaChart.tsx
│   ├── notifications/
│   │   ├── NotificationCenter.tsx
│   │   ├── AlertSystem.tsx
│   │   └── Toast.tsx
│   └── layout/
│       ├── PageHeader.tsx
│       ├── StatsCard.tsx
│       ├── EmptyState.tsx
│       ├── LoadingState.tsx
│       └── ErrorBoundary.tsx
├── hooks/
│   ├── useAuth.ts                    # Admin authentication
│   ├── usePermissions.ts             # Role-based access
│   ├── useRealtime.ts                # WebSocket connection
│   ├── useAnalytics.ts               # Analytics helpers
│   ├── usePagination.ts
│   ├── useDebounce.ts
│   └── useToast.ts
├── services/
│   ├── apiClient.ts                  # HTTP client
│   ├── realtimeService.ts            # WebSocket service
│   ├── uploadService.ts              # File upload
│   ├── exportService.ts              # Data export
│   └── notificationService.ts
├── utils/
│   ├── formatters.ts                 # Number, date, currency
│   ├── validators.ts                 # Form validation
│   ├── permissions.ts                # Permission checks
│   └── constants.ts
└── types/
    ├── admin-types.ts
    ├── shared-types.ts
    └── api-types.ts
```

### Reusable Patterns

**Data Table Pattern:**
- Sortable columns
- Filterable data
- Pagination
- Row selection
- Bulk actions
- Export functionality
- Column visibility toggle
- Responsive mobile view

**Form Pattern:**
- Form builder with validation
- Auto-save drafts
- Error handling
- Success feedback
- Loading states
- File upload with preview
- Date/time pickers
- Rich text editors

**Chart Pattern:**
- Responsive charts
- Tooltip customization
- Color theming
- Data export
- Time range selection
- Zoom/pan capabilities
- Legend customization

**Modal/Dialog Pattern:**
- Confirmation dialogs
- Form modals
- Image viewers
- Detail panels
- Slide-over panels

---

## Implementation Roadmap

### Sprint 1: Foundation (Week 1-2)
**Goal:** Core infrastructure and basic dashboard

- [x] Admin layout (already complete)
- [ ] Main dashboard with real-time metrics
- [ ] Basic order list improvements
- [ ] Simple analytics (revenue, order count)
- [ ] Notification system
- [ ] Shared components (DataTable, StatsCard, Charts)

**Deliverables:**
- Functional dashboard with key metrics
- Real-time order count
- Basic revenue chart
- Notification center

---

### Sprint 2: Core Operations (Week 3-4)
**Goal:** Enhanced order and kitchen management

- [ ] Kitchen Display System (KDS)
  - Real-time order streaming
  - Station-based views
  - Timer system
  - Status workflow
- [ ] Advanced order management
  - Detailed order view
  - Order timeline
  - Modification interface
- [ ] Menu management improvements
  - Enhanced item editor
  - Modifier builder
  - Inventory linking (basic)

**Deliverables:**
- Working KDS for kitchen staff
- Enhanced order management interface
- Improved menu editor

---

### Sprint 3: Reservations & Customers (Week 5-6)
**Goal:** Smart reservation system and CRM

- [ ] Enhanced reservation system
  - Floor plan editor
  - Visual table management
  - Waitlist integration
  - Guest profiles
- [ ] Customer database
  - Customer list with search/filter
  - Customer profile view
  - Order history
- [ ] Basic loyalty enhancements
  - Points tracking
  - Tier system

**Deliverables:**
- Interactive floor plan
- Guest profile system
- Enhanced loyalty tracking

---

### Sprint 4: Staff & Analytics (Week 7-8)
**Goal:** Staff management and advanced analytics

- [ ] Staff management
  - Staff directory
  - Role-based permissions
  - Basic scheduling
  - Performance tracking
- [ ] Advanced analytics
  - Custom date ranges
  - Category breakdowns
  - Export reports (PDF, Excel)
  - Menu performance analytics

**Deliverables:**
- Staff management system
- Comprehensive analytics dashboard
- Report export functionality

---

### Sprint 5: Marketing & Polish (Week 9-10)
**Goal:** Marketing tools and system refinement

- [ ] Marketing hub
  - Campaign builder
  - Promotion manager
  - Social media integration
- [ ] Settings & configuration
  - Restaurant settings
  - Integration management
  - User preferences
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] User testing and feedback
- [ ] Documentation

**Deliverables:**
- Complete marketing suite
- Fully responsive admin
- Optimized performance
- User documentation

---

## Technical Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:**
  - Existing: `@siso/ui` components
  - Shadcn UI (for admin-specific components)
- **State Management:**
  - Server State: TanStack Query (React Query)
  - UI State: Zustand (lightweight, simple)
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts or Chart.js
- **Tables:** TanStack Table (React Table v8)
- **Date/Time:** date-fns
- **Real-time:** Supabase Realtime (WebSockets)

### Backend
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Already using `useTenant()` - extend with roles
- **API:** Next.js API routes (consider tRPC for type safety)
- **File Storage:** Supabase Storage
- **Real-time:** Supabase Realtime subscriptions
- **Email:** SendGrid or Resend
- **SMS:** Twilio

### Infrastructure
- **Hosting:** Vercel
- **CDN:** Vercel Edge Network
- **Monitoring:** Vercel Analytics
- **Error Tracking:** Sentry (optional)

### Development Tools
- **Package Manager:** pnpm
- **Code Quality:** ESLint, Prettier
- **Testing:** Vitest, Playwright
- **Git Workflow:** Feature branches → PR → Main

---

## Database Schema

### Core Tables (Existing)
- `tenants` - Restaurant/tenant info
- `menu_items` - Menu items
- `menu_categories` - Menu categories
- `orders` - Customer orders
- `reservations` - Table reservations
- `customers` - Customer accounts
- `reviews` - Customer reviews
- `blog_posts` - Blog content
- `specials` - Daily specials
- `gift_cards` - Gift card management
- `loyalty_members` - Loyalty program

### New Tables Required

#### Analytics
```sql
-- Daily aggregated metrics
CREATE TABLE daily_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  date date NOT NULL,
  revenue decimal(10,2),
  orders_count integer,
  customers_count integer,
  avg_ticket decimal(10,2),
  created_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, date)
);

-- Hourly sales for peak analysis
CREATE TABLE hourly_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  date date NOT NULL,
  hour integer NOT NULL, -- 0-23
  revenue decimal(10,2),
  orders_count integer,
  UNIQUE(tenant_id, date, hour)
);

-- Menu item performance
CREATE TABLE menu_item_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id),
  date date NOT NULL,
  views_count integer DEFAULT 0,
  orders_count integer DEFAULT 0,
  revenue decimal(10,2) DEFAULT 0,
  UNIQUE(menu_item_id, date)
);
```

#### Operations
```sql
-- Kitchen stations
CREATE TABLE kitchen_stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  name text NOT NULL, -- 'Grill', 'Prep', 'Dessert'
  display_order integer,
  is_active boolean DEFAULT true
);

-- Order timeline (status changes)
CREATE TABLE order_timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  status text NOT NULL, -- 'received', 'preparing', 'cooking', 'ready', 'completed'
  timestamp timestamptz DEFAULT now(),
  user_id uuid, -- Staff member who updated
  notes text
);

-- Floor plan tables
CREATE TABLE floor_plan_tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  table_number text NOT NULL,
  capacity integer NOT NULL,
  x_position integer, -- For visual floor plan
  y_position integer,
  section text, -- 'Patio', 'Main Dining', 'Bar'
  is_active boolean DEFAULT true,
  UNIQUE(tenant_id, table_number)
);

-- Table assignments (for reservations)
CREATE TABLE table_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id uuid REFERENCES reservations(id),
  table_id uuid REFERENCES floor_plan_tables(id),
  assigned_at timestamptz DEFAULT now()
);
```

#### Staff
```sql
-- Staff members
CREATE TABLE staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  user_id uuid, -- Link to auth user
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  role text NOT NULL, -- 'admin', 'manager', 'server', 'kitchen', 'host'
  is_active boolean DEFAULT true,
  hired_at date,
  created_at timestamptz DEFAULT now()
);

-- Staff shifts
CREATE TABLE staff_shifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid REFERENCES staff(id),
  shift_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  role text, -- Role for this shift
  notes text
);

-- Staff permissions
CREATE TABLE staff_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid REFERENCES staff(id),
  permission text NOT NULL, -- 'view_analytics', 'manage_menu', etc.
  UNIQUE(staff_id, permission)
);

-- Staff performance metrics
CREATE TABLE staff_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid REFERENCES staff(id),
  date date NOT NULL,
  orders_served integer DEFAULT 0,
  total_sales decimal(10,2) DEFAULT 0,
  tips_earned decimal(10,2) DEFAULT 0,
  avg_rating decimal(3,2),
  UNIQUE(staff_id, date)
);
```

#### Customers & CRM
```sql
-- Customer segments
CREATE TABLE customer_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  name text NOT NULL,
  description text,
  rules jsonb, -- Segment criteria
  created_at timestamptz DEFAULT now()
);

-- Customer segment membership
CREATE TABLE customer_segment_members (
  customer_id uuid REFERENCES customers(id),
  segment_id uuid REFERENCES customer_segments(id),
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (customer_id, segment_id)
);

-- Customer lifetime value (calculated)
CREATE TABLE customer_lifetime_value (
  customer_id uuid PRIMARY KEY REFERENCES customers(id),
  total_orders integer DEFAULT 0,
  total_spent decimal(10,2) DEFAULT 0,
  avg_order_value decimal(10,2),
  last_order_date date,
  calculated_at timestamptz DEFAULT now()
);

-- Marketing campaigns
CREATE TABLE marketing_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  name text NOT NULL,
  type text NOT NULL, -- 'email', 'sms', 'push'
  status text DEFAULT 'draft', -- 'draft', 'scheduled', 'sent'
  segment_id uuid REFERENCES customer_segments(id),
  scheduled_at timestamptz,
  sent_at timestamptz,
  content jsonb,
  created_at timestamptz DEFAULT now()
);
```

#### Inventory (Future)
```sql
-- Inventory items (ingredients)
CREATE TABLE inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  name text NOT NULL,
  unit text NOT NULL, -- 'kg', 'liters', 'pieces'
  current_stock decimal(10,2),
  reorder_level decimal(10,2),
  unit_cost decimal(10,2),
  supplier_id uuid
);

-- Recipe ingredients (many-to-many)
CREATE TABLE recipe_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id),
  inventory_item_id uuid REFERENCES inventory_items(id),
  quantity decimal(10,2) NOT NULL,
  unit text NOT NULL
);

-- Stock adjustments
CREATE TABLE stock_adjustments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id uuid REFERENCES inventory_items(id),
  adjustment_type text NOT NULL, -- 'restock', 'waste', 'correction'
  quantity decimal(10,2) NOT NULL,
  reason text,
  adjusted_by uuid, -- Staff ID
  adjusted_at timestamptz DEFAULT now()
);
```

#### Financial (Future)
```sql
-- Expenses
CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  category text NOT NULL, -- 'supplies', 'labor', 'utilities', etc.
  amount decimal(10,2) NOT NULL,
  description text,
  expense_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Payment transactions
CREATE TABLE payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  amount decimal(10,2) NOT NULL,
  payment_method text NOT NULL, -- 'card', 'cash', 'gift_card'
  status text DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  transaction_id text, -- External payment gateway ID
  processed_at timestamptz DEFAULT now()
);
```

### Indexes for Performance
```sql
-- Analytics indexes
CREATE INDEX idx_daily_metrics_tenant_date ON daily_metrics(tenant_id, date DESC);
CREATE INDEX idx_hourly_sales_tenant_date ON hourly_sales(tenant_id, date, hour);
CREATE INDEX idx_menu_performance_date ON menu_item_performance(date DESC);

-- Orders indexes
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_timeline_order ON order_timeline(order_id, timestamp);

-- Staff indexes
CREATE INDEX idx_staff_tenant ON staff(tenant_id) WHERE is_active = true;
CREATE INDEX idx_shifts_date ON staff_shifts(shift_date, staff_id);

-- Customer indexes
CREATE INDEX idx_customer_ltv_spent ON customer_lifetime_value(total_spent DESC);
CREATE INDEX idx_customer_last_order ON customer_lifetime_value(last_order_date DESC);
```

---

## Performance Considerations

### Real-time Updates
- Use Supabase Realtime subscriptions for:
  - New orders (notify kitchen)
  - Reservation changes
  - Inventory alerts
  - Staff notifications
- Implement reconnection logic for WebSocket drops
- Show connection status indicator

### Caching Strategy
- Cache dashboard metrics (5-minute TTL)
- Cache menu items (invalidate on update)
- Cache customer segments (hourly refresh)
- Use React Query for automatic cache management

### Pagination & Infinite Scroll
- Paginate all list views (orders, customers, etc.)
- Default page size: 25-50 items
- Implement infinite scroll for mobile
- Use cursor-based pagination for performance

### Image Optimization
- Use Next.js Image component
- Serve WebP format
- Implement lazy loading
- Generate multiple sizes for responsive images

### Code Splitting
- Route-based code splitting (automatic with App Router)
- Dynamic imports for heavy components (charts, editors)
- Lazy load modals and dialogs

---

## Security Considerations

### Authentication & Authorization
- Row-level security (RLS) in Supabase
- Role-based access control (RBAC)
- Session management
- Two-factor authentication for admins

### Data Protection
- HTTPS everywhere
- Secure cookie settings
- CSRF protection
- Input validation and sanitization
- SQL injection prevention (use parameterized queries)

### Audit Logging
- Log all critical actions:
  - Menu changes
  - Price updates
  - Order modifications
  - Customer data access
  - Permission changes
- Retention policy (90 days minimum)

### Compliance
- GDPR compliance (data export, deletion)
- PCI DSS for payment data (use certified gateway)
- Accessibility (WCAG 2.1 AA)

---

## Mobile Considerations

### Responsive Design
- Mobile-first approach
- Tablet-optimized for kitchen tablets
- Touch-friendly interfaces
- Large tap targets (44x44px minimum)

### Progressive Web App (PWA)
- Installable on iOS/Android
- Offline capability for critical features
- Push notifications
- App-like experience

### Performance on Mobile
- Minimize JavaScript bundle size
- Optimize images for mobile
- Reduce network requests
- Use service workers for caching

---

## Testing Strategy

### Unit Tests
- Business logic functions
- Utilities and helpers
- Form validation
- Data transformations

### Integration Tests
- API endpoints
- Database queries
- Authentication flows
- Payment processing

### E2E Tests (Playwright)
- Critical user journeys:
  - Order creation and fulfillment
  - Reservation booking
  - Menu item creation
  - Staff login and permissions

### Manual Testing
- Cross-browser testing (Chrome, Safari, Firefox)
- Mobile device testing (iOS, Android)
- Accessibility testing
- Performance testing

---

## Future Enhancements

### AI/ML Features
- Demand forecasting
- Dynamic pricing suggestions
- Menu optimization recommendations
- Customer churn prediction
- Personalized marketing

### Advanced Integrations
- Accounting software (QuickBooks, Xero)
- Payroll systems
- HR management
- Email marketing platforms
- Social media automation

### Multi-Location Support
- Centralized menu management
- Cross-location analytics
- Location-specific customization
- Franchise management

### Mobile Apps
- Native iOS/Android apps
- Offline-first architecture
- Tablet POS integration
- Kitchen display app

---

## Conclusion

This architecture provides a comprehensive foundation for the restaurant admin system. The phased approach allows for iterative development, starting with high-value features (dashboard, orders, menu) and expanding to advanced capabilities (analytics, CRM, inventory).

The system is designed to be:
- **Scalable** - Handles growth from single location to multi-location
- **Real-time** - Live updates for critical operations
- **User-friendly** - Intuitive interfaces for non-technical users
- **Data-driven** - Comprehensive analytics for informed decisions
- **Flexible** - Extensible architecture for future features

**Next Steps:**
1. Review and approve architecture
2. Set up development environment
3. Begin Sprint 1 implementation
4. Gather user feedback early and often

---

**Document Version:** 1.0.0
**Last Updated:** 2025-10-30
**Status:** Ready for Review
