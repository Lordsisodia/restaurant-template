# Analytics Module

**Route:** `/admin/analytics`
**Priority:** Tier 1 - Essential

## Purpose
Advanced analytics and reporting system for data-driven decision making. Provides deep insights into sales, customers, menu performance, and operational efficiency.

## Key Features

### Sales Analytics
- **Revenue Reports** - Filterable by time, category, item
- **Payment Method Breakdown** - Cash, card, gift card splits
- **Category Performance** - Appetizers vs mains vs desserts
- **Time-based Analysis** - Hourly, daily, weekly, monthly trends
- **Comparison Reports** - This week vs last week, YoY

### Customer Analytics
- **New vs Returning** - Customer acquisition trends
- **Customer Lifetime Value (CLV)** - Top customers by spend
- **Average Order Value (AOV)** - Per customer segment
- **Acquisition Cost (CAC)** - Marketing efficiency
- **Demographics** - If available from profiles

### Menu Performance
- **Best/Worst Sellers** - By count and revenue
- **Profit Margins** - Item-level profitability
- **Category Trends** - What's gaining/losing popularity
- **Seasonal Patterns** - Identify seasonal favorites
- **Item Pairing** - Frequently ordered together

### Operational Metrics
- **Peak Hours Analysis** - Busiest times by day of week
- **Table Turnover Rate** - Efficiency metrics
- **Average Wait Time** - Customer experience
- **Order Fulfillment Time** - Kitchen efficiency
- **Staff Productivity** - Orders/hour per server

### Export & Reporting
- **PDF Reports** - Professional formatted reports
- **Excel/CSV Export** - Raw data for analysis
- **Scheduled Reports** - Email automation (daily/weekly/monthly)
- **Custom Date Ranges** - Any time period
- **Share Reports** - Send to stakeholders

## Components Structure
```
analytics/
├── components/
│   ├── reports/
│   │   ├── SalesReport.tsx
│   │   ├── CustomerInsights.tsx
│   │   ├── MenuPerformance.tsx
│   │   └── StaffPerformance.tsx
│   ├── charts/
│   │   ├── TimeSeriesChart.tsx
│   │   ├── CategoryBreakdown.tsx
│   │   └── ComparisonChart.tsx
│   └── export/
│       ├── ExportReportButton.tsx
│       └── ScheduledReports.tsx
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

## Report Types

### Pre-built Reports
1. **Daily Sales Summary** - Revenue, orders, top items
2. **Weekly Performance** - Week-over-week comparison
3. **Monthly Financial** - Full month breakdown
4. **Customer Insights** - CLV, segments, behavior
5. **Menu Engineering** - Star/puzzle/plow horse/dog analysis
6. **Staff Performance** - Sales, tips, reviews by staff

### Custom Reports
- Choose metrics to include
- Select time period
- Filter by category/location
- Save report templates
- Schedule automatic delivery

## Technical Notes
- Pre-aggregated data in `daily_metrics` table
- Real-time calculations for today
- Efficient queries with proper indexes
- Chart library: Recharts
- Export using jsPDF and xlsx

## User Personas
- **Owner** - High-level financial and strategic insights
- **Manager** - Operational metrics and staff performance
- **Marketing** - Customer behavior and campaign ROI

## Success Metrics
- Report generation time < 3 seconds
- Export completion < 5 seconds
- Data accuracy: 99.9%
- User satisfaction: "I can make decisions faster"
