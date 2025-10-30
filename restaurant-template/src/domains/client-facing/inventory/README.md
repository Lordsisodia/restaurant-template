# Inventory & Supply Chain Module

**Route:** `/admin/inventory`
**Priority:** Tier 3 - Future (Optional)
**Status:** 🔮 Planned for future implementation

## Purpose
Complete inventory management system for tracking ingredients, managing suppliers, automating reorders, minimizing waste, and optimizing costs. Links directly to menu items for accurate cost calculations.

## ⚠️ Implementation Note
This module is designed for future implementation. Many restaurants handle inventory manually or use specialized inventory software. Build this when:
- Restaurant has complex inventory needs
- Food cost tracking is critical
- Multiple locations need centralized inventory
- Current solutions are inadequate

## Key Features

### Inventory Management

#### Stock Tracking
- **Real-time Inventory Levels** - Current stock quantities
- **Item Details**
  - Item name and description
  - Category (protein, produce, dairy, dry goods, etc.)
  - Unit of measurement (kg, liters, pieces, boxes)
  - Current quantity
  - Reorder level (min stock)
  - Par level (max stock)
  - Unit cost
  - Total value
  - Supplier information
  - Storage location
  - Expiration tracking

#### Inventory Categories
- 🥩 **Proteins** - Meat, poultry, seafood
- 🥬 **Produce** - Fruits, vegetables
- 🥛 **Dairy** - Milk, cheese, butter
- 🍞 **Dry Goods** - Flour, rice, pasta
- 🧂 **Spices & Seasonings** - Herbs, spices
- 🍺 **Beverages** - Beer, wine, spirits, soft drinks
- 📦 **Supplies** - To-go containers, napkins
- 🧊 **Frozen** - Frozen foods
- 🥫 **Canned Goods** - Preserved items
- 🧴 **Cleaning** - Cleaning supplies

### Recipe Integration

#### Recipe Builder
- **Link Menu Items to Ingredients**
  ```
  Menu Item: Margherita Pizza
  Ingredients:
  - Pizza Dough: 250g
  - Tomato Sauce: 100ml
  - Mozzarella: 150g
  - Fresh Basil: 5g
  - Olive Oil: 15ml
  ```

#### Cost Calculation
- **Automatic Plate Cost**
  ```
  Ingredient Costs:
  - Dough (250g @ $0.004/g) = $1.00
  - Sauce (100ml @ $0.015/ml) = $1.50
  - Cheese (150g @ $0.02/g) = $3.00
  - Basil (5g @ $0.10/g) = $0.50
  - Oil (15ml @ $0.03/ml) = $0.45

  Total Plate Cost = $6.45
  Menu Price = $18.00
  Food Cost % = 35.8%
  Gross Profit = $11.55
  ```

#### Menu Impact
- See how inventory affects menu availability
- Auto-disable items when out of stock
- Suggest 86'd items based on inventory
- Alert when recipe can't be made
- Calculate how many portions available

### Auto-Reordering System

#### Smart Reorder Points
- **Minimum Stock Level** - Trigger reorder
- **Par Level** - Target stock quantity
- **Lead Time** - Days until delivery
- **Safety Stock** - Buffer for delays
- **Usage Rate** - Historical consumption

#### Automatic Purchase Orders
```
Low Stock Alert: Mozzarella
Current: 5 kg
Reorder Level: 10 kg
Par Level: 50 kg
Suggested Order: 45 kg

Auto-create PO for preferred supplier
```

#### Reorder Suggestions
- Based on historical usage
- Seasonal adjustments
- Upcoming events/reservations
- Weather patterns
- Day of week trends

### Supplier Management

#### Supplier Directory
- **Supplier Information**
  - Company name
  - Contact person
  - Phone, email
  - Address
  - Payment terms (Net 30, Net 60)
  - Minimum order amount
  - Delivery schedule
  - Lead time
  - Rating/notes

#### Multi-Supplier Support
- Compare prices across suppliers
- Track preferred suppliers per item
- Alternate supplier backups
- Bulk pricing tiers
- Contract management
- Performance tracking

#### Purchase Orders
- **Create PO** - Select items and quantities
- **Send to Supplier** - Email or print
- **Track Status** - Ordered, shipped, delivered
- **Receive Goods** - Update inventory
- **Match Invoice** - Verify pricing
- **Payment Tracking** - Mark as paid

### Receiving & Quality Control

#### Delivery Receiving
- **Scan/Check Items** - Verify quantities
- **Quality Inspection**
  - Temperature checks (for perishables)
  - Expiration date verification
  - Visual inspection
  - Weight/count accuracy
