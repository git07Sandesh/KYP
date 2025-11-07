# Quick Start Guide

This guide will get you up and running with the Nepal Political Candidate Information Platform in under 10 minutes.

## Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **pnpm** - Will be installed via npm
- **PostgreSQL 14+** - Or use a managed service like [Supabase](https://supabase.com/) (free tier available)

## Step 1: Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

## Step 2: Clone and Navigate

```bash
cd neta-nepal
```

## Step 3: Install Dependencies

```bash
pnpm install
```

This will install dependencies for all apps and packages in the monorepo.

## Step 4: Set Up Database

### Option A: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create database
createdb neta_nepal

# Or using psql
psql -U postgres
CREATE DATABASE neta_nepal;
\q
```

### Option B: Supabase (Recommended for quick start)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → Database → Connection String
4. Copy the "URI" connection string

## Step 5: Configure Environment Variables

```bash
# Navigate to database package
cd packages/database

# Copy example env file
cp .env.example .env

# Edit .env and paste your database URL
# For local: DATABASE_URL="postgresql://postgres:password@localhost:5432/neta_nepal"
# For Supabase: DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

## Step 6: Run Database Migrations

```bash
# Still in packages/database directory
pnpm prisma migrate dev --name init
```

This will create all 20+ tables in your database.

## Step 7: Seed Database with Sample Data

```bash
pnpm prisma db seed
```

This will populate your database with:
- 2 admin users
- 7 provinces of Nepal
- 20 candidates
- Sample promises, works, cases, and more

**Admin Credentials:**
- Email: `admin@netanepal.org`
- Password: `admin123`

## Step 8: Configure Web App

```bash
# Navigate to web app
cd ../../apps/web

# Copy example env file
cp .env.example .env.local

# Edit .env.local
```

Add these required variables:

```env
DATABASE_URL="[same as packages/database/.env]"
NEXTAUTH_SECRET="any-random-32-character-string"
NEXTAUTH_URL="http://localhost:3000"
```

To generate a secure secret:
```bash
openssl rand -base64 32
```

## Step 9: Start Development Servers

From the **root directory** of the project:

```bash
cd ../..  # Back to neta-nepal root
pnpm dev
```

This will start:
- ✅ **Web app:** http://localhost:3000
- ✅ **Expo DevTools:** Will open in browser (for mobile app)

## Step 10: Access the Application

### Web Application
Open your browser to: http://localhost:3000

### Mobile Application
1. Install **Expo Go** app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Scan the QR code from Expo DevTools
3. App will load on your device

### Admin Panel
- URL: http://localhost:3000/admin (once implemented in Stage 4)
- Email: `admin@netanepal.org`
- Password: `admin123`

## What You Can Do Now

### Current (Stage 1 - Foundation):
✅ Database is set up and seeded
✅ Development environment is running
✅ You can explore the database using Prisma Studio:
```bash
cd packages/database
pnpm prisma studio
```
This opens a GUI at http://localhost:5555 to browse all data.

### Next Steps (Stages 2-6):
The foundation is complete! Now you can:
1. Build the Design System (Stage 2)
2. Implement API endpoints (Stage 3)
3. Create web pages (Stage 4)
4. Build mobile UI (Stage 5)
5. Polish and deploy (Stage 6)

See `DEVELOPMENT_ROADMAP.md` for detailed instructions on each stage.

## Useful Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm build            # Build all apps
pnpm lint             # Lint all packages
pnpm type-check       # Type check all packages

# Database (from packages/database)
pnpm prisma studio    # Open database GUI
pnpm prisma migrate dev   # Create new migration
pnpm prisma db seed   # Re-seed database
pnpm prisma generate  # Regenerate Prisma Client

# Clean
pnpm clean            # Remove build artifacts
rm -rf node_modules   # Clean install
pnpm install          # Reinstall
```

## Troubleshooting

### Port already in use
If port 3000 is occupied:
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

### Database connection fails
- Check your DATABASE_URL is correct
- Ensure PostgreSQL is running: `pg_isready`
- For Supabase, check your project is not paused

### Prisma errors
```bash
cd packages/database
pnpm prisma generate  # Regenerate client
```

### Build errors
```bash
# Clean and reinstall
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Next Steps

1. **Explore the data:** Use Prisma Studio to see all seeded candidates, parties, etc.
2. **Read the docs:** Check `DEVELOPMENT_ROADMAP.md` for implementation guidance
3. **Start building:** Begin with Stage 2 (Design System) or Stage 3 (Backend & API)

## Need Help?

- Check `README.md` for project overview
- See `DEVELOPMENT_ROADMAP.md` for detailed task breakdown
- Review `TECHNICAL_SPEC.md` for complete specifications

---

**Congratulations! Your development environment is ready.** 🎉

Now you can start building the full application by following the roadmap.
