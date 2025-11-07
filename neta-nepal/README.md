# Nepal Political Candidate Information Platform (Neta Nepal)

A non-partisan, fact-based political transparency platform for Nepal that allows citizens to browse political candidates, view verified track records, compare politicians, and make informed voting decisions.

## 🏗️ Project Structure

This is a Turborepo monorepo containing:

```
neta-nepal/
├── apps/
│   ├── web/          # Next.js 16 web application (TypeScript, Tailwind, App Router)
│   └── mobile/       # Expo mobile application (React Native, NativeWind)
├── packages/
│   ├── database/     # Prisma schema and database client
│   ├── shared-logic/ # Shared business logic, state management, API clients
│   ├── ui-components/# Shared UI components for web and mobile
│   └── config/       # Shared configuration (ESLint, TypeScript, Tailwind)
└── turbo.json        # Turborepo configuration
```

## 🚀 Tech Stack

- **Monorepo:** Turborepo + pnpm workspaces
- **Web:** Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Mobile:** Expo (React Native), NativeWind
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth.js v5
- **State Management:** Zustand + TanStack Query
- **Deployment:** Vercel (web) + EAS (mobile)

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 8+
- PostgreSQL 14+ (or use a managed service like Supabase/Neon)

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd neta-nepal
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up the database

Create a PostgreSQL database and copy the environment variables:

```bash
# In packages/database directory
cp .env.example .env
```

Edit `.env` and add your database connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/neta_nepal"
```

### 4. Run database migrations

```bash
cd packages/database
pnpm prisma migrate dev --name init
```

### 5. Generate Prisma Client

```bash
pnpm prisma generate
```

### 6. Seed the database with sample data

```bash
pnpm prisma db seed
```

This will create:
- 2 admin/moderator users
- 7 provinces of Nepal
- 4 districts
- 4 constituencies
- 5 political parties
- 20 candidates with varying levels of detail
- Sample promises, works, cases, and sources
- Rankings

**Login Credentials:**
- Admin: `admin@netanepal.org` / `admin123`
- Moderator: `moderator@netanepal.org` / `moderator123`

### 7. Configure web app environment

```bash
# In apps/web directory
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/neta_nepal"
NEXTAUTH_SECRET="your-random-32-character-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 8. Start development servers

From the root directory:

```bash
pnpm dev
```

This will start:
- **Web app:** http://localhost:3000
- **Mobile app:** Expo DevTools will open (scan QR code with Expo Go app)

## 📂 Database Schema

The database includes 20+ models:

**Core Entities:**
- User, Province, District, Constituency, Party, Candidate, CandidatePost

**Content Entities:**
- Promise, Work, Case, Rumor

**Sources & Verification:**
- Source, PromiseSource, WorkSource, CaseSource

**Features:**
- Comparison, Ranking

**Moderation & Governance:**
- ModerationQueue, CorrectionRequest, AuditLog

See `packages/database/prisma/schema.prisma` for complete schema.

## 🎯 Current Status

### ✅ Completed (Stage 1: Foundation)

- [x] Turborepo monorepo with pnpm workspaces
- [x] Next.js 16 web app (TypeScript, Tailwind, App Router)
- [x] Expo mobile app with tabs template
- [x] Complete Prisma schema with 20+ models
- [x] Database packages with Prisma client
- [x] Comprehensive seed script with 20 candidates
- [x] Shared packages structure (shared-logic, ui-components, database, config)

### 🚧 In Progress / To Do

**Stage 2: Design System**
- [ ] Install and configure shadcn/ui for web
- [ ] Create Tailwind theme with neutral colors
- [ ] Build 10+ core UI components
- [ ] Configure NativeWind for mobile

**Stage 3: Backend & API**
- [ ] Set up NextAuth.js authentication
- [ ] Build all public API endpoints (30+)
- [ ] Build all admin API endpoints
- [ ] Create API client layer with TanStack Query
- [ ] Implement request validation with Zod

**Stage 4: Web Application**
- [ ] Build public pages (Home, Candidates Directory, Profile, Compare, Rankings, Search)
- [ ] Implement 7-tab candidate profile
- [ ] Build admin pages (Dashboard, Management, Moderation, Audit Log)

**Stage 5: Mobile Application**
- [ ] Adapt all pages for mobile
- [ ] Implement bottom tab navigation
- [ ] Add mobile-specific features

**Stage 6: Polish & Deployment**
- [ ] Add loading/empty/error states
- [ ] Responsive design testing
- [ ] Production build testing
- [ ] Deploy to Vercel (web) and EAS (mobile)

## 🔧 Useful Commands

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm build            # Build all apps for production
pnpm lint             # Lint all packages
pnpm type-check       # Type check all packages

# Database commands (from packages/database)
pnpm prisma studio    # Open Prisma Studio (database GUI)
pnpm prisma migrate dev   # Create and apply a new migration
pnpm prisma db seed   # Seed the database
pnpm prisma generate  # Regenerate Prisma Client

# Clean
pnpm clean            # Remove all build artifacts and node_modules
```

## 📖 Documentation

- [TECHNICAL_SPEC.md](../TECHNICAL_SPEC.md) - Complete technical blueprint
- [INFORMATION ARCHITECTURE.docx](../INFORMATION%20ARCHITECTURE.docx) - UX and feature specification
- [WireFrame.docx](../WireFrame.docx) - UI layout blueprint
- [App Constitution.docx](../App%20Constitution.docx) - Editorial and governance rules
- [DATA COVERAGE MAP FOR NEPAL.docx](../DATA%20COVERAGE%20MAP%20FOR%20NEPAL.docx) - Data sourcing guide

## 🤝 Contributing

This is an MVP baseline. Contributions are welcome for:
- Completing remaining stages (2-6)
- Adding more candidate data
- Improving UI/UX
- Adding tests
- Documentation improvements

## 📝 License

[Add your license here]

## 🙏 Credits

Built with ❤️ for democratic transparency in Nepal.

---

**Note:** This is currently in Stage 1 (Foundation) of development. The monorepo structure, database schema, and basic scaffolding are complete. Stages 2-6 (Design System, Backend/API, Web App, Mobile App, Polish) are pending implementation.
