# 🧪 MVP Testing Checklist

Use this checklist to systematically test all implemented features.

## 🔐 Pre-Testing Setup

- [ ] Development server is running (`cd apps/web && pnpm run dev`)
- [ ] PostgreSQL service is running
- [ ] Database has seed data (`pnpm --filter @repo/database db:seed`)
- [ ] Browser is open at http://localhost:3000

## 📱 Navigation Testing

### Desktop Navigation
- [ ] Logo links to home page
- [ ] "Home" link works
- [ ] "Candidates" link works
- [ ] "Compare" link works
- [ ] "Rankings" link works
- [ ] "More" link works
- [ ] Navigation stays sticky on scroll
- [ ] Backdrop blur effect visible

### Mobile Navigation (resize browser to <768px)
- [ ] Bottom tab bar appears
- [ ] Home tab (house icon) works
- [ ] Candidates tab (users icon) works
- [ ] Compare tab (git compare icon) works
- [ ] Rankings tab (trophy icon) works
- [ ] More tab (menu icon) works
- [ ] Active tab is highlighted
- [ ] Navigation is fixed to bottom

## 🏠 Public Pages Testing

### Home Page (/)
- [ ] Page loads without errors
- [ ] Featured candidates display (if implemented)
- [ ] Content is readable and styled
- [ ] No console errors

### Candidates Directory (/candidates)
- [ ] Page loads with candidate list
- [ ] At least 20 candidates visible
- [ ] Candidate cards show photos
- [ ] Party names display
- [ ] Constituency names display
- [ ] Clicking a card navigates to profile
- [ ] No console errors

### Candidate Profile (/candidates/[id])
- [ ] Profile page loads
- [ ] All 6 tabs visible (Overview, Promises, Works, Cases, Rumors, Sources)
- [ ] Overview tab shows basic info
- [ ] Promises tab displays promises
- [ ] Works tab shows accomplishments
- [ ] Cases tab lists legal cases
- [ ] Rumors tab shows rumors
- [ ] Sources tab displays sources
- [ ] Switching tabs works smoothly
- [ ] Scores display (Impact, Scandal, Fulfillment)
- [ ] No console errors

### Search Page (/search)
- [ ] Search input field visible
- [ ] Can type in search box
- [ ] Search triggers after 300ms delay
- [ ] Results appear below search
- [ ] Category tabs visible (Candidates, Parties, Constituencies)
- [ ] Switching tabs filters results
- [ ] Clicking a result navigates correctly
- [ ] Empty state shows when no results
- [ ] No console errors

### Compare Page (/compare)
- [ ] Page loads with empty state
- [ ] "Add candidates" section visible
- [ ] Can search for candidates
- [ ] Can add a candidate (1st)
- [ ] Can add a second candidate
- [ ] Can add a third candidate
- [ ] Cannot add 4th candidate (max 3)
- [ ] Comparison table displays
- [ ] Table shows:
  - [ ] Party names
  - [ ] Constituencies
  - [ ] Ages
  - [ ] Years in politics
  - [ ] Impact scores
  - [ ] Scandal scores
  - [ ] Fulfillment rates
  - [ ] Promise counts
  - [ ] Work counts
  - [ ] Case counts
- [ ] Can remove a candidate
- [ ] Table updates after removal
- [ ] No console errors

### Rankings Page (/rankings)
- [ ] Page loads with default category
- [ ] 4 category tabs visible:
  - [ ] Top Impact
  - [ ] Cleanest Records
  - [ ] Highest Fulfillment
  - [ ] Most Popular
- [ ] Can switch between categories
- [ ] Rankings display for each category
- [ ] Top 3 have special styling (gold/silver/bronze)
- [ ] Candidate names visible
- [ ] Scores display
- [ ] Rank numbers show
- [ ] Photos display
- [ ] Party names show
- [ ] No console errors

### More Page (/more)
- [ ] Page loads successfully
- [ ] 6 links visible:
  - [ ] About Us
  - [ ] Editorial Policy
  - [ ] FAQ
  - [ ] Feedback
  - [ ] Terms of Service
  - [ ] Privacy Policy
- [ ] Contact information displays
- [ ] Card layout is clean
- [ ] Icons render correctly
- [ ] No console errors

## 🔒 Authentication Testing

### Login Page (/login)
- [ ] Login form displays
- [ ] Email input field works
- [ ] Password input field works
- [ ] Password is masked
- [ ] Can see demo credentials
- [ ] Submit button visible
- [ ] "Back to Home" link works

### Login with Admin Credentials
- [ ] Enter: admin@netanepal.org
- [ ] Enter: admin123
- [ ] Click "Sign In"
- [ ] No error messages appear
- [ ] Redirects to /admin dashboard
- [ ] Session is created
- [ ] Can access admin pages
- [ ] No console errors

