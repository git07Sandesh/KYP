# Technical Specification Document

## Nepal Political Candidate Information Platform

**Version:** 1.0
**Date:** November 6, 2025
**Purpose:** Complete technical blueprint for AI agent to build MVP baseline app

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Monorepo Architecture](#monorepo-architecture)
4. [Database Schema](#database-schema)
5. [API Design](#api-design)
6. [Authentication &amp; Authorization](#authentication--authorization)
7. [Design System](#design-system)
8. [Builder.io Integration](#builderio-integration)
9. [Development Workflow](#development-workflow)
10. [Deployment Strategy](#deployment-strategy)
11. [MVP Scope &amp; Features](#mvp-scope--features)
12. [Phase 2 Features](#phase-2-features)

---

## 1. Project Overview

### Mission

Build a **non-partisan, fact-based political transparency platform** for Nepal that allows citizens to browse candidates, view verified track records, compare politicians, and make informed voting decisions.

### Core Principles

- **Neutrality**: No endorsements or political bias
- **Transparency**: All data sources visible and verifiable
- **Verifiability**: Multi-source verification required
- **Accessibility**: Free and open to all citizens

### Target Users

- **Public Users**: Citizens researching candidates
- **Registered Users**: Can submit corrections/feedback
- **Moderators**: Review and approve content submissions
- **Admins**: Full system access and data management

---

## 2. Technology Stack

### 🎯 Core Stack (Final Decision)

#### **Monorepo Management**

- **Turborepo** - Fast, scalable monorepo build system
- Alternative considered: Nx

#### **Web Application**

- **Next.js 14** (App Router) - React framework for web
- **TypeScript** - Type safety
- **React 18** - UI library

#### **Mobile Application**

- **Expo** (SDK 50+) - React Native framework
- **Expo Router** - File-based routing for mobile
- **React Native** - Cross-platform mobile development

#### **Shared Code**

- **packages/shared-logic** - Business logic, state, API clients
- **packages/ui-components** - Shared UI components (web + mobile compatible)
- **packages/database** - Prisma schema and types
- **packages/config** - Shared configuration (ESLint, TypeScript, Tailwind)

#### **Backend & Database**

- **Next.js API Routes** - Backend API (in apps/web/app/api/)
- **Prisma** - ORM (Object-Relational Mapping)
- **PostgreSQL** - Primary database (Firebase)
- **Redis** - Caching layer (Upstash Redis)

#### **Authentication**

- **NextAuth.js v5** (Auth.js) - Authentication for web
- **Expo AuthSession** - Authentication for mobile (OAuth flow)
- **JWT** - Token-based auth

#### **State Management**

- **Zustand** - Lightweight state management (shared between web/mobile)
- **TanStack Query (React Query)** - Server state management, caching

#### **Styling**

- **Tailwind CSS** - Utility-first CSS (web)
- **NativeWind** - Tailwind for React Native (mobile)
- **shadcn/ui** - Component library (web, will adapt for mobile)

#### **File Storage**

- **Cloudinary** - Image uploads, optimization, CDN
- **Vercel Blob** (optional) - Document storage (PDFs, archives)

#### **Search**

- **PostgreSQL Full-Text Search** (MVP)
- **MeiliSearch** (Phase 2) - Fast, typo-tolerant search

#### **Visual Builder**

- **Builder.io** - Drag-and-drop interface for web & mobile screens
- Connects to existing codebase
- Supports React (Next.js) and React Native (Expo)

#### **Analytics & Monitoring**

- **Plausible Analytics** - Privacy-friendly analytics (optional)
- **Sentry** - Error tracking
- **Vercel Analytics** - Performance monitoring (web)

#### **DevOps & Hosting**

- **Vercel** - Web app hosting (Next.js)
- **Expo Application Services (EAS)** - Mobile app builds and updates
- **GitHub Actions** - CI/CD pipeline
- **Supabase** or **Neon** - Managed PostgreSQL hosting
- **Upstash** - Serverless Redis hosting

---

## 3. Monorepo Architecture

### 📁 Project Structure

```
neta-nepal/
├── apps/
│   ├── web/                          # Next.js web application
│   │   ├── app/                      # Next.js 14 App Router
│   │   │   ├── (public)/            # Public routes
│   │   │   │   ├── page.tsx         # Home page
│   │   │   │   ├── candidates/
│   │   │   │   │   ├── page.tsx     # Candidates list
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx # Candidate profile
│   │   │   │   ├── compare/
│   │   │   │   │   └── page.tsx     # Compare screen
│   │   │   │   ├── rankings/
│   │   │   │   │   └── page.tsx     # Rankings screen
│   │   │   │   └── search/
│   │   │   │       └── page.tsx     # Search screen
│   │   │   ├── (admin)/             # Admin routes (protected)
│   │   │   │   └── admin/
│   │   │   │       ├── layout.tsx   # Admin layout
│   │   │   │       ├── page.tsx     # Dashboard
│   │   │   │       ├── candidates/
│   │   │   │       ├── promises/
│   │   │   │       ├── works/
│   │   │   │       ├── cases/
│   │   │   │       └── moderation/
│   │   │   ├── api/                 # API routes
│   │   │   │   ├── auth/[...nextauth]/
│   │   │   │   ├── candidates/
│   │   │   │   ├── promises/
│   │   │   │   ├── works/
│   │   │   │   ├── cases/
│   │   │   │   ├── rumors/
│   │   │   │   ├── search/
│   │   │   │   ├── rankings/
│   │   │   │   └── moderation/
│   │   │   └── layout.tsx           # Root layout
│   │   ├── components/              # Web-specific components
│   │   ├── lib/                     # Web utilities
│   │   ├── public/                  # Static assets
│   │   ├── styles/                  # Global styles
│   │   ├── middleware.ts            # Auth middleware
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── mobile/                       # Expo mobile application
│       ├── app/                      # Expo Router file-based routing
│       │   ├── (tabs)/              # Bottom tab navigation
│       │   │   ├── index.tsx        # Home tab
│       │   │   ├── search.tsx       # Search tab
│       │   │   ├── compare.tsx      # Compare tab
│       │   │   ├── rankings.tsx     # Rankings tab
│       │   │   └── more.tsx         # More menu tab
│       │   ├── candidate/
│       │   │   └── [id].tsx         # Candidate profile
│       │   ├── (auth)/              # Auth screens
│       │   │   ├── login.tsx
│       │   │   └── register.tsx
│       │   └── _layout.tsx          # Root layout
│       ├── components/              # Mobile-specific components
│       ├── assets/                  # Images, fonts
│       ├── app.json                 # Expo config
│       ├── package.json
│       └── tailwind.config.js       # NativeWind config
│
├── packages/
│   ├── shared-logic/                # Shared business logic
│   │   ├── src/
│   │   │   ├── api/                 # API client functions
│   │   │   │   ├── candidates.ts
│   │   │   │   ├── promises.ts
│   │   │   │   ├── works.ts
│   │   │   │   ├── cases.ts
│   │   │   │   ├── search.ts
│   │   │   │   └── client.ts        # Base API client
│   │   │   ├── stores/              # Zustand stores
│   │   │   │   ├── useAuthStore.ts
│   │   │   │   ├── useCandidateStore.ts
│   │   │   │   └── useCompareStore.ts
│   │   │   ├── hooks/               # Shared React hooks
│   │   │   │   ├── useCandidate.ts
│   │   │   │   ├── useCandidates.ts
│   │   │   │   ├── useSearch.ts
│   │   │   │   └── useRankings.ts
│   │   │   ├── utils/               # Utility functions
│   │   │   │   ├── scoring.ts       # Scoring algorithms (placeholder)
│   │   │   │   ├── formatting.ts
│   │   │   │   └── validation.ts
│   │   │   └── types/               # TypeScript types
│   │   │       ├── candidate.ts
│   │   │       ├── promise.ts
│   │   │       ├── work.ts
│   │   │       └── case.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui-components/               # Shared UI components
│   │   ├── src/
│   │   │   ├── CandidateCard/
│   │   │   ├── PromiseCard/
│   │   │   ├── ScoreBadge/
│   │   │   ├── FilterBar/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── database/                    # Prisma schema and types
│   │   ├── prisma/
│   │   │   ├── schema.prisma        # Database schema
│   │   │   ├── migrations/
│   │   │   └── seed.ts              # Sample data seeding
│   │   ├── src/
│   │   │   └── client.ts            # Prisma client instance
│   │   └── package.json
│   │
│   └── config/                      # Shared configuration
│       ├── eslint-config/
│       ├── typescript-config/
│       └── tailwind-config/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                   # CI/CD pipeline
│       └── deploy.yml               # Deployment
│
├── turbo.json                       # Turborepo configuration
├── package.json                     # Root package.json
├── pnpm-workspace.yaml              # pnpm workspaces
└── README.md
```

### 🔧 Turborepo Configuration

**turbo.json:**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
```

---

## 4. Database Schema

### 🗄️ PostgreSQL Database Design (Prisma)

**File: `packages/database/prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ===========================
// CORE ENTITIES
// ===========================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?   // Hashed password (nullable for OAuth users)
  role          UserRole  @default(PUBLIC)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  auditLogs          AuditLog[]
  moderationReviews  ModerationQueue[] @relation("ReviewedBy")
  correctionRequests CorrectionRequest[]
  
  @@index([email])
  @@index([role])
}

enum UserRole {
  PUBLIC          // Can view only
  REGISTERED      // Can submit corrections
  MODERATOR       // Can approve/reject submissions
  ADMIN           // Full access
  SUPER_ADMIN     // System administration
}

model Province {
  id              Int      @id @default(autoincrement())
  name            String   @unique
  nameNepali      String?
  code            String   @unique // e.g., "P1", "P2"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  districts       District[]
  constituencies  Constituency[]
  
  @@index([code])
}

model District {
  id              Int      @id @default(autoincrement())
  name            String
  nameNepali      String?
  provinceId      Int
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  province        Province       @relation(fields: [provinceId], references: [id])
  constituencies  Constituency[]
  
  @@unique([provinceId, name])
  @@index([provinceId])
}

model Constituency {
  id              Int              @id @default(autoincrement())
  name            String
  nameNepali      String?
  constituencyNumber Int?          // For federal constituencies
  level           GovernmentLevel
  provinceId      Int
  districtId      Int?
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  
  province        Province     @relation(fields: [provinceId], references: [id])
  district        District?    @relation(fields: [districtId], references: [id])
  candidates      Candidate[]
  
  @@unique([provinceId, districtId, constituencyNumber, level])
  @@index([provinceId])
  @@index([districtId])
  @@index([level])
}

enum GovernmentLevel {
  FEDERAL
  PROVINCIAL
  LOCAL
}

model Party {
  id              Int      @id @default(autoincrement())
  name            String   @unique
  nameNepali      String?
  symbolUrl       String?
  foundedYear     Int?
  website         String?
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  candidates      Candidate[]
  
  @@index([name])
  @@index([isActive])
}

model Candidate {
  id                  String           @id @default(cuid())
  name                String
  nameNepali          String?
  age                 Int?
  gender              Gender?
  photoUrl            String?
  partyId             Int
  constituencyId      Int
  bio                 String?          @db.Text
  yearsInPolitics     Int?
  
  // Computed scores (updated by cron jobs or triggers)
  impactScore         Float?           @default(0)
  scandalScore        Float?           @default(0)
  fulfillmentRate     Float?           @default(0)
  popularityScore     Int?             @default(0) // Page views
  
  // Status indicators
  status              CandidateStatus  @default(DRAFT)
  isVerified          Boolean          @default(false)
  hasAllegations      Boolean          @default(false)
  hasCriminalCases    Boolean          @default(false)
  
  createdAt           DateTime         @default(now())
  updatedAt           DateTime         @updatedAt
  publishedAt         DateTime?
  
  // Relations
  party               Party            @relation(fields: [partyId], references: [id])
  constituency        Constituency     @relation(fields: [constituencyId], references: [id])
  
  posts               CandidatePost[]
  promises            Promise[]
  works               Work[]
  cases               Case[]
  rumors              Rumor[]
  comparisons         Comparison[]     @relation("ComparedCandidates")
  auditLogs           AuditLog[]
  
  @@index([partyId])
  @@index([constituencyId])
  @@index([status])
  @@index([name])
  @@index([impactScore])
  @@index([scandalScore])
  @@index([fulfillmentRate])
  @@fulltext([name, bio])
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum CandidateStatus {
  DRAFT
  PENDING_REVIEW
  PUBLISHED
  ARCHIVED
}

model CandidatePost {
  id              Int      @id @default(autoincrement())
  candidateId     String
  position        String   // e.g., "Minister of Finance", "Mayor of Kathmandu"
  positionNepali  String?
  level           GovernmentLevel
  startDate       DateTime
  endDate         DateTime?
  isCurrent       Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  candidate       Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  
  @@index([candidateId])
  @@index([isCurrent])
  @@index([level])
}

// ===========================
// CONTENT ENTITIES
// ===========================

model Promise {
  id              String          @id @default(cuid())
  candidateId     String
  text            String          @db.Text
  category        PromiseCategory
  type            PromiseType
  status          PromiseStatus   @default(NO_EVIDENCE)
  electionCycle   String?         // e.g., "2022", "2017"
  progressPercent Int?            @default(0) // 0-100
  announcedDate   DateTime?
  
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  
  candidate       Candidate       @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  sources         PromiseSource[]
  
  @@index([candidateId])
  @@index([category])
  @@index([status])
  @@fulltext([text])
}

enum PromiseCategory {
  ECONOMY
  INFRASTRUCTURE
  HEALTH
  EDUCATION
  SOCIAL_WELFARE
  ENVIRONMENT
  GOVERNANCE
  SECURITY
  AGRICULTURE
  OTHER
}

enum PromiseType {
  MANIFESTO
  SPEECH
  PUBLIC_COMMITMENT
  INTERVIEW
  OTHER
}

enum PromiseStatus {
  KEPT
  IN_PROGRESS
  BROKEN
  NO_EVIDENCE
  PARTIALLY_FULFILLED
}

model Work {
  id              String       @id @default(cuid())
  candidateId     String
  title           String
  titleNepali     String?
  description     String       @db.Text
  category        WorkCategory
  impactLevel     ImpactLevel  @default(MEDIUM)
  startDate       DateTime
  endDate         DateTime?
  completionPercent Int?       @default(0) // 0-100
  budget          Decimal?     @db.Decimal(15, 2)
  beneficiaries   Int?
  location        String?
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  candidate       Candidate    @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  sources         WorkSource[]
  
  @@index([candidateId])
  @@index([category])
  @@index([impactLevel])
  @@fulltext([title, description])
}

enum WorkCategory {
  INFRASTRUCTURE
  HEALTH
  EDUCATION
  SOCIAL_PROGRAMS
  POLICY_WORK
  LEGISLATION
  COMMUNITY_DEVELOPMENT
  ENVIRONMENT
  OTHER
}

enum ImpactLevel {
  LOW
  MEDIUM
  HIGH
}

model Case {
  id              String       @id @default(cuid())
  candidateId     String
  allegation      String       @db.Text
  caseNumber      String?
  courtName       String?
  severity        Int          @default(3) // 1-5 scale
  status          CaseStatus   @default(FILED)
  filedDate       DateTime?
  closedDate      DateTime?
  verdict         String?      @db.Text
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  candidate       Candidate    @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  sources         CaseSource[]
  
  @@index([candidateId])
  @@index([status])
  @@index([severity])
  @@fulltext([allegation])
}

enum CaseStatus {
  FILED
  UNDER_INVESTIGATION
  TRIAL
  HEARING
  ACQUITTED
  CONVICTED
  WITHDRAWN
  CLOSED
  INACTIVE
}

model Rumor {
  id              String       @id @default(cuid())
  candidateId     String
  text            String       @db.Text
  sourceType      RumorSource
  originDate      DateTime
  expiryDate      DateTime     // Auto-calculated (originDate + 60 days)
  popularityCount Int          @default(0) // # of mentions tracked
  isExpired       Boolean      @default(false)
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  candidate       Candidate    @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  
  @@index([candidateId])
  @@index([isExpired])
  @@index([expiryDate])
  @@fulltext([text])
}

enum RumorSource {
  SOCIAL_MEDIA
  SPEECH
  HEARSAY
  UNVERIFIED_MEDIA
  OTHER
}

// ===========================
// SOURCES & VERIFICATION
// ===========================

model Source {
  id              String           @id @default(cuid())
  title           String
  publisher       String
  url             String           @db.Text
  archivedUrl     String?          @db.Text
  publishedDate   DateTime?
  reliabilityTier SourceTier
  
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  
  promiseSources  PromiseSource[]
  workSources     WorkSource[]
  caseSources     CaseSource[]
  
  @@index([reliabilityTier])
}

enum SourceTier {
  TIER_1_OFFICIAL       // Election Commission, Courts, Govt docs
  TIER_2_REPUTABLE      // National media (Kantipur, BBC Nepali, etc.)
  TIER_3_LOCAL          // Local/regional outlets
  TIER_4_SOCIAL         // Social media, public statements
}

// Junction tables for many-to-many relationships
model PromiseSource {
  promiseId   String
  sourceId    String
  createdAt   DateTime @default(now())
  
  promise     Promise  @relation(fields: [promiseId], references: [id], onDelete: Cascade)
  source      Source   @relation(fields: [sourceId], references: [id], onDelete: Cascade)
  
  @@id([promiseId, sourceId])
  @@index([promiseId])
  @@index([sourceId])
}

model WorkSource {
  workId      String
  sourceId    String
  createdAt   DateTime @default(now())
  
  work        Work     @relation(fields: [workId], references: [id], onDelete: Cascade)
  source      Source   @relation(fields: [sourceId], references: [id], onDelete: Cascade)
  
  @@id([workId, sourceId])
  @@index([workId])
  @@index([sourceId])
}

model CaseSource {
  caseId      String
  sourceId    String
  createdAt   DateTime @default(now())
  
  case        Case     @relation(fields: [caseId], references: [id], onDelete: Cascade)
  source      Source   @relation(fields: [sourceId], references: [id], onDelete: Cascade)
  
  @@id([caseId, sourceId])
  @@index([caseId])
  @@index([sourceId])
}

// ===========================
// FEATURES: COMPARE, RANKINGS
// ===========================

model Comparison {
  id              String     @id @default(cuid())
  userId          String?    // Optional: track comparisons by user
  candidateIds    String[]   // Array of candidate IDs (max 3)
  createdAt       DateTime   @default(now())
  
  candidates      Candidate[] @relation("ComparedCandidates")
  
  @@index([userId])
}

model Ranking {
  id              String         @id @default(cuid())
  category        RankingCategory
  candidateId     String
  rank            Int
  score           Float
  calculatedAt    DateTime       @default(now())
  
  @@unique([category, calculatedAt, candidateId])
  @@index([category])
  @@index([calculatedAt])
}

enum RankingCategory {
  TOP_IMPACT
  CLEANEST_RECORDS
  HIGHEST_FULFILLMENT
  MOST_EXPERIENCED
  MOST_POPULAR
  MOST_IMPROVED
}

// ===========================
// MODERATION & GOVERNANCE
// ===========================

model ModerationQueue {
  id              String            @id @default(cuid())
  entityType      ModerationEntity
  entityId        String
  submittedBy     String?           // User ID
  status          ModerationStatus  @default(PENDING)
  reviewedBy      String?           // User ID
  reviewNotes     String?           @db.Text
  changesDiff     Json?             // Store original vs new as JSON
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  reviewedAt      DateTime?
  
  reviewer        User?             @relation("ReviewedBy", fields: [reviewedBy], references: [id])
  
  @@index([status])
  @@index([entityType])
  @@index([submittedBy])
  @@index([reviewedBy])
}

enum ModerationEntity {
  CANDIDATE
  PROMISE
  WORK
  CASE
  RUMOR
  SOURCE
}

enum ModerationStatus {
  PENDING
  APPROVED
  REJECTED
  REQUIRES_CHANGES
}

model CorrectionRequest {
  id              String    @id @default(cuid())
  candidateId     String?
  entityType      String?   // "promise", "work", "case", etc.
  entityId        String?
  submitterName   String?
  submitterEmail  String?
  submitterId     String?   // If logged in
  description     String    @db.Text
  suggestedSource String?   @db.Text
  status          CorrectionStatus @default(SUBMITTED)
  adminNotes      String?   @db.Text
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  resolvedAt      DateTime?
  
  submitter       User?     @relation(fields: [submitterId], references: [id])
  
  @@index([status])
  @@index([candidateId])
}

enum CorrectionStatus {
  SUBMITTED
  UNDER_REVIEW
  ACCEPTED
  REJECTED
  REQUIRES_INFO
}

model AuditLog {
  id              String    @id @default(cuid())
  userId          String
  action          String    // "CREATE", "UPDATE", "DELETE", "APPROVE", "REJECT"
  entityType      String    // "Candidate", "Promise", "Work", etc.
  entityId        String
  changes         Json?     // Store before/after as JSON
  reason          String?   @db.Text
  ipAddress       String?
  
  createdAt       DateTime  @default(now())
  
  user            User      @relation(fields: [userId], references: [id])
  candidate       Candidate? @relation(fields: [entityId], references: [id])
  
  @@index([userId])
  @@index([entityType])
  @@index([entityId])
  @@index([createdAt])
}
```

### 🔑 Key Schema Features

1. **Multi-source verification**: `PromiseSource`, `WorkSource`, `CaseSource` junction tables
2. **Audit trail**: Complete `AuditLog` for transparency
3. **Moderation workflow**: `ModerationQueue` for review process
4. **Flexible scoring**: Computed fields on `Candidate` (updated via background jobs)
5. **Full-text search**: `@@fulltext` on searchable fields
6. **Rumors with expiry**: `expiryDate` and `isExpired` for auto-cleanup
7. **RBAC ready**: `UserRole` enum for authorization

---

## 5. API Design

### 🛣️ API Routes Structure

**Base URL (Web):** `https://yourapp.com/api/`
**Base URL (Mobile):** Same API, consumed via `shared-logic` package

### Public Endpoints (No Auth Required)

#### **Candidates**

```
GET    /api/candidates
  Query params:
    - level: "FEDERAL" | "PROVINCIAL" | "LOCAL"
    - partyId: number
    - constituencyId: number
    - page: number (default: 1)
    - limit: number (default: 20)
    - sortBy: "name" | "impactScore" | "fulfillmentRate" | "scandalScore"
    - order: "asc" | "desc"
  Response: { candidates: Candidate[], total: number, page: number }

GET    /api/candidates/:id
  Response: { candidate: Candidate, posts: CandidatePost[] }

GET    /api/candidates/:id/promises
  Response: { promises: Promise[] }

GET    /api/candidates/:id/works
  Response: { works: Work[] }

GET    /api/candidates/:id/cases
  Response: { cases: Case[] }

GET    /api/candidates/:id/rumors
  Response: { rumors: Rumor[] }

GET    /api/candidates/:id/sources
  Response: { sources: Source[] }
```

#### **Search**

```
GET    /api/search
  Query params:
    - q: string (search query)
    - type: "candidates" | "promises" | "works" | "cases"
    - filters: JSON object (optional)
  Response: { results: any[], total: number }
```

#### **Compare**

```
POST   /api/compare
  Body: { candidateIds: string[] } (max 3)
  Response: { candidates: Candidate[], metrics: ComparisonMetrics }
```

#### **Rankings**

```
GET    /api/rankings
  Query params:
    - category: RankingCategory
    - level: GovernmentLevel (optional)
    - partyId: number (optional)
    - limit: number (default: 50)
  Response: { rankings: Ranking[] }
```

#### **Metadata**

```
GET    /api/parties
  Response: { parties: Party[] }

GET    /api/provinces
  Response: { provinces: Province[] }

GET    /api/constituencies
  Query params:
    - provinceId: number
    - districtId: number
    - level: GovernmentLevel
  Response: { constituencies: Constituency[] }
```

### Authenticated Endpoints (Require Login)

#### **Corrections** (REGISTERED users)

```
POST   /api/corrections
  Body: CorrectionRequest
  Response: { id: string, status: "submitted" }

GET    /api/corrections/mine
  Response: { corrections: CorrectionRequest[] }
```

### Admin/Moderator Endpoints (Protected)

#### **Admin - Candidates**

```
POST   /api/admin/candidates
  Body: Candidate
  Response: { candidate: Candidate }

PATCH  /api/admin/candidates/:id
  Body: Partial<Candidate>
  Response: { candidate: Candidate }

DELETE /api/admin/candidates/:id
  Response: { success: boolean }

POST   /api/admin/candidates/:id/publish
  Response: { candidate: Candidate }
```

#### **Admin - Promises/Works/Cases** (Similar CRUD)

```
POST   /api/admin/promises
PATCH  /api/admin/promises/:id
DELETE /api/admin/promises/:id

POST   /api/admin/works
PATCH  /api/admin/works/:id
DELETE /api/admin/works/:id

POST   /api/admin/cases
PATCH  /api/admin/cases/:id
DELETE /api/admin/cases/:id
```

#### **Moderation**

```
GET    /api/admin/moderation/queue
  Query params:
    - status: ModerationStatus
    - entityType: ModerationEntity
  Response: { items: ModerationQueue[] }

POST   /api/admin/moderation/:id/approve
  Response: { item: ModerationQueue }

POST   /api/admin/moderation/:id/reject
  Body: { reason: string }
  Response: { item: ModerationQueue }
```

#### **Users & Roles**

```
GET    /api/admin/users
  Response: { users: User[] }

PATCH  /api/admin/users/:id/role
  Body: { role: UserRole }
  Response: { user: User }
```

#### **Audit Log**

```
GET    /api/admin/audit-log
  Query params:
    - userId: string
    - entityType: string
    - startDate: ISO string
    - endDate: ISO string
    - page: number
  Response: { logs: AuditLog[], total: number }
```

### 🔒 Authentication Flow

**Web (Next.js):**

- NextAuth.js handles sessions
- Middleware checks auth on `/admin/*` routes
- JWT stored in httpOnly cookies

**Mobile (Expo):**

- User logs in via web OAuth flow (Expo AuthSession)
- Receives JWT token
- Stores token in secure storage (expo-secure-store)
- Sends token in `Authorization: Bearer <token>` header

---

## 6. Authentication & Authorization

### 🔐 Auth Strategy

#### **NextAuth.js Configuration**

```typescript
// apps/web/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@repo/database"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        })
      
        if (!user || !credentials?.password) return null
      
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password || ""
        )
      
        if (!isValid) return null
      
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

#### **Middleware for Route Protection**

```typescript
// apps/web/middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const path = req.nextUrl.pathname
    
      // Admin routes require ADMIN or SUPER_ADMIN role
      if (path.startsWith("/admin")) {
        return token?.role === "ADMIN" || token?.role === "SUPER_ADMIN"
      }
    
      // All other protected routes just need to be logged in
      return !!token
    }
  }
})

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"]
}
```

### 👥 Role-Based Access Control (RBAC)

| Role                  | Permissions                                       |
| --------------------- | ------------------------------------------------- |
| **PUBLIC**      | Read-only access to all public data               |
| **REGISTERED**  | + Submit correction requests                      |
| **MODERATOR**   | + Review moderation queue, approve/reject content |
| **ADMIN**       | + Full CRUD on all entities, manage users         |
| **SUPER_ADMIN** | + System configuration, role management           |

---

## 7. Design System

### 🎨 Visual Design (To Be Filled)

> **NOTE:** Fill in your preferred design choices below. Leave blank if you want the agent to use sensible defaults. Use global theming so that modification is easier.

#### **Color Palette**

```
Primary Color:        [YOUR CHOICE] (e.g., #3B82F6 for blue)
Secondary Color:      [YOUR CHOICE]
Accent Color:         [YOUR CHOICE]

Background Colors:
  - Light mode:       [YOUR CHOICE] (default: white, gray-50)
  - Dark mode:        [YOUR CHOICE] (default: gray-900, black)

Status Colors:
  - Success (Verified):     [YOUR CHOICE] (default: green-600)
  - Warning (Allegation):   [YOUR CHOICE] (default: yellow-600)
  - Danger (Criminal):      [YOUR CHOICE] (default: red-600)
  - Neutral:                [YOUR CHOICE] (default: gray-600)

Party Colors (Optional):
  - Nepali Congress:   [YOUR CHOICE]
  - UML:              [YOUR CHOICE]
  - Maoist Centre:    [YOUR CHOICE]
  (Add more as needed)
```

#### **Typography**

```
Font Family:
  - Primary (Body):     [YOUR CHOICE] (default: Inter, system-ui)
  - Headings:           [YOUR CHOICE] (default: Inter)
  - Nepali Text:        [YOUR CHOICE] (default: Noto Sans Devanagari)
  - Monospace (Code):   [YOUR CHOICE] (default: JetBrains Mono)

Font Sizes (Tailwind scale):
  - Use default Tailwind scale or customize
  - Prefer: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl
```

#### **Spacing & Layout**

```
Container Max Width:   [YOUR CHOICE] (default: 1280px)
Grid Columns:          [YOUR CHOICE] (default: 12)
Gap/Spacing:           [YOUR CHOICE] (default: Tailwind defaults)
Border Radius:         [YOUR CHOICE] (default: rounded-lg = 0.5rem)
```

#### **Component Library**

- **Web:** shadcn/ui (Tailwind-based, customizable)
- **Mobile:** Custom components styled with NativeWind (Tailwind for React Native)

#### **Icons**

- **Icon Set:** [YOUR CHOICE] (default: Lucide React)
- **Icon Size:** [YOUR CHOICE] (default: 20px for UI, 24px for features)

#### **Images & Media**

- **Candidate Photos:** Square aspect ratio (1:1), min 400x400px
- **Party Symbols:** Transparent PNG, 200x200px
- **Default Placeholder:** [YOUR CHOICE] (default: gray silhouette)

### 🧩 Key UI Components to Build

#### **Web Components** (shadcn/ui + custom)

1. **CandidateCard** - Grid/list view card with photo, name, party, scores
2. **CandidateProfile** - Full profile page with tabs
3. **FilterSidebar** - Filters for candidates list (party, level, constituency)
4. **ScoreBadge** - Visual badge for impact/scandal/fulfillment scores
5. **PromiseCard** - Promise display with status indicator
6. **WorkCard** - Achievement/work display with impact level
7. **CaseCard** - Legal case display with severity indicator
8. **RumorCard** - Rumor display with disclaimer and expiry countdown
9. **ComparisonTable** - Side-by-side candidate comparison
10. **RankingList** - Leaderboard-style ranking display
11. **SearchBar** - Auto-suggest search with filters
12. **NepalMap** - Interactive SVG map (web only, Phase 2)

#### **Mobile Components** (NativeWind)

- Adapt all web components for mobile with touch-friendly sizing
- Bottom tab navigation
- Pull-to-refresh functionality
- Native gestures (swipe, pinch-to-zoom on map)

---

## 8. Builder.io Integration

### 🎨 Visual Development Strategy

#### **What Builder.io Does**

- Provides drag-and-drop interface for designing screens
- Connects to your existing React/React Native codebase
- Allows non-developers to create/edit pages using your components
- Fetches layouts as JSON at runtime (no redeployment needed)

#### **Integration Steps**

**1. Install Builder.io SDK**

```bash
# In apps/web
pnpm add @builder.io/react

# In apps/mobile
pnpm add @builder.io/react-native
```

**2. Register Custom Components**

**Web Example (`apps/web/lib/builder-registry.ts`):**

```typescript
import { Builder } from "@builder.io/react"
import { CandidateCard } from "@/components/CandidateCard"
import { ScoreBadge } from "@/components/ScoreBadge"

// Register components with Builder.io
Builder.registerComponent(CandidateCard, {
  name: "CandidateCard",
  inputs: [
    { name: "candidateId", type: "string", required: true },
    { name: "variant", type: "string", enum: ["grid", "list"], defaultValue: "grid" }
  ]
})

Builder.registerComponent(ScoreBadge, {
  name: "ScoreBadge",
  inputs: [
    { name: "type", type: "string", enum: ["impact", "scandal", "fulfillment"] },
    { name: "value", type: "number" }
  ]
})

// Register more components...
```

**Mobile Example (`apps/mobile/lib/builder-registry.ts`):**

```typescript
import { Builder } from "@builder.io/react-native"
import { CandidateCard } from "../components/CandidateCard"

Builder.registerComponent(CandidateCard, {
  name: "CandidateCard",
  inputs: [
    { name: "candidateId", type: "string" }
  ]
})
```

**3. Create Builder.io Catch-All Route**

**Web (`apps/web/app/[...page]/page.tsx`):**

```typescript
import { builder } from "@builder.io/sdk"
import { RenderBuilderContent } from "@/components/builder"

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!)

export default async function Page({ params }: { params: { page: string[] } }) {
  const content = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || "")
      }
    })
    .toPromise()

  return <RenderBuilderContent content={content} />
}
```

**4. Use Builder.io Visual Editor**

- Log into builder.io dashboard
- Create new "page" or "section"
- Drag your registered components into the canvas
- Configure props visually
- Publish

**5. Workflow**

- **Developers:** Build reusable components in code
- **Designers/PMs:** Use Builder.io to compose screens
- **Agent:** Scaffolds initial components and registers them

### 🔧 Builder.io Configuration

**Environment Variables:**

```bash
# apps/web/.env.local
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_io_public_key

# apps/mobile/.env
EXPO_PUBLIC_BUILDER_API_KEY=your_builder_io_public_key
```

**Which Screens to Build in Builder.io:**

- Home page layouts
- Marketing/about pages
- Candidate profile layouts (can still fetch data via API)
- Custom editorial pages

**Which Screens to Keep in Code:**

- Admin panel (security-sensitive)
- Complex interactive features (search, compare, rankings)
- Authentication flows

---

## 9. Development Workflow

### 🚀 Getting Started (For Agent)

**1. Initialize Turborepo Monorepo**

```bash
npx create-turbo@latest neta-nepal
cd neta-nepal
```

**2. Add Next.js Web App**

```bash
cd apps
npx create-next-app@latest web --typescript --tailwind --app --use-pnpm
```

**3. Add Expo Mobile App**

```bash
cd apps
npx create-expo-app mobile --template tabs
cd mobile
npx expo install nativewind tailwindcss
```

**4. Create Shared Packages**

```bash
# In packages/
mkdir shared-logic ui-components database config
```

**5. Set Up Prisma**

```bash
cd packages/database
pnpm add prisma @prisma/client
npx prisma init
# Copy schema from this spec into prisma/schema.prisma
npx prisma migrate dev --name init
npx prisma generate
```

**6. Install Dependencies**

```bash
# Root level
pnpm install

# Add shared dependencies
pnpm add zustand @tanstack/react-query --filter @repo/shared-logic
pnpm add bcryptjs --filter web
pnpm add next-auth --filter web
```

**7. Configure Turborepo**

- Copy the `turbo.json` config from this spec

**8. Run Development Servers**

```bash
# From root
pnpm dev

# This will start:
# - apps/web on http://localhost:3000
# - apps/mobile on Expo DevTools
```

### 📦 Package Manager

- **pnpm** (workspace support, faster than npm/yarn)

### 🧪 Testing (Optional for MVP, Recommended for Production)

- **Unit Tests:** Vitest
- **Integration Tests:** Playwright (web), Detox (mobile)
- **E2E Tests:** Playwright

### 📝 Code Quality

- **Linting:** ESLint (with Next.js and React Native configs)
- **Formatting:** Prettier
- **Type Checking:** TypeScript strict mode
- **Git Hooks:** Husky + lint-staged (optional)

---

## 10. Deployment Strategy

### 🌐 Web Deployment (Next.js)

**Platform:** Vercel (recommended) or Netlify

**Steps:**

1. Connect GitHub repo to Vercel
2. Set root directory to `apps/web`
3. Configure build settings:
   ```
   Build Command: cd ../.. && pnpm turbo run build --filter=web
   Output Directory: apps/web/.next
   Install Command: pnpm install
   ```
4. Add environment variables:
   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=random_secret_string
   NEXTAUTH_URL=https://yourapp.com
   NEXT_PUBLIC_BUILDER_API_KEY=...
   CLOUDINARY_URL=...
   ```
5. Deploy

**Custom Domain:**

- Add your domain in Vercel dashboard
- Update DNS records

### 📱 Mobile Deployment (Expo)

**Platform:** Expo Application Services (EAS)

**Steps:**

1. Install EAS CLI:

   ```bash
   npm install -g eas-cli
   ```
2. Configure EAS:

   ```bash
   cd apps/mobile
   eas build:configure
   ```
3. Create builds:

   ```bash
   # Android
   eas build --platform android --profile production

   # iOS
   eas build --platform ios --profile production
   ```
4. Submit to stores:

   ```bash
   eas submit --platform android
   eas submit --platform ios
   ```

**OTA Updates (Over-the-Air):**

```bash
eas update --branch production
```

Users get updates without app store approval.

### 🗄️ Database Hosting

**Recommended:** Supabase (PostgreSQL + Auth + Storage) or Neon (serverless Postgres)

**Setup:**

1. Create Supabase/Neon project
2. Copy connection string
3. Add to `.env`:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   ```
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

### 🔄 CI/CD Pipeline

**GitHub Actions (`/.github/workflows/ci.yml`):**

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm turbo run lint type-check

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm turbo run build
```

### 📊 Monitoring & Analytics

**Error Tracking:**

- Sentry (web + mobile)

**Analytics:**

- Plausible (privacy-friendly, GDPR compliant)
- OR Google Analytics

**Performance:**

- Vercel Analytics (web)
- Expo Analytics (mobile)

---

## 11. MVP Scope & Features

### ✅ Phase 1: MVP (Baseline App)

**Timeline:** 2-4 weeks of development

#### **Core Features to Build First**

**Public App:**

1. ✅ **Home Page**

   - Hero section with search bar
   - Featured categories (Top Performers, Most Controversial)
   - Quick filters (Federal/Provincial/Local)
2. ✅ **Candidates List**

   - Grid/list view toggle
   - Filters: party, level, constituency
   - Sort: name, impact score, fulfillment rate
   - Pagination (20 per page)
3. ✅ **Candidate Profile** (Full Detail)

   - 6 tabs: Overview, Report Card, Works, Promises, Cases, Sources
   - Rumor tab with disclaimer
   - "Why this score?" modal
   - Traffic light indicators
4. ✅ **Search**

   - Global search bar (candidates only in MVP)
   - Auto-suggest
   - Basic filters
5. ✅ **Compare** (Up to 3 candidates)

   - Side-by-side metrics
   - Visual bar charts
   - Identity comparison table
6. ✅ **Rankings**

   - 4 categories: Top Impact, Cleanest Records, Highest Fulfillment, Most Popular
   - Filter by level and party
   - Top 50 display

**Admin Panel:**
7. ✅ **Dashboard**

- Total candidates count
- Pending moderation items
- Recent activity

8. ✅ **Candidate Management**

   - CRUD operations
   - Add promises, works, cases
   - Attach sources
   - Status management (Draft → Published)
9. ✅ **Moderation Queue**

   - List pending items
   - Approve/reject with notes
   - View diff
10. ✅ **Sources Management**

    - Add sources with reliability tier
    - Archive URL input

**Mobile App:**
11. ✅ **Bottom Tab Navigation**
    - Home, Search, Compare, Rankings, More

12. ✅ **Responsive Candidate Profile**
    - All tabs adapted for mobile
    - Swipeable tabs

**Authentication:**
13. ✅ **Admin Login** (email/password)
    - No public registration in MVP
    - Admin creates moderator accounts

#### **Data in MVP**

- **50 federal-level candidates** (hand-entered or scraped from ECN)
- At least **10 candidates with full profiles** (promises, works, cases)
- **All major parties** in database
- **Federal constituencies** for main districts

#### **Deferred to Phase 2**

- ❌ Nepal interactive map
- ❌ Fuzzy search / MeiliSearch
- ❌ Nepali language support
- ❌ Public user registration
- ❌ Correction request form (public)
- ❌ Provincial and local candidates
- ❌ Advanced analytics dashboard
- ❌ Email notifications
- ❌ Social sharing features

---

## 12. Phase 2 Features

**Planned Enhancements (Post-MVP):**

1. **Nepal Interactive Map**

   - Click province → district → candidates
   - SVG or Leaflet.js
   - Heat map by party dominance
2. **Advanced Search**

   - MeiliSearch integration
   - Fuzzy/typo-tolerant search
   - Search in promises, works, cases (not just candidates)
3. **Localization**

   - Nepali language (i18n)
   - Store data in both English and Nepali
   - Language toggle
4. **Public Engagement**

   - User registration
   - Public correction request form
   - Upvote/downvote on rumors (track popularity)
5. **Notifications**

   - Email alerts for moderation queue (admins)
   - Push notifications for mobile (new candidates, updates)
6. **Data Expansion**

   - Provincial-level candidates (753 total)
   - Local-level candidates (mayors, ward chairs)
   - Historical election data (2017, 2022, etc.)
7. **Advanced Analytics**

   - Trend graphs (score changes over time)
   - Party performance comparison
   - District-wise statistics
8. **Social Features**

   - Share candidate profiles on social media
   - Embed widgets for media outlets
9. **API for Third Parties**

   - Public API for researchers, journalists
   - Rate limiting and API keys
10. **Accessibility**

    - Screen reader support
    - High contrast mode
    - Keyboard navigation

---

## 🎯 Summary for AI Agent

### **What to Build (Step-by-Step)**

**Stage 1: Scaffold (Day 1)**

1. Create Turborepo monorepo
2. Initialize apps/web (Next.js 14 + TypeScript + Tailwind)
3. Initialize apps/mobile (Expo + NativeWind)
4. Create packages: shared-logic, ui-components, database, config
5. Set up Prisma with full schema (from this spec)
6. Configure pnpm workspaces and turbo.json

**Stage 2: Core Infrastructure (Days 2-3)**

1. Set up NextAuth.js with email/password
2. Create API routes for candidates (CRUD)
3. Implement Zustand stores in shared-logic
4. Set up TanStack Query for data fetching
5. Configure Cloudinary for image uploads
6. Add middleware for auth protection

**Stage 3: Public Pages (Days 4-7)**

1. Build Home page (hero, filters, featured sections)
2. Build Candidates list (filters, sort, pagination)
3. Build Candidate profile (6 tabs, all data display)
4. Build Search (basic text search with Postgres)
5. Build Compare (side-by-side, max 3)
6. Build Rankings (4 categories, filterable)

**Stage 4: Admin Panel (Days 8-10)**

1. Build admin layout with sidebar navigation
2. Build dashboard (stats, recent activity)
3. Build candidate management (CRUD forms)
4. Build promises/works/cases forms
5. Build moderation queue (approve/reject)
6. Build audit log viewer

**Stage 5: Mobile App (Days 11-13)**

1. Adapt all public pages for mobile
2. Implement bottom tab navigation
3. Add pull-to-refresh
4. Test on iOS and Android simulators

**Stage 6: Polish & Deploy (Days 14)**

1. Add loading states, error boundaries
2. Optimize images with Cloudinary
3. Test authentication flow
4. Deploy web to Vercel
5. Create EAS build for mobile
6. Write README with setup instructions

### **Environment Variables Needed**

Create `.env.example` files:

**apps/web/.env.example:**

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/neta_nepal

# Auth
NEXTAUTH_SECRET=generate_random_32_char_string
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Builder.io (optional for MVP)
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_key

# Redis (optional for MVP)
REDIS_URL=redis://localhost:6379
```

**apps/mobile/.env.example:**

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_BUILDER_API_KEY=your_builder_key
```

---

## 📋 Checklist for You (Project Owner)

Before passing this to an agent, fill in:

- [ ] **Design System** (Section 7)

  - [ ] Choose color palette
  - [ ] Select fonts (body, headings, Nepali)
  - [ ] Pick icon set
  - [ ] Decide on component library preferences
- [ ] **Builder.io Decision**

  - [ ] Create Builder.io account (if using)
  - [ ] Get API key
  - [ ] Decide which pages to build in Builder vs code
- [ ] **Third-Party Accounts**

  - [ ] Supabase/Neon account for database
  - [ ] Cloudinary account for images
  - [ ] Vercel account for web hosting
  - [ ] Expo account for mobile builds
- [ ] **Initial Data**

  - [ ] Prepare list of 50 candidates to seed
  - [ ] Gather party logos and symbols
  - [ ] Identify data sources for initial entries
- [ ] **Domain & Branding**

  - [ ] Choose domain name (e.g., netanepal.org)
  - [ ] Create logo
  - [ ] Write "About Us" and "Editorial Policy" text

---

## ✅ Ready to Build

**This spec is now ready for an AI agent to:**

1. Generate the complete monorepo structure
2. Implement all database models with Prisma
3. Build all API endpoints
4. Create web and mobile UIs based on the Information Architecture
5. Set up authentication and authorization
6. Integrate Builder.io for visual editing
7. Deploy to production

**Estimated Agent Build Time:** 1-2 days of iterative development
**Estimated Manual Customization Time:** 1-2 days (design tweaks, content, testing)

---

**Document Prepared By:** GitHub Copilot
**For:** Sandesh Bhattarai
**Project:** Nepal Political Candidate Information Platform
**Last Updated:** November 6, 2025
