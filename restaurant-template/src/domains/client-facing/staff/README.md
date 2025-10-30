# Staff Management Module

**Route:** `/admin/staff`
**Priority:** Tier 1 - Essential

## Purpose
Comprehensive staff management system for hiring, scheduling, performance tracking, and permissions management. Centralizes all employee-related operations.

## Key Features

### Staff Directory
- **Complete Staff List** - All active/inactive employees
- **Profile Management** - Contact info, roles, hire date
- **Quick Search** - By name, role, or department
- **Status Filters** - Active, on leave, terminated
- **Bulk Actions** - Update multiple staff at once

### Role-Based Permissions
Pre-defined roles with specific access:

#### 🔐 Admin
- Full system access
- Manage all settings
- View all reports
- User management

#### 👔 Manager
- Operations management
- Staff scheduling
- View reports
- Menu updates
- Cannot change system settings

#### 🚪 Host
- Reservation management
- Waitlist management
- Table assignments
- Guest profiles
- Cannot view financial data

#### 🍽️ Server
- Take orders
- View assigned tables
- Customer info
- Cannot modify prices

#### 👨‍🍳 Kitchen
- Kitchen display access
- Order status updates
- Recipe viewing
- Cannot view financials

#### 💰 Cashier
- POS operations
- Process payments
- Issue refunds
- Cannot modify menu prices

### Permission Matrix
Custom permissions beyond roles:
- View analytics
- Manage menu
- Process refunds
- Access reports
- Modify orders
- Send notifications
- View customer data
- Export data

### Performance Tracking

#### Individual Metrics
- **Sales per Shift** - Revenue generated
- **Orders Served** - Count and accuracy
- **Average Ticket** - Upselling effectiveness
- **Tips Earned** - Customer satisfaction proxy
- **Customer Reviews** - Ratings mentioning server
- **Order Accuracy** - Error rate
- **Speed of Service** - Table turn time

#### Leaderboards
- Top seller of the month
- Most orders served
- Highest average ticket
- Best customer reviews
- Gamification elements

### Staff Information
- **Personal Info** - Name, contact, emergency contact
- **Employment** - Hire date, position, department
- **Compensation** - Hourly rate, salary (admin only)
- **Documents** - W-2, contracts, certifications
- **Certifications** - Food handler, alcohol service
- **Training** - Completed modules, progress
- **Attendance** - Clock in/out history
- **Notes** - Manager notes, performance reviews

### Clock In/Out System
- Digital time tracking
- Mobile app support
- GPS verification (optional)
- Break tracking
- Overtime alerts
- Shift summary export
- Payroll integration ready

### Training & Onboarding
- **Training Modules** - Video, documents, quizzes
- **Progress Tracking** - Completion status
- **Certification Management** - Expiration alerts
- **Onboarding Checklist** - New hire tasks
- **Knowledge Base** - Restaurant policies, procedures
- **Document Vault** - Employee handbook, forms

## Components Structure
```
staff/
├── components/
│   ├── directory/
│   │   ├── StaffList.tsx
│   │   ├── StaffProfile.tsx
│   │   ├── StaffCard.tsx
│   │   └── QuickSearch.tsx
│   ├── permissions/
│   │   ├── RoleManager.tsx
│   │   ├── PermissionMatrix.tsx
│   │   └── RoleAssignment.tsx
│   ├── performance/
│   │   ├── SalesLeaderboard.tsx
│   │   ├── TipReporting.tsx
│   │   ├── ReviewsByStaff.tsx
│   │   └── PerformanceChart.tsx
│   ├── time-tracking/
│   │   ├── ClockInOut.tsx
│   │   ├── TimeSheet.tsx
│   │   └── AttendanceCalendar.tsx
│   └── onboarding/
│       ├── TrainingModules.tsx
│       ├── ProgressTracker.tsx
│       └── DocumentVault.tsx
├── pages/
│   ├── StaffDirectory.tsx
│   ├── StaffProfile.tsx
│   └── PerformanceDashboard.tsx
└── shared/
    ├── services/
    │   ├── staffService.ts
    │   └── permissionsService.ts
    └── types/
        └── staff-types.ts
```

## Staff Lifecycle

### 1. Hiring
- Create staff profile
- Assign role and permissions
- Upload documents (I-9, W-4)
- Set compensation
- Assign training modules

### 2. Onboarding
- Welcome email with credentials
- Training module assignments
- Shadow shift scheduling
- Manager introduction
- Certification requirements

### 3. Active Employment
- Regular scheduling
- Performance tracking
- Training updates
- Performance reviews
- Role changes/promotions

### 4. Offboarding
- Final shift scheduling
- Exit interview
- Document collection
- System access revocation
- Archive profile

## Reports Available
- **Payroll Summary** - Hours worked, overtime
- **Performance Reports** - Individual/team metrics
- **Attendance Reports** - Late, absent, early leave
- **Training Compliance** - Certification status
- **Turnover Analysis** - Retention metrics

## Technical Notes
- **Authentication:** Integrated with existing auth system
- **Permissions:** Row-level security in Supabase
- **File Storage:** Supabase Storage for documents
- **Encryption:** Sensitive data encrypted at rest
- **Audit Logs:** Track all permission changes
- **Mobile:** Responsive for tablet/phone access

## User Personas
- **Owner/Admin** - Full staff oversight, hiring/firing
- **Manager** - Day-to-day staff management
- **HR** - Training, compliance, documentation
- **Staff Member** - View own profile, schedule, performance

## Success Metrics
- Staff onboarding time reduced by 50%
- Permission errors: < 1% of actions
- Time tracking accuracy: 99%+
- Training completion rate: 90%+
- Employee satisfaction with system

## Compliance Notes
- **GDPR/Privacy** - Staff data protection
- **Labor Laws** - Break tracking, overtime
- **Document Retention** - 7-year minimum
- **Access Control** - Role-based security
- **Audit Trail** - Track all data access

## Future Enhancements
- AI shift recommendations
- Predictive scheduling
- Skill-based scheduling
- Mobile clock in/out app
- Biometric authentication
- Integration with payroll providers (ADP, Gusto)
- Performance improvement plans (PIP) tracking
- 360-degree feedback system
