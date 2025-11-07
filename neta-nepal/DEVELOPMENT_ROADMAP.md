# Development Roadmap - Nepal Political Candidate Information Platform

## ✅ STAGE 1: FOUNDATION (COMPLETED)

### What's Done:
- [x] Turborepo monorepo with pnpm workspaces configured
- [x] Next.js 16 web app (TypeScript, Tailwind CSS, App Router)
- [x] Expo mobile app with bottom tabs template
- [x] Complete Prisma database schema (20+ models)
- [x] Database client generated and tested
- [x] Comprehensive seed script with 20 candidates
- [x] Shared logic utilities (scoring, formatting)
- [x] Project README with setup instructions
- [x] Environment configuration templates

### Seed Data Included:
- 2 admin users with credentials
- 7 provinces, 4 districts, 4 constituencies
- 5 political parties
- 20 candidates (3 detailed, 17 basic)
- Sample promises, works, cases, rankings, sources

### Login Credentials:
- Admin: `admin@netanepal.org` / `admin123`
- Moderator: `moderator@netanepal.org` / `moderator123`

---

## 🚧 STAGE 2: DESIGN SYSTEM (TO DO)

### Web (shadcn/ui)
1. Install shadcn/ui in apps/web
   ```bash
   cd apps/web
   npx shadcn-ui@latest init
   ```

2. Install core components:
   ```bash
   npx shadcn-ui@latest add button input card badge dropdown-menu tabs dialog table select checkbox slider avatar separator skeleton
   ```

3. Create custom Tailwind theme in `apps/web/app/globals.css`:
   - Neutral color palette (grays, blues)
   - Status colors (green=verified, yellow=allegation, red=criminal)
   - Typography scale
   - Spacing utilities

### Mobile (NativeWind)
1. Configure NativeWind in apps/mobile:
   ```bash
   cd apps/mobile
   npm install nativewind
   npm install --save-dev tailwindcss
   ```

2. Create tailwind.config.js for mobile
3. Update babel.config.js to include NativeWind

### UI Components to Build (in packages/ui-components)

Priority components:
1. **CandidateCard** - Grid and list variants
2. **ScoreBadge** - Visual score indicators
3. **FilterBar** - Multi-select filters
4. **PromiseCard** - Promise display with status
5. **WorkCard** - Achievement display
6. **CaseCard** - Legal case display with severity
7. **RumorCard** - Rumor with disclaimer
8. **ComparisonTable** - Side-by-side metrics
9. **SearchBar** - Auto-suggest search
10. **SourceBadge** - Source reliability tier

---

## 🔌 STAGE 3: BACKEND & API (TO DO)

### 1. Authentication (NextAuth.js v5)

**File:** `apps/web/app/api/auth/[...nextauth]/route.ts`

Install dependencies:
```bash
cd apps/web
pnpm add next-auth@latest @auth/prisma-adapter bcryptjs
pnpm add -D @types/bcryptjs
```

Implement:
- Credentials provider with email/password
- JWT session strategy
- Role-based authorization callbacks
- Middleware for protected routes