### Login with Invalid Credentials
- [ ] Enter: wrong@email.com
- [ ] Enter: wrongpassword
- [ ] Click "Sign In"
- [ ] Error message appears
- [ ] Stays on login page
- [ ] Can retry login
- [ ] No console errors

### Protected Routes (when not logged in)
- [ ] Visit /admin directly
- [ ] Should redirect to /login
- [ ] Same for /admin/candidates
- [ ] Same for /admin/promises
- [ ] Same for all admin routes

## 👨‍💼 Admin Panel Testing

### Admin Layout
- [ ] Sidebar visible on left
- [ ] Logo at top
- [ ] 7 navigation items visible:
  - [ ] Dashboard
  - [ ] Candidates
  - [ ] Promises
  - [ ] Works
  - [ ] Cases
  - [ ] Moderation Queue
  - [ ] Audit Log
- [ ] User info displays at bottom
- [ ] Role badge shows (ADMIN)
- [ ] Active route is highlighted
- [ ] Clicking nav items works
- [ ] No console errors

### Admin Dashboard (/admin)
- [ ] Page loads after login
- [ ] 4 statistics cards display:
  - [ ] Total Candidates (with published/draft counts)
  - [ ] Total Promises
  - [ ] Total Works
  - [ ] Total Legal Cases
- [ ] Numbers match database
- [ ] Cards are clickable
- [ ] Quick actions section visible:
  - [ ] Add Candidate button
  - [ ] Add Promise button
  - [ ] Add Work button
- [ ] Recent activity feed displays
- [ ] Activity shows user actions
- [ ] Timestamps are recent
- [ ] "View all activity" link works
- [ ] No console errors

### Candidates Management (/admin/candidates)
- [ ] Page loads successfully
- [ ] "Add Candidate" button visible
- [ ] Table displays with columns:
  - [ ] Candidate (with avatar)
  - [ ] Party
  - [ ] Constituency
  - [ ] Status
  - [ ] Last Updated
  - [ ] Actions
- [ ] At least 20 candidates listed
- [ ] Avatars load or show fallbacks
- [ ] Status badges color-coded:
  - [ ] PUBLISHED (green)
  - [ ] DRAFT (gray)
  - [ ] PENDING_REVIEW (yellow)
  - [ ] ARCHIVED (red)
- [ ] Eye icon (view) works
- [ ] Edit icon button displays
- [ ] Hover effect on rows works
- [ ] Empty state shows if no candidates
- [ ] No console errors

### Promises Management (/admin/promises)
- [ ] Page loads successfully
- [ ] "Add Promise" button visible
- [ ] Table displays with columns:
  - [ ] Promise (text)
  - [ ] Candidate
  - [ ] Date
  - [ ] Status
  - [ ] Sources
  - [ ] Actions
- [ ] Promises listed (if seeded)
- [ ] Promise text visible
- [ ] Category and type show
- [ ] Candidate names display
- [ ] Status badges color-coded:
  - [ ] KEPT (green)
  - [ ] IN_PROGRESS (blue)
  - [ ] BROKEN (red)
  - [ ] PARTIALLY_FULFILLED (yellow)
  - [ ] NO_EVIDENCE (gray)
- [ ] Source count displays
- [ ] View/Edit buttons work
- [ ] Empty state shows if no promises
- [ ] No console errors

### Works Management (/admin/works)
- [ ] Page loads successfully
- [ ] "Add Work" button visible
- [ ] Table displays with columns:
  - [ ] Work (title & description)
  - [ ] Candidate
  - [ ] Period (start/end dates)
  - [ ] Impact
  - [ ] Sources
  - [ ] Actions
- [ ] Works listed (if seeded)
- [ ] Titles display
- [ ] Descriptions truncated nicely
- [ ] Candidate names show with party
- [ ] Date ranges display
- [ ] Impact badges color-coded:
  - [ ] HIGH (green)
  - [ ] MEDIUM (blue)
  - [ ] LOW (gray)
- [ ] Source counts display
- [ ] View/Edit buttons work
- [ ] Empty state shows if no works
- [ ] No console errors

### Cases Management (/admin/cases)
- [ ] Page loads successfully
- [ ] "Add Case" button visible
- [ ] Table displays with columns:
  - [ ] Allegation
  - [ ] Candidate
  - [ ] Case #
  - [ ] Severity (1-5 with icon)
  - [ ] Status
  - [ ] Filed Date
  - [ ] Actions
- [ ] Cases listed (if seeded)
- [ ] Allegations truncated
- [ ] Court names show
- [ ] Candidate names with party
- [ ] Severity icons color-coded:
  - [ ] 4-5 (red)
  - [ ] 3 (orange)
  - [ ] 1-2 (yellow)
- [ ] Status badges color-coded:
  - [ ] ACQUITTED (green)
  - [ ] CONVICTED (red)
  - [ ] TRIAL/HEARING (yellow)
  - [ ] UNDER_INVESTIGATION (blue)
  - [ ] FILED (orange)