- **Discrepancy Reporting** - Missing or damaged items
- **Photo Documentation** - Record condition
- **Automatic Inventory Update** - Add to stock

#### Quality Standards
- Set acceptance criteria per item
- Temperature requirements
- Visual quality standards
- Reject non-compliant items
- Track supplier quality scores

### Waste Tracking

#### Waste Categories
- 💔 **Spoilage** - Expired or spoiled items
- 🍽️ **Prep Waste** - Trimming, peeling
- 🍳 **Cooking Waste** - Mistakes, overcooking
- 📦 **Damaged Goods** - Broken containers
- 🔙 **Customer Returns** - Sent back items
- 🗓️ **Expired** - Past expiration date

#### Waste Recording
- Log wasted items daily
- Quantity and reason
- Cost of waste
- Staff responsible (if applicable)
- Photos for documentation
- Root cause analysis

#### Waste Analytics
- **Total Waste Cost** - $ per day/week/month
- **Waste by Category** - Which items waste most
- **Waste Trends** - Improving or worsening?
- **Waste Percentage** - % of total inventory
- **Root Causes** - Why waste happens
- **Reduction Targets** - Set goals

```
Monthly Waste Report:
Total Waste: $2,450
Waste %: 6.8% of inventory value

Top Wasted Items:
1. Fresh Produce - $890 (spoilage)
2. Prepared Foods - $520 (prep errors)
3. Dairy - $340 (expiration)
4. Proteins - $700 (overcooking)

Actions:
- Reduce produce orders by 10%
- Staff training on prep techniques
- FIFO implementation for dairy
- Better portioning for proteins
```

### Expiration Management

#### Track Expiration Dates
- Enter expiration dates on receiving
- Visual alerts for items expiring soon
- FIFO (First In, First Out) enforcement
- Automatic rotation reminders
- Use-by-date tracking

#### Expiration Alerts
- 🔴 **Expired** - Past expiration date
- 🟡 **Expiring Soon** - Within 3 days
- 🟢 **Good** - 4+ days remaining

#### Automated Actions
- Alert staff to use expiring items first
- Suggest menu specials for expiring stock
- Auto-reorder replacement items
- Track expiration waste separately

### Stock Adjustments

#### Adjustment Types
- **Physical Count** - Actual count vs system
- **Waste** - Record waste
- **Theft/Loss** - Missing inventory
- **Transfer** - Between locations
- **Conversion** - Unit changes
- **Correction** - Fix errors

#### Adjustment Tracking
- Who made adjustment
- When it happened
- Reason for adjustment
- Before/after quantities
- Approval workflow (if needed)

### Inventory Counts

#### Physical Inventory
- **Full Count** - Count everything
- **Cycle Count** - Count categories on rotation
- **Spot Check** - Random item verification

#### Count Process
1. **Prepare Count Sheet** - List all items
2. **Assign Staff** - Who counts what
3. **Count Items** - Physical count
4. **Enter Counts** - Update system
5. **Review Variances** - Investigate discrepancies
6. **Adjust Inventory** - Correct quantities
7. **Generate Report** - Document results

#### Count Schedule
- Daily: High-value items (proteins, alcohol)
- Weekly: Category rotation
- Monthly: Full inventory count
- Quarterly: Audit and reconciliation

### Analytics & Reports

#### Inventory Reports
- **Current Stock Levels** - What's in stock
- **Inventory Value** - Total $ value
- **Low Stock Items** - Need reorder
- **Overstock Items** - Too much inventory
- **Dead Stock** - Not moving
- **Fast Movers** - High turnover
- **Slow Movers** - Low turnover
- **Variance Report** - Actual vs expected
- **Waste Report** - Waste by category
- **Expiration Report** - Items expiring soon

#### Performance Metrics
- **Inventory Turnover Ratio**
  ```
  Turnover = COGS / Average Inventory Value
  Target: 4-12× per year (higher = better)
  ```

- **Days Inventory Outstanding (DIO)**
  ```
  DIO = (Average Inventory / COGS) × 365
  Lower = better inventory management
  ```

- **Inventory Shrinkage**
  ```
  Shrinkage = (Recorded - Actual) / Recorded
  Target: < 2%
  ```

- **Carrying Cost**
  ```
  Cost = (Inventory Value × Carrying %) / 12
  Includes storage, insurance, obsolescence
  ```

### Integration Features

#### Menu Integration
- Real-time menu item availability
- Automatic 86 list generation
- Recipe cost updates
- Portion size tracking
- Batch cooking calculations

#### POS Integration
- Deduct inventory on sale
- Real-time stock updates
- Sales-based forecasting
- Automatic variance tracking

#### Accounting Integration
- COGS calculation
- Inventory valuation
- Expense tracking
- Vendor payment tracking

