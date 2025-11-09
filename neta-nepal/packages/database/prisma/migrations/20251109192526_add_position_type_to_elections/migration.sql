/*
  Warnings:

  - The values [LOCAL_MAYOR,LOCAL_DEPUTY_MAYOR,LOCAL_WARD] on the enum `ElectionType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[candidateId,electionYear,constituencyId,positionType]` on the table `ElectionResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `positionType` to the `ElectionResult` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PositionType" AS ENUM ('MEMBER_OF_PARLIAMENT', 'MP_PROPORTIONAL', 'PROVINCIAL_ASSEMBLY_MEMBER', 'PA_PROPORTIONAL', 'METROPOLITAN_MAYOR', 'METROPOLITAN_DEPUTY_MAYOR', 'METROPOLITAN_WARD_CHAIR', 'METROPOLITAN_WARD_MEMBER', 'SUB_METROPOLITAN_MAYOR', 'SUB_METROPOLITAN_DEPUTY_MAYOR', 'SUB_METROPOLITAN_WARD_CHAIR', 'SUB_METROPOLITAN_WARD_MEMBER', 'MUNICIPAL_MAYOR', 'MUNICIPAL_DEPUTY_MAYOR', 'MUNICIPAL_WARD_CHAIR', 'MUNICIPAL_WARD_MEMBER', 'RURAL_MUNICIPAL_CHAIR', 'RURAL_MUNICIPAL_VICE_CHAIR', 'RURAL_WARD_CHAIR', 'RURAL_WARD_MEMBER');

-- AlterEnum
BEGIN;
CREATE TYPE "ElectionType_new" AS ENUM ('FEDERAL_FPTP', 'FEDERAL_PR', 'PROVINCIAL_FPTP', 'PROVINCIAL_PR', 'LOCAL_DIRECT');
ALTER TABLE "ElectionResult" ALTER COLUMN "electionType" TYPE "ElectionType_new" USING ("electionType"::text::"ElectionType_new");
ALTER TYPE "ElectionType" RENAME TO "ElectionType_old";
ALTER TYPE "ElectionType_new" RENAME TO "ElectionType";
DROP TYPE "public"."ElectionType_old";
COMMIT;

-- DropIndex
DROP INDEX "ElectionResult_candidateId_electionYear_constituencyId_key";

-- AlterTable
ALTER TABLE "CandidatePost" ADD COLUMN     "positionType" "PositionType";

-- AlterTable
ALTER TABLE "ElectionResult" ADD COLUMN     "positionType" "PositionType" NOT NULL;

-- CreateIndex
CREATE INDEX "CandidatePost_positionType_idx" ON "CandidatePost"("positionType");

-- CreateIndex
CREATE INDEX "ElectionResult_positionType_idx" ON "ElectionResult"("positionType");

-- CreateIndex
CREATE UNIQUE INDEX "ElectionResult_candidateId_electionYear_constituencyId_posi_key" ON "ElectionResult"("candidateId", "electionYear", "constituencyId", "positionType");