- [ ] View/Edit buttons work
- [ ] Empty state shows if no cases
- [ ] No console errors

### Moderation Queue (/admin/moderation)
- [ ] Page loads successfully
- [ ] Pending count badge displays
- [ ] Table displays with columns:
  - [ ] Type (entity type)
  - [ ] Submitted By
  - [ ] Submitted (date/time)
  - [ ] Status
  - [ ] Reviewed By
  - [ ] Actions
- [ ] Items listed (if any pending)
- [ ] Entity types display (CANDIDATE, PROMISE, etc.)
- [ ] Submission dates show
- [ ] Status badges color-coded:
  - [ ] PENDING (yellow)
  - [ ] APPROVED (green)
  - [ ] REJECTED (red)
  - [ ] REQUIRES_CHANGES (orange)
- [ ] Approve/Reject buttons show for PENDING
- [ ] "View Details" button displays
- [ ] Empty state with clock icon shows if empty
- [ ] No console errors

### Audit Log (/admin/audit-log)
- [ ] Page loads successfully
- [ ] Statistics cards display:
  - [ ] Total Actions count
  - [ ] Active Users count
  - [ ] Entity Types count
- [ ] Numbers are accurate
- [ ] Table displays with columns:
  - [ ] Timestamp
  - [ ] User (name/email + role)
  - [ ] Action
  - [ ] Entity (type + ID preview)
  - [ ] Details
- [ ] Recent logs listed (up to 100)
- [ ] Timestamps show correctly
- [ ] User names/emails display
- [ ] User roles show (ADMIN, MODERATOR, etc.)
- [ ] Action badges color-coded:
  - [ ] CREATE (green)
  - [ ] UPDATE (blue)
  - [ ] DELETE (red)
  - [ ] APPROVE/PUBLISH (purple)
- [ ] Entity types show (CANDIDATE, PROMISE, etc.)
- [ ] Entity IDs truncated (first 8 chars)
- [ ] "View changes" expands JSON
- [ ] Related candidates link (if applicable)
- [ ] Empty state shows if no logs
- [ ] No console errors

## 🔌 API Testing

### Search API
- [ ] Open DevTools Network tab
- [ ] Go to /search page
- [ ] Type "test" in search box
- [ ] Verify GET request to /api/search?query=test
- [ ] Response status: 200
- [ ] Response has candidates array
- [ ] No API errors

### Compare API
- [ ] Go to /compare page
- [ ] Add 2-3 candidates
- [ ] Open DevTools Network tab
- [ ] Verify POST to /api/compare
- [ ] Request body has candidateIds array
- [ ] Response status: 200
- [ ] Response has comparison data
- [ ] No API errors

### Rankings API
- [ ] Go to /rankings page
- [ ] Switch between categories
- [ ] Open DevTools Network tab
- [ ] Verify GET requests to /api/rankings?category=...
- [ ] Response status: 200
- [ ] Response has candidates array with scores
- [ ] No API errors

### Admin APIs (protected)
- [ ] Try accessing /api/admin/candidates without login
- [ ] Should return 401 Unauthorized
- [ ] Login as admin
- [ ] Try again - should return 200
- [ ] Verify auth protection works

## 🎨 UI/UX Testing

### Visual Consistency
- [ ] All buttons styled consistently
- [ ] All cards have same border radius
- [ ] Badge colors are consistent across pages
- [ ] Font sizes are appropriate
- [ ] Spacing is consistent
- [ ] Icons align properly
- [ ] Tables are readable

### Responsive Design
- [ ] Test at 1920px width (desktop)
- [ ] Test at 1366px width (laptop)
- [ ] Test at 768px width (tablet)
- [ ] Test at 375px width (mobile)
- [ ] All pages adapt correctly
- [ ] No horizontal scrolling
- [ ] Text is readable at all sizes
- [ ] Buttons are tappable on mobile

### Loading States
- [ ] Observe page loads
- [ ] Check for loading indicators
- [ ] Verify smooth transitions
- [ ] No layout shifts

### Error States
- [ ] Test with no internet (if applicable)
- [ ] Test invalid routes (404)
- [ ] Test empty data states
- [ ] Error messages are helpful

## 🐛 Bug Tracking

### Issues Found

| # | Page | Issue | Severity | Status |
|---|------|-------|----------|--------|
| 1 |      |       |          |        |
| 2 |      |       |          |        |
| 3 |      |       |          |        |

### Notes

```
Add any observations, suggestions, or concerns here:




```

## ✅ Sign-Off

- [ ] All critical features tested
- [ ] No blocking bugs found
- [ ] Ready for next phase (CRUD forms)

**Tester**: ___________________

**Date**: ___________________

**Signature**: ___________________

---

**Testing Time Estimate**: 45-60 minutes

**Priority**: Test in order - navigation, public pages, auth, then admin

**Tools Needed**: Browser DevTools, Multiple viewport sizes
