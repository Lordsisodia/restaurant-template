# Floor Plan Editor Module

**Route:** `/admin/reservations/floor-plan`
**Priority:** Tier 2 - Enhanced Features

## Purpose
Interactive floor plan editor for creating and managing restaurant layout, table configurations, and visual seating management. Essential for reservation optimization and guest experience.

## Key Features

### Floor Plan Editor
- **Drag & Drop Interface** - Visual table placement
- **Table Shapes** - Round, square, rectangle, custom
- **Capacity Settings** - Seats per table
- **Table Numbering** - Auto or manual numbering
- **Sections/Zones** - Patio, main dining, bar, private room
- **Accessibility** - Mark wheelchair-accessible tables
- **Grid Snap** - Align tables perfectly
- **Zoom & Pan** - Navigate large floor plans

### Table Configuration
- **Table Properties**
  - Table number/name
  - Capacity (min/max guests)
  - Shape and size
  - Section assignment
  - Server assignment
  - Status (active/inactive)
- **Combination Rules** - Which tables can combine
- **Preferred Seating** - VIP or special tables
- **Accessibility** - ADA compliance markers

### Visual Management
- **Real-time Status** - See which tables are occupied
- **Color Coding**
  - 🟢 Available
  - 🟡 Reserved
  - 🔴 Occupied
  - ⚪ Cleaning
  - 🔵 VIP
- **Reservation Overlay** - See upcoming reservations
- **Waitlist Integration** - Assign from waitlist
- **Quick Actions** - Right-click for options

### Templates & Layouts
- **Save Layouts** - Multiple floor plan versions
- **Event Layouts** - Special occasion setups
- **Seasonal Configurations** - Patio open/closed
- **Private Events** - Rearrange for parties
- **Copy/Paste** - Duplicate sections

## Components Structure
```
floor-plan/
├── components/
│   ├── editor/
│   │   ├── FloorPlanCanvas.tsx
│   │   ├── TableShape.tsx
│   │   ├── DragDropManager.tsx
│   │   └── ZoomControls.tsx
│   ├── controls/
│   │   ├── TableProperties.tsx
│   │   ├── SectionManager.tsx
│   │   └── LayoutSelector.tsx
│   └── status/
│       ├── TableStatusOverlay.tsx
│       ├── ReservationPreview.tsx
│       └── QuickActions.tsx
├── pages/
│   └── FloorPlanEditor.tsx
└── shared/
    ├── hooks/
    │   └── useFloorPlan.ts
    └── types/
        └── floor-plan-types.ts
```

## Use Cases
- Design new restaurant layout
- Optimize table placement for capacity
- Manage reservations visually
- Quick seat assignment for walk-ins
- Track table turnover in real-time
- Plan private events with custom layouts

## Success Metrics
- Table optimization: +15% capacity utilization
- Seating time reduced by 30%
- Reservation conflicts down 90%
- User satisfaction: "Much easier to manage"
