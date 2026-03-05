

# Handyman Direct — Phase 2: Full Platform Build

## Prerequisites

**Supabase must be connected first.** No database connection exists yet. Before any implementation can begin, you need to enable Lovable Cloud (preferred) or connect an external Supabase project. This gives us authentication, database, storage, and edge functions.

**Recommendation:** Use **Lovable Cloud** — it spins up Supabase automatically without needing an external account.

---

## Implementation Strategy

This is a large build (~30+ new files, 12+ database tables, 3 dashboard layouts). It will be broken into sequential batches to stay within quality limits.

### Batch 1: Database Schema + Auth
- Enable Lovable Cloud / Supabase connection
- Create all 12 tables with proper relationships, RLS policies, and enums
- **Roles stored in separate `user_roles` table** (per security requirements) — NOT on the users/profiles table
- Set up Supabase Auth with email/password signup
- Create auth context, protected route wrapper, and role-based redirects
- Build Login and Customer Signup pages
- Build Contractor Signup wizard (3-step: Personal Details → Trade Selection → Coverage Area)

### Batch 2: Customer Dashboard
- Dashboard layout with authenticated nav bar (Overview, My Requests, Invoices, Profile, POST A JOB)
- `/dashboard` — Welcome + recent jobs + reviews + profile overview
- `/dashboard/requests` — Job list with status badges
- `/dashboard/invoices` — Tabs (Invoices/Receipts) with date/reference filters
- `/dashboard/profile` — Account settings with sub-panels (My Account, Sign-in & Security)

### Batch 3: Job Posting Flow (Authenticated)
- Full-screen modal wizard with green progress bar
- 4 steps: Service Type → Job Details → Location → Confirmation
- Saves to Supabase `jobs` table on submit
- Photo upload to Supabase Storage

### Batch 4: Contractor Dashboard
- Contractor layout with nav (Overview, Available Jobs, Engagements, Requests, Archives, Invoices)
- `/contractor/dashboard` — Welcome + donut chart stats + credits stats + reviews
- `/contractor/available` — Invited / Available / Other jobs sections with Engage button
- `/contractor/engagements` — Engaged jobs with revealed customer details
- `/contractor/requests`, `/contractor/archives`, `/contractor/invoices`
- `/contractor/profile` — Full account management with trade/coverage editors

### Batch 5: Credits System + Cart
- `/contractor/cart` — Buy credits page with dynamic pricing (R25/credit)
- Placeholder payment button with friendly info banner
- Credit deduction on engage (confirmation modal, balance check)
- Bad lead flagging flow

### Batch 6: Admin Panel
- `/admin` — Role-gated admin area
- Users, Jobs, Contractors, Credits, Invoices, Reviews management pages
- Contractor verification approval/rejection
- Manual credit issuance and bad lead refund handling

### Batch 7: Notifications + Header Integration
- `notifications` table reads with unread badge
- Conditional header: public nav for guests, customer nav for customers, contractor nav for contractors
- Email notification edge functions for key events (job posted, contractor engaged, account verified)

---

## Database Design

```text
┌──────────────┐     ┌───────────────────┐     ┌──────────────┐
│  auth.users  │────→│   user_roles      │     │  profiles     │
│  (Supabase)  │────→│  (admin/customer/ │     │  (shared)     │
└──────────────┘     │   contractor)     │     └──────────────┘
       │             └───────────────────┘            │
       ├──→ customer_profiles                         │
       ├──→ contractor_profiles                       │
       │         │                                    │
       │    ┌────┴─────┐                              │
       │    │   jobs   │←─── quotes                   │
       │    │          │←─── engagements               │
       │    │          │←─── reviews                   │
       │    └──────────┘                              │
       │                                              │
       ├──→ credits_transactions                      │
       ├──→ invoices                                  │
       ├──→ subscriptions                             │
       └──→ notifications                             │
```

Key decisions:
- `user_roles` table with `app_role` enum (`admin`, `customer`, `contractor`) — security-definer `has_role()` function for RLS
- `profiles` table for shared fields (full_name, mobile, profile_picture_url) linked to `auth.users`
- `customer_profiles` and `contractor_profiles` for role-specific data
- All tables have RLS enabled with policies using `has_role()` function

---

## Design Consistency

All new pages will use the existing design system:
- White backgrounds, green primary buttons (`hsl(145 63% 42%)`)
- `Plus Jakarta Sans` for headings, `DM Sans` for body
- Card-based layouts with `border` and `shadow-sm`
- Green underline accents on section headings
- Status badges: green (completed), orange (engaged), blue (open), red (bad lead)
- Green progress bars on all wizard flows
- Existing Header/Footer unchanged on public pages; new authenticated headers for dashboards

---

## What Will NOT Change

All existing public pages remain untouched:
- Homepage (`/`)
- Booking page (`/book`) — stays as WhatsApp-based for non-logged-in users
- Contractor recruitment page (`/contractors`)
- FAQ page (`/faq`)
- All SEO trade/city/suburb pages

---

## First Action

To proceed, **Lovable Cloud needs to be enabled**. Shall I enable it now so we can start building the database schema and authentication?

