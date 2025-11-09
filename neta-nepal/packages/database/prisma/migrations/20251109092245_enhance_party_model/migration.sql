/*
  Warnings:

  - A unique constraint covering the columns `[registrationNumber]` on the table `Party` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'NEEDS_REVIEW', 'INCORRECT');

-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "applicationDateAd" TIMESTAMP(3),
ADD COLUMN     "applicationDateBs" TEXT,
ADD COLUMN     "chairpersonName" TEXT,
ADD COLUMN     "chairpersonNameNepali" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "dataSource" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "generalSecretaryName" TEXT,
ADD COLUMN     "generalSecretaryNameNepali" TEXT,
ADD COLUMN     "headquarters" TEXT,
ADD COLUMN     "ideology" TEXT,
ADD COLUMN     "isMajorParty" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "registrationDateAd" TIMESTAMP(3),
ADD COLUMN     "registrationDateBs" TEXT,
ADD COLUMN     "registrationNumber" TEXT,
ADD COLUMN     "renewalDateAd" TIMESTAMP(3),
ADD COLUMN     "renewalDateBs" TEXT,
ADD COLUMN     "shortName" TEXT,
ADD COLUMN     "shortNameNepali" TEXT,
ADD COLUMN     "symbolDescription" TEXT,
ADD COLUMN     "symbolName" TEXT,
ADD COLUMN     "symbolNameNepali" TEXT,
ADD COLUMN     "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedBy" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Party_registrationNumber_key" ON "Party"("registrationNumber");

-- CreateIndex
CREATE INDEX "Party_nameNepali_idx" ON "Party"("nameNepali");

-- CreateIndex
CREATE INDEX "Party_isMajorParty_idx" ON "Party"("isMajorParty");

-- CreateIndex
CREATE INDEX "Party_registrationNumber_idx" ON "Party"("registrationNumber");

-- CreateIndex
CREATE INDEX "Party_verificationStatus_idx" ON "Party"("verificationStatus");
