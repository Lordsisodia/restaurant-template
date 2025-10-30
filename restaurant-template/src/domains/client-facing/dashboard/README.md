# Dashboard Module

**Route:** `/admin`
**Priority:** Tier 1 - Essential

## Purpose
The main dashboard serves as the command center for restaurant owners and managers. It provides a real-time overview of all critical business metrics and operations.

## Key Features

### Real-time Metrics
- **Today's Revenue** - Current revenue vs. yesterday/last week
- **Active Orders** - Live count of orders in progress
- **Table Occupancy** - Current table status and availability
- **Staff on Shift** - Who's working right now

### Quick Stats Cards
- Revenue breakdown (today, week, month, year)
- Orders count with trend indicators (↑ up 15% vs yesterday)
- Average ticket value
- Customer satisfaction score

### Visual Analytics
- **Revenue Chart** - 7/30/90 day line chart
- **Top Dishes** - Best sellers today/this week
- **Peak Hours Heat Map** - Busiest times visualization
- **Table Occupancy** - Visual floor plan status

### Critical Alerts
- 🔴 Low inventory warnings
- ⚠️ Failed payment alerts
- 💬 New negative review notifications
- 🔔 Reservation conflicts

### Quick Actions Sidebar
- Add special/promotion
- Create reservation
- Send customer notification
- View pending tasks

## Components Structure
```
dashboard/
├── components/
│   ├── analytics/
│   │   ├── RevenueChart.tsx
│   │   ├── OrdersMetrics.tsx
│   │   ├── ReservationsStats.tsx
│   │   └── TopDishes.tsx
│   ├── realtime/
│   │   ├── LiveOrders.tsx
│   │   ├── KitchenStatus.tsx
│   │   └── TableStatus.tsx
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

## Technical Notes
- Uses Supabase Realtime for live updates
- Caches metrics with 5-minute TTL
- Mobile-responsive with swipeable cards
- Auto-refreshes critical data every 30 seconds

## User Personas
- **Restaurant Owner** - High-level overview, revenue focus
- **Manager** - Operations focus, staff management
- **Host** - Table status, reservations

## Success Metrics
- Time to critical information < 2 seconds
- Dashboard load time < 1 second
- Real-time update latency < 500ms