## Components Structure
```
inventory/
├── components/
│   ├── stock/
│   │   ├── InventoryList.tsx
│   │   ├── ItemDetails.tsx
│   │   ├── StockAdjustments.tsx
│   │   ├── AutoReorderSystem.tsx
│   │   └── LowStockAlerts.tsx
│   ├── suppliers/
│   │   ├── SupplierDirectory.tsx
│   │   ├── SupplierProfile.tsx
│   │   ├── PurchaseOrders.tsx
│   │   ├── PriceComparison.tsx
│   │   └── SupplierPerformance.tsx
│   ├── recipes/
│   │   ├── RecipeBuilder.tsx
│   │   ├── IngredientPicker.tsx
│   │   ├── CostCalculator.tsx
│   │   └── YieldManager.tsx
│   ├── waste/
│   │   ├── WasteTracker.tsx
│   │   ├── WasteEntry.tsx
│   │   ├── WasteAnalysis.tsx
│   │   └── ExpirationAlerts.tsx
│   ├── receiving/
│   │   ├── DeliveryReceiving.tsx
│   │   ├── QualityChecks.tsx
│   │   ├── DiscrepancyReport.tsx
│   │   └── PhotoUpload.tsx
│   ├── counting/
│   │   ├── PhysicalCount.tsx
│   │   ├── CountSheet.tsx
│   │   ├── VarianceReport.tsx
│   │   └── CycleCounter.tsx
│   └── analytics/
│       ├── InventoryDashboard.tsx
│       ├── TurnoverMetrics.tsx
│       ├── WasteAnalysis.tsx
│       └── ValueTracking.tsx
├── pages/
│   ├── InventoryPage.tsx
│   ├── SuppliersPage.tsx
│   ├── ReceivingPage.tsx
│   └── ReportsPage.tsx
└── shared/
    ├── services/
    │   ├── inventoryService.ts
    │   ├── supplierService.ts
    │   ├── recipeService.ts
    │   └── wasteService.ts
    └── types/
        └── inventory-types.ts
```

## Best Practices

### FIFO Method
**First In, First Out** - Use older inventory first
- Reduces waste from expiration
- Ensures product freshness
- Standard in food service

### Par Levels
Set appropriate par levels:
- Too low = frequent stockouts
- Too high = waste and tied-up capital
- Review and adjust seasonally

### ABC Analysis
Classify inventory by importance:
- **A Items** - High value, tight control (20% items, 80% value)
- **B Items** - Moderate value, normal control
- **C Items** - Low value, simple control (80% items, 20% value)

### Regular Counts
- Daily: High-theft/high-value items
- Weekly: Perishables
- Monthly: Full inventory
- Quarterly: Deep audit

## Why This is Tier 3 (Future)

### Many Restaurants:
1. **Manual Inventory** - Weekly counts on paper
2. **Simple Spreadsheets** - Excel tracking
3. **POS Basic Tracking** - Limited inventory features
4. **External Software** - MarketMan, BlueCart, etc.
5. **Focus on Operations** - Not inventory optimization

### Build This When:
- Food cost control is critical
- Multiple locations need sync
- Current waste is unacceptable
- Recipe costing is essential
- Existing solutions too expensive
- Need tight integration with menu

### Simpler Alternatives:
- Manual weekly counts
- Excel spreadsheet tracking
- POS inventory features
- Third-party inventory software
- Focus on menu and operations first

## Technical Notes
- **Barcode Scanning** - Fast item lookup
- **Mobile App** - Count inventory on tablet
- **OCR** - Auto-read invoices
- **Bluetooth Scales** - Auto-weight entry
- **Offline Mode** - Work without internet
- **Real-time Sync** - Multi-device support
- **Photo Storage** - Document deliveries
- **Export Options** - Excel, CSV, PDF

## User Personas
- **Kitchen Manager** - Daily inventory management
- **Chef** - Recipe management and menu planning
- **Owner** - Cost control and waste reduction
- **Receiving Staff** - Check in deliveries
- **Accountant** - COGS and valuation

## Success Metrics (When Built)
- Food cost reduction: 3-5% improvement
- Waste reduction: 30-50% decrease
- Stockout prevention: 95%+ availability
- Inventory accuracy: 98%+ match on counts
- Time saved: 10+ hours/week on counts
- Inventory turnover: Improve by 20%

## Future Enhancements
- AI demand forecasting
- Automated ordering (fully autonomous)
- Vendor marketplace integration
- Temperature monitoring integration
- Smart shelf/bin sensors
- Computer vision for counts
- Predictive maintenance for equipment
- Supply chain optimization
- Multi-location transfers
- Centralized purchasing for franchises
