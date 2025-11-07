-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PUBLIC', 'REGISTERED', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "GovernmentLevel" AS ENUM ('FEDERAL', 'PROVINCIAL', 'LOCAL');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PromiseCategory" AS ENUM ('ECONOMY', 'INFRASTRUCTURE', 'HEALTH', 'EDUCATION', 'SOCIAL_WELFARE', 'ENVIRONMENT', 'GOVERNANCE', 'SECURITY', 'AGRICULTURE', 'OTHER');

-- CreateEnum
CREATE TYPE "PromiseType" AS ENUM ('MANIFESTO', 'SPEECH', 'PUBLIC_COMMITMENT', 'INTERVIEW', 'OTHER');

-- CreateEnum
CREATE TYPE "PromiseStatus" AS ENUM ('KEPT', 'IN_PROGRESS', 'BROKEN', 'NO_EVIDENCE', 'PARTIALLY_FULFILLED');

-- CreateEnum
CREATE TYPE "WorkCategory" AS ENUM ('INFRASTRUCTURE', 'HEALTH', 'EDUCATION', 'SOCIAL_PROGRAMS', 'POLICY_WORK', 'LEGISLATION', 'COMMUNITY_DEVELOPMENT', 'ENVIRONMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "ImpactLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('FILED', 'UNDER_INVESTIGATION', 'TRIAL', 'HEARING', 'ACQUITTED', 'CONVICTED', 'WITHDRAWN', 'CLOSED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "RumorSource" AS ENUM ('SOCIAL_MEDIA', 'SPEECH', 'HEARSAY', 'UNVERIFIED_MEDIA', 'OTHER');

-- CreateEnum
CREATE TYPE "SourceTier" AS ENUM ('TIER_1_OFFICIAL', 'TIER_2_REPUTABLE', 'TIER_3_LOCAL', 'TIER_4_SOCIAL');

-- CreateEnum
CREATE TYPE "RankingCategory" AS ENUM ('TOP_IMPACT', 'CLEANEST_RECORDS', 'HIGHEST_FULFILLMENT', 'MOST_EXPERIENCED', 'MOST_POPULAR', 'MOST_IMPROVED');

-- CreateEnum
CREATE TYPE "ModerationEntity" AS ENUM ('CANDIDATE', 'PROMISE', 'WORK', 'CASE', 'RUMOR', 'SOURCE');

-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'REQUIRES_CHANGES');

-- CreateEnum
CREATE TYPE "CorrectionStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'REQUIRES_INFO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameNepali" TEXT,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameNepali" TEXT,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constituency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameNepali" TEXT,
    "constituencyNumber" INTEGER,
    "level" "GovernmentLevel" NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "districtId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Constituency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameNepali" TEXT,
    "symbolUrl" TEXT,
    "foundedYear" INTEGER,
    "website" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameNepali" TEXT,
    "age" INTEGER,
    "gender" "Gender",
    "photoUrl" TEXT,
    "partyId" INTEGER NOT NULL,
    "constituencyId" INTEGER NOT NULL,
    "bio" TEXT,
    "yearsInPolitics" INTEGER,
    "impactScore" DOUBLE PRECISION DEFAULT 0,
    "scandalScore" DOUBLE PRECISION DEFAULT 0,
    "fulfillmentRate" DOUBLE PRECISION DEFAULT 0,
    "popularityScore" INTEGER DEFAULT 0,
    "status" "CandidateStatus" NOT NULL DEFAULT 'DRAFT',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "hasAllegations" BOOLEAN NOT NULL DEFAULT false,
    "hasCriminalCases" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidatePost" (
    "id" SERIAL NOT NULL,
    "candidateId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "positionNepali" TEXT,
    "level" "GovernmentLevel" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidatePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promise" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "category" "PromiseCategory" NOT NULL,
    "type" "PromiseType" NOT NULL,
    "status" "PromiseStatus" NOT NULL DEFAULT 'NO_EVIDENCE',
    "electionCycle" TEXT,
    "progressPercent" INTEGER DEFAULT 0,
    "announcedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleNepali" TEXT,
    "description" TEXT NOT NULL,
    "category" "WorkCategory" NOT NULL,
    "impactLevel" "ImpactLevel" NOT NULL DEFAULT 'MEDIUM',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "completionPercent" INTEGER DEFAULT 0,
    "budget" DECIMAL(15,2),
    "beneficiaries" INTEGER,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "allegation" TEXT NOT NULL,
    "caseNumber" TEXT,
    "courtName" TEXT,
    "severity" INTEGER NOT NULL DEFAULT 3,
    "status" "CaseStatus" NOT NULL DEFAULT 'FILED',
    "filedDate" TIMESTAMP(3),
    "closedDate" TIMESTAMP(3),
    "verdict" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rumor" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sourceType" "RumorSource" NOT NULL,
    "originDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "popularityCount" INTEGER NOT NULL DEFAULT 0,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rumor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "archivedUrl" TEXT,
    "publishedDate" TIMESTAMP(3),
    "reliabilityTier" "SourceTier" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromiseSource" (
    "promiseId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromiseSource_pkey" PRIMARY KEY ("promiseId","sourceId")
);

