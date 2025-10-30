# Kitchen Display System (KDS) Module

**Route:** `/admin/kitchen`
**Priority:** Tier 1 - Essential

## Purpose
Real-time kitchen display system designed for kitchen staff to manage incoming orders efficiently. Replaces traditional paper tickets with a digital workflow system.

## Key Features

### Order Flow Management
Orders progress through stages:
1. **NEW** 🔵 - Just received (sound + visual alert)
2. **CONFIRMED** ✅ - Acknowledged by kitchen
3. **PREPARING** 🟡 - Gathering ingredients
4. **COOKING** 🔴 - Active on stations
5. **READY** 🟢 - Ready for pickup/delivery
6. **COMPLETED** ✔️ - Delivered to customer

### Display Modes

#### All Orders View
- Grid of all active orders
- Color-coded by priority (wait time)
- Sortable by: time, table, priority
- Filter by: station, status, server

#### Station View
- **Grill Station** - Only grill items
- **Prep Station** - Cold prep, salads
- **Dessert Station** - Desserts, pastries
- **Expo Station** - Final assembly
- Custom stations configurable

#### Bump Bar Mode
- Full-screen single order focus
- Large text for visibility
- One-tap completion
- Auto-advances to next order

### Smart Features

#### Priority System
- 🔴 **URGENT** - Order > 30 min old
- 🟡 **WARNING** - Order > 15 min old
- 🟢 **ON TIME** - Order < 15 min old
- Auto-escalates based on wait time

#### Prep Time Tracking
- Visual countdown timer per order
- Expected vs actual prep time
- Performance metrics
- Alert when behind schedule

#### Order Details
- **Large, readable text** - Tablet-optimized
- **Special requests highlighted** - Red box
- **Modifications in bold** - "NO onions"
- **Allergen warnings** - ⚠️ icons
- **Quantity badges** - Clear item counts

#### Audio Alerts
- New order notification (customizable sound)
- Urgent order alert (escalating)
- Order modification alert
- Kitchen timer alerts

### Kitchen Communication
- Order notes from servers
- Chef notes visible to all stations
- Modification notifications
- Direct communication to front-of-house

### Management Features
- Real-time order queue monitoring
- Average prep time analytics
- Station workload balancing
- Peak time insights
- Staff performance tracking

## Components Structure
```
kitchen/
├── components/
│   ├── kitchen-display/
│   │   ├── KitchenDisplaySystem.tsx
│   │   ├── OrderTicket.tsx
│   │   ├── PrepTimers.tsx
│   │   └── StationView.tsx
│   ├── controls/
│   │   ├── StatusControls.tsx
│   │   ├── FilterBar.tsx
│   │   └── SettingsPanel.tsx
│   └── alerts/
│       ├── AudioAlerts.tsx
│       └── VisualAlerts.tsx
├── pages/
│   ├── KitchenDisplayPage.tsx
│   └── StationPage.tsx
└── shared/
    ├── hooks/
    │   ├── useOrderStream.ts
    │   ├── useKitchenNotifications.ts
    │   └── useStationFilter.ts
    └── types/
        └── kitchen-types.ts
```

## Display Layouts

### Grid Layout (Default)
```
┌─────────┬─────────┬─────────┐
│ Order 1 │ Order 2 │ Order 3 │
│  5 min  │  12 min │  18 min │
├─────────┼─────────┼─────────┤
│ Order 4 │ Order 5 │ Order 6 │
│  2 min  │  8 min  │  25 min │
└─────────┴─────────┴─────────┘
```

### List Layout
```
━━━━━━━━━━━━━━━━━━━━━━━━━
 Table 5  |  5 min  |  🟢
━━━━━━━━━━━━━━━━━━━━━━━━━
 2x Burger (NO onions)
 1x Salad
 1x Fries
━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Bump Bar Layout
```
╔════════════════════════════╗
║      TABLE 8 - 12 MIN      ║
║                            ║
║  3x STEAK (MEDIUM RARE)    ║
║  2x SALMON                 ║
║  1x PASTA (NO GARLIC)      ║
║                            ║
║  Special: Extra sauce      ║
║                            ║
║    [TAP TO COMPLETE]       ║
╚════════════════════════════╝
```

## Hardware Recommendations
- **Display:** 21"+ tablet or monitor per station
- **Touch:** Multi-touch support
- **Mount:** Wall/countertop adjustable arm
- **Protection:** Waterproof/grease-resistant case
- **Audio:** External speaker for alerts
- **Backup:** WiFi + cellular connection

## Technical Notes
- **Real-time:** Supabase Realtime subscriptions
- **Offline Mode:** Queue updates when connection drops
- **Auto-reconnect:** Seamless connection recovery
- **Performance:** < 100ms update latency
- **Scalability:** Handles 100+ concurrent orders
- **Accessibility:** Large fonts, high contrast

## User Personas
- **Line Cook** - Station-specific view
- **Expo** - All orders, final quality check
- **Kitchen Manager** - Analytics and oversight
- **Chef** - Real-time operation monitoring

## Success Metrics
- Order acknowledgment time < 30 seconds
- Average prep time improvement 15%
- Reduced order errors by 40%
- Kitchen staff satisfaction increase
- Zero missed orders

## Future Enhancements
- Voice commands for hands-free operation
- AI-based prep time estimation
- Predictive station load balancing
- Integrated video calling to FOH
- Recipe display integration