**File:** `apps/web/middleware.ts`
- Protect /admin/* routes (ADMIN, SUPER_ADMIN only)
- Protect /profile/* routes (logged in users)

### 2. Public API Endpoints

Create in `apps/web/app/api/`:

#### Candidates
- `GET /api/candidates` - List with filters (party, level, constituency, sort, pagination)
- `GET /api/candidates/[id]` - Single candidate with all relations
- `GET /api/candidates/[id]/promises` - Candidate promises
- `GET /api/candidates/[id]/works` - Candidate works
- `GET /api/candidates/[id]/cases` - Candidate cases
- `GET /api/candidates/[id]/rumors` - Candidate rumors
- `GET /api/candidates/[id]/sources` - All sources for candidate

#### Search & Discovery
- `GET /api/search` - Full-text search (PostgreSQL ts_vector)
- `POST /api/compare` - Compare up to 3 candidates
- `GET /api/rankings` - Rankings by category

#### Metadata
- `GET /api/parties` - All political parties
- `GET /api/provinces` - All provinces
- `GET /api/constituencies` - Filtered constituencies

### 3. Admin API Endpoints

Create in `apps/web/app/api/admin/`:

#### CRUD Operations
- `POST/PATCH/DELETE /api/admin/candidates` - Manage candidates
- `POST/PATCH/DELETE /api/admin/promises` - Manage promises
- `POST/PATCH/DELETE /api/admin/works` - Manage works
- `POST/PATCH/DELETE /api/admin/cases` - Manage cases
- `POST/PATCH/DELETE /api/admin/rumors` - Manage rumors
- `POST/PATCH/DELETE /api/admin/sources` - Manage sources

#### Moderation & Governance
- `GET /api/admin/moderation/queue` - Pending items
- `POST /api/admin/moderation/[id]/approve` - Approve item
- `POST /api/admin/moderation/[id]/reject` - Reject item
- `GET /api/admin/audit-log` - View audit trail
- `PATCH /api/admin/users/[id]/role` - Manage user roles

### 4. Request Validation (Zod)

Install:
```bash
cd apps/web
pnpm add zod
```

Create schemas in `apps/web/lib/validations/`:
- candidateSchema.ts
- promiseSchema.ts
- workSchema.ts
- caseSchema.ts
- etc.

### 5. API Client Layer (in packages/shared-logic)

Install TanStack Query:
```bash
cd packages/shared-logic
pnpm add @tanstack/react-query
```

Create hooks in `packages/shared-logic/src/hooks/`:
- useCandidates.ts
- useCandidate.ts
- usePromises.ts
- useWorks.ts
- useCases.ts
- useSearch.ts
- useRankings.ts
- useCompare.ts

---

## 🌐 STAGE 4: WEB APPLICATION (TO DO)

### Public Pages (apps/web/app/(public)/)

1. **Home Page** (`/`)
   - Hero section with search
   - Quick filters (Federal/Provincial/Local)
   - Featured sections (Top Performers, Most Controversial)
   - CTA: "Browse All Candidates"

2. **Candidates Directory** (`/candidates`)
   - Filter sidebar (sticky): level, party, constituency, age, scores
   - Sort bar: name, impact, fulfillment, scandal
   - Grid/List toggle
   - Pagination (20 per page)

3. **Candidate Profile** (`/candidates/[id]`)
   - Sticky header with back/share buttons
   - 6 Tabs:
     - **Overview:** Identity, posts timeline, key scores
     - **Report Card:** Summary metrics, trend graphs
     - **Works:** Filterable works list with details
     - **Promises:** Filterable promises with status
     - **Cases:** Legal cases with severity indicators
     - **Sources:** All sources with reliability tiers
   - **Rumors Tab:** Big disclaimer banner, auto-expiry countdown

4. **Compare Screen** (`/compare`)
   - Candidate selector (max 3)
   - Side-by-side comparison table
   - Visual charts (radar, bar, timeline)

5. **Rankings** (`/rankings`)
   - Tab selector: Impact, Fulfillment, Cleanliness, Experience, Popular
   - Filters: level, party
   - Leaderboard (top 50)

6. **Search** (`/search`)
   - Auto-focus search bar
   - Category tabs: Candidates, Parties, Constituencies
   - Auto-suggest dropdown
   - Results list

7. **More Menu** (`/more`)
   - About, Editorial Policy, FAQ, Feedback Form, Terms & Privacy

### Admin Pages (apps/web/app/(admin)/admin/)

**Protected by middleware** (ADMIN, SUPER_ADMIN only)

1. **Dashboard** (`/admin`)
   - Stat cards: total candidates, pending moderation, alerts
   - Recent activity feed
   - Action shortcuts

2. **Candidate Management** (`/admin/candidates`)
   - Table view with search/filters
   - Add/Edit/Archive buttons
   - Candidate editor with tabs:
     - Identity, Party History, Posts, Works, Promises, Cases, Rumors, Sources
   - Preview button
   - Save as Draft / Publish buttons

3. **Moderation Queue** (`/admin/moderation`)
   - Filter by status and entity type
   - List view with View Diff, Approve, Reject actions
   - Side-by-side diff modal

4. **Audit Log** (`/admin/audit`)
   - Filterable table: user, action, entity type, date range
   - Expandable JSON changes view
   - Revert button (if allowed)

---

## 📱 STAGE 5: MOBILE APPLICATION (TO DO)

### Bottom Tab Navigation (apps/mobile/app/(tabs)/)

Rename and adapt tabs:
1. **Home** (`/`) - Same as web home
2. **Search** (`/search`) - Fullscreen search
3. **Compare** (`/compare`) - Mobile-optimized
4. **Rankings** (`/rankings`) - Scrollable leaderboard
5. **More** (`/more`) - Menu with links

### Adapt Pages for Mobile

Key optimizations:
- Vertical stacking (no columns)
- Swipeable tabs (use `react-native-tab-view`)
- Bottom sheet for filters
- Full-width cards
- Touch-friendly buttons (min 44px)
- Pull-to-refresh
- Infinite scroll

### Mobile-Specific Features
- Native share sheet for profiles
- Offline mode (TanStack Query cache)
- Push notifications (Expo Notifications)

---

## 🎯 STAGE 6: POLISH & OPTIMIZATION (TO DO)

### UI/UX Polish

For every component:
- [ ] Loading states (skeletons)
- [ ] Empty states with helpful messages
- [ ] Error states with recovery actions
- [ ] Success notifications (toasts)
- [ ] Form validation with clear errors

### Responsive Design

Test on:
- [ ] Mobile (375px - iPhone SE)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1280px, 1920px)

### Performance

- [ ] Image optimization (Next.js Image component)
- [ ] Lazy loading off-screen content
- [ ] Debounce search (300ms)
- [ ] Code splitting for admin panel
- [ ] Memoize expensive computations

### Accessibility

- [ ] Alt text for all images
- [ ] Form labels
- [ ] Color contrast WCAG AA
- [ ] Keyboard navigation
- [ ] Screen reader support

### Deployment

**Web (Vercel):**
1. Connect GitHub repo
2. Set root directory to `apps/web`
3. Configure build command: `cd ../.. && pnpm turbo run build --filter=web`
4. Add environment variables
5. Deploy

**Mobile (EAS):**
1. Install EAS CLI: `npm install -g eas-cli`
2. Configure: `cd apps/mobile && eas build:configure`
3. Build: `eas build --platform android` / `eas build --platform ios`
4. Submit: `eas submit`

---

## 📦 Useful Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm build            # Build all apps
pnpm lint             # Lint all packages
pnpm type-check       # Type check

# Database
cd packages/database
pnpm prisma studio    # Database GUI
pnpm prisma migrate dev   # Create migration
pnpm prisma db seed   # Seed data
pnpm prisma generate  # Regenerate client

# Clean
pnpm clean            # Remove build artifacts
```

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Expo Docs](https://docs.expo.dev/)
- [Prisma Docs](https://www.prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Turborepo Docs](https://turbo.build/repo/docs)

---

## 🎯 MVP Success Criteria

The MVP is successful when:

1. ✅ Citizens can browse, filter, search candidates
2. ✅ Candidate profiles show all data (promises, works, cases)
3. ✅ Users can compare up to 3 candidates side-by-side
4. ✅ Rankings display for all categories
5. ✅ Admin can log in, add candidates, attach sources, publish
6. ✅ All data is properly verified (sources attached, tiers shown)
7. ✅ UI is beautiful, professional, mobile-responsive
8. ✅ Codebase is clean, type-safe, production-ready
9. ✅ App deploys to Vercel (web) and EAS (mobile) without errors

---

**Current Status:** Stage 1 Complete ✅  
**Next Task:** Begin Stage 2 (Design System) or Stage 3 (Backend & API)  
**Estimated Time to MVP:** 8-12 days of focused development

This roadmap should be followed sequentially for best results.
