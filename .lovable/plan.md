
# Dashboard Redesign Plan

Complete overhaul of Admin, Employee, and Candidate dashboards using a unified sidebar-shell pattern. Keeps the established brand (deep navy + orange, glassmorphism, Space Grotesk / Plus Jakarta Sans) — only structure, IA, and interaction change.

## Design language (locked to existing brand memory)

- Persistent collapsible sidebar (shadcn `Sidebar`, `collapsible="icon"`) with brand mark, sectioned nav, active-route highlight, user badge + sign-out at the bottom.
- Top bar per page: breadcrumbs, page title, quick actions, notifications, profile menu.
- Content grid: KPI cards row → primary work surface (table/list/detail) → side panel (activity/filters).
- Framer Motion page transitions and card enter animations (staggered).
- Consistent empty-states, skeleton loaders, and toast confirmations.

---

## 1. Admin Dashboard (`/admin`)

Replaces the current 1,559-line monolith with a routed shell.

**Sidebar sections**
- Overview (KPIs, recent activity)
- Jobs (list, create, edit, applications per job)
- Candidates (all applicants, search, shortlist)
- Screenings (L2 submissions, video review, scoring) — merges `/admin/screenings`
- Employees (roster, roles, create account)
- Contact Submissions (inbox view)
- Content (products, clients — if managed)
- Settings (own profile, password)

**Overview page**
- 6 KPI tiles: Open jobs, Applications this week, Pending screenings, Recommended candidates, Active employees, Unread contacts.
- Charts: applications trend (7/30 days), recommendation breakdown pie.
- Recent activity feed (last 10 events).

**Screenings page**
- Filter bar: recommendation, date range, score range, search.
- Table: candidate, email, score, recommendation badge, violations, video link, submitted.
- Row click → detail drawer with all answers, MCQ breakdown, violation timeline, embedded video, admin notes, override recommendation.
- CSV export.

---

## 2. Employee Dashboard (`/employer-dashboard` → renamed `/employee`)

**Sidebar sections**
- My Day (today's tasks, attendance clock-in/out)
- Tasks (kanban: To do / In progress / Done, with updates)
- Attendance (calendar heatmap + monthly summary)
- Profile (personal info, department, position — read-only fields locked)

**My Day**
- Clock in/out card with elapsed time.
- Today's tasks list with quick status update.
- Announcements strip.

---

## 3. Candidate Dashboard (`/profile` → shell at `/candidate`)

**Sidebar sections**
- Overview (profile completeness %, application count, saved jobs)
- My Profile (basic info, resume upload, avatar)
- Education (add/edit/delete)
- Experience (add/edit/delete)
- Skills (tag input)
- My Applications (moved from `/my-applications`)
- Screening Tests (link to available tests + past attempts summary)

**Overview**
- Profile completeness ring (calculated from filled fields).
- Application status counts (Applied, In review, Shortlisted, Rejected).
- Recommended jobs (based on skills).

---

## Technical Details

**New files**
- `src/layouts/DashboardLayout.tsx` — shared shell with `SidebarProvider`, top bar, `Outlet`.
- `src/components/dashboard/AdminSidebar.tsx`, `EmployeeSidebar.tsx`, `CandidateSidebar.tsx`.
- `src/components/dashboard/KpiCard.tsx`, `PageHeader.tsx`, `EmptyState.tsx`.
- `src/pages/admin/Overview.tsx`, `Jobs.tsx`, `Candidates.tsx`, `Screenings.tsx`, `Employees.tsx`, `Contacts.tsx`, `Settings.tsx`.
- `src/pages/employee/MyDay.tsx`, `Tasks.tsx`, `Attendance.tsx`, `Profile.tsx`.
- `src/pages/candidate/Overview.tsx`, `Profile.tsx`, `Education.tsx`, `Experience.tsx`, `Skills.tsx`, `Applications.tsx`, `Screenings.tsx`.

**Routing (`App.tsx`)**
- `/admin/*` → `DashboardLayout` + `AdminSidebar` + role guard.
- `/employee/*` → same shell + `EmployeeSidebar` + employee guard.
- `/candidate/*` → same shell + `CandidateSidebar` + auth guard.
- Old routes (`/profile`, `/my-applications`, `/employer-dashboard`, `/admin/screenings`) redirect to new locations.

**Preserved logic**
- All Supabase queries, RLS-protected access, screening edge functions, video upload, admin role check (`has_role`) — untouched.
- Data models and migrations — no schema changes.

**Removed/archived**
- Old `Admin.tsx`, `EmployerDashboard.tsx`, `Profile.tsx`, `MyApplications.tsx`, `AdminScreenings.tsx` deleted after new pages verified.

## Out of scope
- No schema changes.
- No new features beyond what already exists (I'm restructuring + polishing, not adding).
- Public marketing pages untouched.

## Estimated size
~20 new files, ~5 deletions, App.tsx updated. Build should stay green throughout.