-- CreateTable
CREATE TABLE "WorkSource" (
    "workId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkSource_pkey" PRIMARY KEY ("workId","sourceId")
);

-- CreateTable
CREATE TABLE "CaseSource" (
    "caseId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseSource_pkey" PRIMARY KEY ("caseId","sourceId")
);

-- CreateTable
CREATE TABLE "Comparison" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "candidateIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comparison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranking" (
    "id" TEXT NOT NULL,
    "category" "RankingCategory" NOT NULL,
    "candidateId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModerationQueue" (
    "id" TEXT NOT NULL,
    "entityType" "ModerationEntity" NOT NULL,
    "entityId" TEXT NOT NULL,
    "submittedBy" TEXT,
    "status" "ModerationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewNotes" TEXT,
    "changesDiff" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "ModerationQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorrectionRequest" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT,
    "entityType" TEXT,
    "entityId" TEXT,
    "submitterName" TEXT,
    "submitterEmail" TEXT,
    "submitterId" TEXT,
    "description" TEXT NOT NULL,
    "suggestedSource" TEXT,
    "status" "CorrectionStatus" NOT NULL DEFAULT 'SUBMITTED',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "CorrectionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "changes" JSONB,
    "reason" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ComparedCandidates" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ComparedCandidates_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Province_code_key" ON "Province"("code");

-- CreateIndex
CREATE INDEX "Province_code_idx" ON "Province"("code");

-- CreateIndex
CREATE INDEX "District_provinceId_idx" ON "District"("provinceId");

-- CreateIndex
CREATE UNIQUE INDEX "District_provinceId_name_key" ON "District"("provinceId", "name");

-- CreateIndex
CREATE INDEX "Constituency_provinceId_idx" ON "Constituency"("provinceId");

-- CreateIndex
CREATE INDEX "Constituency_districtId_idx" ON "Constituency"("districtId");

-- CreateIndex
CREATE INDEX "Constituency_level_idx" ON "Constituency"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Constituency_provinceId_districtId_constituencyNumber_level_key" ON "Constituency"("provinceId", "districtId", "constituencyNumber", "level");

-- CreateIndex
CREATE UNIQUE INDEX "Party_name_key" ON "Party"("name");

-- CreateIndex
CREATE INDEX "Party_name_idx" ON "Party"("name");

-- CreateIndex
CREATE INDEX "Party_isActive_idx" ON "Party"("isActive");

-- CreateIndex
CREATE INDEX "Candidate_partyId_idx" ON "Candidate"("partyId");

-- CreateIndex
CREATE INDEX "Candidate_constituencyId_idx" ON "Candidate"("constituencyId");

-- CreateIndex
CREATE INDEX "Candidate_status_idx" ON "Candidate"("status");

-- CreateIndex
CREATE INDEX "Candidate_name_idx" ON "Candidate"("name");

-- CreateIndex
CREATE INDEX "Candidate_impactScore_idx" ON "Candidate"("impactScore");

-- CreateIndex
CREATE INDEX "Candidate_scandalScore_idx" ON "Candidate"("scandalScore");

-- CreateIndex
CREATE INDEX "Candidate_fulfillmentRate_idx" ON "Candidate"("fulfillmentRate");

-- CreateIndex
CREATE INDEX "CandidatePost_candidateId_idx" ON "CandidatePost"("candidateId");

-- CreateIndex
CREATE INDEX "CandidatePost_isCurrent_idx" ON "CandidatePost"("isCurrent");

-- CreateIndex
CREATE INDEX "CandidatePost_level_idx" ON "CandidatePost"("level");

-- CreateIndex
CREATE INDEX "Promise_candidateId_idx" ON "Promise"("candidateId");

-- CreateIndex
CREATE INDEX "Promise_category_idx" ON "Promise"("category");

-- CreateIndex
CREATE INDEX "Promise_status_idx" ON "Promise"("status");

-- CreateIndex
CREATE INDEX "Work_candidateId_idx" ON "Work"("candidateId");

-- CreateIndex
CREATE INDEX "Work_category_idx" ON "Work"("category");

-- CreateIndex
CREATE INDEX "Work_impactLevel_idx" ON "Work"("impactLevel");

-- CreateIndex
CREATE INDEX "Case_candidateId_idx" ON "Case"("candidateId");

-- CreateIndex
CREATE INDEX "Case_status_idx" ON "Case"("status");

-- CreateIndex
CREATE INDEX "Case_severity_idx" ON "Case"("severity");

-- CreateIndex
CREATE INDEX "Rumor_candidateId_idx" ON "Rumor"("candidateId");

-- CreateIndex
CREATE INDEX "Rumor_isExpired_idx" ON "Rumor"("isExpired");

-- CreateIndex
CREATE INDEX "Rumor_expiryDate_idx" ON "Rumor"("expiryDate");

-- CreateIndex
CREATE INDEX "Source_reliabilityTier_idx" ON "Source"("reliabilityTier");

-- CreateIndex
CREATE INDEX "PromiseSource_promiseId_idx" ON "PromiseSource"("promiseId");

-- CreateIndex
CREATE INDEX "PromiseSource_sourceId_idx" ON "PromiseSource"("sourceId");

-- CreateIndex
CREATE INDEX "WorkSource_workId_idx" ON "WorkSource"("workId");

-- CreateIndex
CREATE INDEX "WorkSource_sourceId_idx" ON "WorkSource"("sourceId");

-- CreateIndex
CREATE INDEX "CaseSource_caseId_idx" ON "CaseSource"("caseId");

-- CreateIndex
CREATE INDEX "CaseSource_sourceId_idx" ON "CaseSource"("sourceId");

-- CreateIndex
CREATE INDEX "Comparison_userId_idx" ON "Comparison"("userId");

-- CreateIndex
CREATE INDEX "Ranking_category_idx" ON "Ranking"("category");

-- CreateIndex
CREATE INDEX "Ranking_calculatedAt_idx" ON "Ranking"("calculatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_category_calculatedAt_candidateId_key" ON "Ranking"("category", "calculatedAt", "candidateId");

-- CreateIndex
CREATE INDEX "ModerationQueue_status_idx" ON "ModerationQueue"("status");

-- CreateIndex
CREATE INDEX "ModerationQueue_entityType_idx" ON "ModerationQueue"("entityType");

-- CreateIndex
CREATE INDEX "ModerationQueue_submittedBy_idx" ON "ModerationQueue"("submittedBy");

-- CreateIndex
CREATE INDEX "ModerationQueue_reviewedBy_idx" ON "ModerationQueue"("reviewedBy");

-- CreateIndex
CREATE INDEX "CorrectionRequest_status_idx" ON "CorrectionRequest"("status");

-- CreateIndex
CREATE INDEX "CorrectionRequest_candidateId_idx" ON "CorrectionRequest"("candidateId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_idx" ON "AuditLog"("entityType");

-- CreateIndex
CREATE INDEX "AuditLog_entityId_idx" ON "AuditLog"("entityId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "_ComparedCandidates_B_index" ON "_ComparedCandidates"("B");

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constituency" ADD CONSTRAINT "Constituency_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constituency" ADD CONSTRAINT "Constituency_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_constituencyId_fkey" FOREIGN KEY ("constituencyId") REFERENCES "Constituency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatePost" ADD CONSTRAINT "CandidatePost_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promise" ADD CONSTRAINT "Promise_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rumor" ADD CONSTRAINT "Rumor_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromiseSource" ADD CONSTRAINT "PromiseSource_promiseId_fkey" FOREIGN KEY ("promiseId") REFERENCES "Promise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromiseSource" ADD CONSTRAINT "PromiseSource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSource" ADD CONSTRAINT "WorkSource_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSource" ADD CONSTRAINT "WorkSource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseSource" ADD CONSTRAINT "CaseSource_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseSource" ADD CONSTRAINT "CaseSource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationQueue" ADD CONSTRAINT "ModerationQueue_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectionRequest" ADD CONSTRAINT "CorrectionRequest_submitterId_fkey" FOREIGN KEY ("submitterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComparedCandidates" ADD CONSTRAINT "_ComparedCandidates_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComparedCandidates" ADD CONSTRAINT "_ComparedCandidates_B_fkey" FOREIGN KEY ("B") REFERENCES "Comparison"("id") ON DELETE CASCADE ON UPDATE CASCADE;
