-- CreateEnum
CREATE TYPE "ArchiveStatus" AS ENUM ('NOT_ARCHIVED', 'ARCHIVED', 'ARCHIVE_FAILED', 'ARCHIVE_PENDING');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('ARTICLE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'IMAGE', 'SOCIAL_POST');

-- CreateEnum
CREATE TYPE "ElectionType" AS ENUM ('FEDERAL_FPTP', 'FEDERAL_PR', 'PROVINCIAL_FPTP', 'PROVINCIAL_PR', 'LOCAL_MAYOR', 'LOCAL_DEPUTY_MAYOR', 'LOCAL_WARD');

-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "MentionCategory" AS ENUM ('ACHIEVEMENT', 'CONTROVERSY', 'POLICY', 'PERSONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('SPOUSE', 'PARENT', 'CHILD', 'SIBLING', 'BUSINESS_PARTNER', 'POLITICAL_ALLY', 'OTHER');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('VIEW_PROFILE', 'VIEW_PROMISE', 'VIEW_WORK', 'COMPARE_CANDIDATES', 'SEARCH', 'SHARE', 'REPORT_ERROR', 'UPVOTE', 'DOWNVOTE');

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "attendance" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "education" TEXT,
ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "instagramHandle" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "placeOfBirth" TEXT,
ADD COLUMN     "residenceAddress" TEXT,
ADD COLUMN     "trustScore" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "twitterHandle" TEXT,
ADD COLUMN     "websiteUrl" TEXT;

-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "accessedAt" TIMESTAMP(3),
ADD COLUMN     "archiveStatus" "ArchiveStatus" NOT NULL DEFAULT 'NOT_ARCHIVED',
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "mediaType" "MediaType" NOT NULL DEFAULT 'ARTICLE';

-- CreateTable
CREATE TABLE "FinancialDisclosure" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "assets" DECIMAL(15,2),
    "liabilities" DECIMAL(15,2),
    "income" DECIMAL(15,2),
    "declarationUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialDisclosure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectionResult" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "electionYear" INTEGER NOT NULL,
    "electionType" "ElectionType" NOT NULL,
    "constituencyId" INTEGER NOT NULL,
    "partyId" INTEGER NOT NULL,
    "votesReceived" INTEGER,
    "totalVotes" INTEGER,
    "rank" INTEGER,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ElectionResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaMention" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "publishedDate" TIMESTAMP(3) NOT NULL,
    "sentiment" "Sentiment" NOT NULL DEFAULT 'NEUTRAL',
    "category" "MentionCategory" NOT NULL,
    "excerptText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaMention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateRelation" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "relatedName" TEXT NOT NULL,
    "relationship" "RelationType" NOT NULL,
    "details" TEXT,
    "isPublicFigure" BOOLEAN NOT NULL DEFAULT false,
    "relatedCandidateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "activityType" "ActivityType" NOT NULL,
    "targetType" TEXT,
    "targetId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FinancialDisclosure_candidateId_idx" ON "FinancialDisclosure"("candidateId");

-- CreateIndex
CREATE INDEX "FinancialDisclosure_year_idx" ON "FinancialDisclosure"("year");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialDisclosure_candidateId_year_key" ON "FinancialDisclosure"("candidateId", "year");

-- CreateIndex
CREATE INDEX "ElectionResult_candidateId_idx" ON "ElectionResult"("candidateId");

-- CreateIndex
CREATE INDEX "ElectionResult_electionYear_idx" ON "ElectionResult"("electionYear");

-- CreateIndex
CREATE INDEX "ElectionResult_isWinner_idx" ON "ElectionResult"("isWinner");

-- CreateIndex
CREATE UNIQUE INDEX "ElectionResult_candidateId_electionYear_constituencyId_key" ON "ElectionResult"("candidateId", "electionYear", "constituencyId");

-- CreateIndex
CREATE INDEX "MediaMention_candidateId_idx" ON "MediaMention"("candidateId");

-- CreateIndex
CREATE INDEX "MediaMention_publishedDate_idx" ON "MediaMention"("publishedDate");

-- CreateIndex
CREATE INDEX "MediaMention_sentiment_idx" ON "MediaMention"("sentiment");

-- CreateIndex
CREATE INDEX "CandidateRelation_candidateId_idx" ON "CandidateRelation"("candidateId");

-- CreateIndex
CREATE INDEX "CandidateRelation_relatedCandidateId_idx" ON "CandidateRelation"("relatedCandidateId");

-- CreateIndex
CREATE INDEX "UserActivity_userId_idx" ON "UserActivity"("userId");

-- CreateIndex
CREATE INDEX "UserActivity_activityType_idx" ON "UserActivity"("activityType");

-- CreateIndex
CREATE INDEX "UserActivity_createdAt_idx" ON "UserActivity"("createdAt");

-- CreateIndex
CREATE INDEX "UserActivity_targetType_targetId_idx" ON "UserActivity"("targetType", "targetId");

-- CreateIndex
CREATE INDEX "Candidate_twitterHandle_idx" ON "Candidate"("twitterHandle");

-- CreateIndex
CREATE INDEX "Source_mediaType_idx" ON "Source"("mediaType");

-- AddForeignKey
ALTER TABLE "FinancialDisclosure" ADD CONSTRAINT "FinancialDisclosure_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectionResult" ADD CONSTRAINT "ElectionResult_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectionResult" ADD CONSTRAINT "ElectionResult_constituencyId_fkey" FOREIGN KEY ("constituencyId") REFERENCES "Constituency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectionResult" ADD CONSTRAINT "ElectionResult_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaMention" ADD CONSTRAINT "MediaMention_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaMention" ADD CONSTRAINT "MediaMention_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateRelation" ADD CONSTRAINT "CandidateRelation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateRelation" ADD CONSTRAINT "CandidateRelation_relatedCandidateId_fkey" FOREIGN KEY ("relatedCandidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
