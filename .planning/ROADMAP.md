# ROADMAP — Record Management System

## Project Goal
A functional frontend prototype where Administrator and Staff users can log in, manage tasks, encode/view records, and search/filter data — all running locally with no backend.

## Phases

### Phase 01: Project Setup and Foundation
**Goal:** A working static file structure with Bootstrap integration, navigation shell, and local storage helpers ready for feature development.

**Success Criteria:**
- [ ] Directory structure created (`css/`, `js/`, `pages/`, `data/`)
- [ ] Bootstrap 5 loaded (CDN or local)
- [ ] Shared navigation component working across pages
- [ ] `storage.js` utility module created for localStorage/JSON operations
- [ ] `auth.js` utility for role-based access control

**Plans:**
- 01-01: Create project structure and HTML shell
- 01-02: Integrate Bootstrap and base CSS
- 01-03: Build navigation and layout template
- 01-04: Implement storage utility module
- 01-05: Implement authentication utility (login/logout/role check)

---

### Phase 02: Authentication and Role System
**Goal:** Users can log in with role-specific credentials and are redirected appropriately; unauthorized access is blocked.

**Success Criteria:**
- [ ] Login page with username/password fields
- [ ] Demo credentials stored (Admin: admin/admin123, Staff: staff/staff123)
- [ ] Role detection working (Admin vs Staff)
- [ ] Redirect to role-specific dashboard after login
- [ ] Logout clears session and redirects to login
- [ ] Direct URL access to protected pages redirects to login if not authenticated

**Plans:**
- 02-01: Create login page UI
- 02-02: Implement login logic with demo user store
- 02-03: Add role-based redirect after login
- 02-04: Implement logout functionality
- 02-05: Add auth guard to protected pages

---

### Phase 03: Dashboard and Navigation
**Goal:** Both user roles see a personalized dashboard with summarized data (task counts, recent records) and can navigate to all features.

**Success Criteria:**
- [ ] Dashboard page displays task summary (total, pending, completed)
- [ ] Dashboard displays record summary (total records by type)
- [ ] Recent activity section shows last 5 tasks/records
- [ ] Navigation menu reflects user role (Admin sees all, Staff sees limited)
- [ ] Dashboard is responsive and uses Bootstrap components

**Plans:**
- 03-01: Design dashboard layout with Bootstrap grid
- 03-02: Implement task summary cards
- 03-03: Implement records summary section
- 03-04: Add recent activity feed
- 03-05: Implement role-based navigation menu

---

### Phase 04: Task Management Module
**Goal:** Users can create, edit, view, and update tasks; Staff can only edit their assigned tasks.

**Success Criteria:**
- [ ] Task list page displays all tasks in table format
- [ ] Tasks can be created via modal/form
- [ ] Tasks can be edited (title, description, status, assignee)
- [ ] Tasks can be filtered by status (Pending, In Progress, Completed)
- [ ] Tasks can be searched by title/description
- [ ] Staff users can only edit tasks assigned to them
- [ ] Task data persists in localStorage

**Plans:**
- 04-01: Create task list page with table view
- 04-02: Implement task creation form/modal
- 04-03: Implement task edit functionality
- 04-04: Add task status workflow (Pending → In Progress → Completed)
- 04-05: Add search and filter controls
- 04-06: Implement role-based task permissions
- 04-07: Wire up localStorage persistence for tasks

---

### Phase 05: Records Management Module
**Goal:** Users can encode, update, view, and search records in an organized format with role-based access.

**Success Criteria:**
- [ ] Records list page displays all records in table format
- [ ] Records can be created with required fields (name, type, details, date)
- [ ] Records can be edited and updated
- [ ] Records can be searched by any field
- [ ] Records can be filtered by type
- [ ] Admin can view/delete any record; Staff can only edit records they created
- [ ] Record data persists in localStorage

**Plans:**
- 05-01: Create records list page with table view
- 05-02: Implement record creation form
- 05-03: Implement record edit/view functionality
- 05-04: Add search and filter controls for records
- 05-05: Implement role-based record permissions
- 05-06: Wire up localStorage persistence for records

---

### Phase 06: Search, Filter, and Polish
**Goal:** Global search works across tasks and records; UI is polished and responsive; BRD acceptance criteria are met.

**Success Criteria:**
- [ ] Global search bar finds results across tasks and records
- [ ] All pages are responsive on mobile/tablet/desktop
- [ ] Form validation works (required fields, date formats)
- [ ] Error messages display clearly (invalid login, empty fields)
- [ ] All BRD §11 acceptance criteria verified:
  - [ ] Users can log in successfully
  - [ ] Dashboard displays summarized information clearly
  - [ ] Task management allows create, update, view
  - [ ] Records module allows encoding and display
  - [ ] System responds smoothly to user interactions
  - [ ] All pages load without errors
  - [ ] Interface is clear for non-technical users

**Plans:**
- 06-01: Implement global search functionality
- 06-02: Add form validation and error handling
- 06-03: Responsive design audit and fixes
- 06-04: Cross-browser testing (Chrome, Edge)
- 06-05: Verify all BRD acceptance criteria
- 06-06: Final UI polish and consistency pass

---

## Phase Dependencies

```
Phase 01 (Foundation)
  └── Phase 02 (Authentication)
        └── Phase 03 (Dashboard)
              ├── Phase 04 (Task Management)
              └── Phase 05 (Records Management)
                    └── Phase 06 (Search & Polish)
```

## Notes

- All data stored in `localStorage` or JSON files (no backend)
- No build tools — plain HTML/CSS/JS with Bootstrap CDN
- Run locally via Laragon or any static file server
- Each phase commits independently for clean history
