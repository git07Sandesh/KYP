import { PrismaClient, VerificationStatus } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Direct CSV import - expects exact schema format
 */
interface PartyCSVRow {
  name: string;
  nameNepali: string;
  shortName: string;
  shortNameNepali: string;
  registrationNumber: string;
  applicationDateBs: string;
  applicationDateAd: string;
  registrationDateBs: string;
  registrationDateAd: string;
  renewalDateBs: string;
  renewalDateAd: string;
  headquarters: string;
  province: string;
  district: string;
  contactPhone: string;
  contactEmail: string;
  chairpersonName: string;
  chairpersonNameNepali: string;
  generalSecretaryName: string;
  generalSecretaryNameNepali: string;
  symbolName: string;
  symbolNameNepali: string;
  symbolUrl: string;
  symbolDescription: string;
  foundedYear: string;
  website: string;
  ideology: string;
  isActive: string;
  isMajorParty: string;
  dataSource: string;
  verificationStatus: string;
  verifiedAt: string;
  verifiedBy: string;
}

function toNullOrValue(value: string): string | null {
  return value && value.trim() !== '' ? value.trim() : null;
}

function toDate(value: string): Date | null {
  if (!value || value.trim() === '') return null;
  try {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

function toBoolean(value: string): boolean {
  if (!value || value.trim() === '') return false;
  const normalized = value.toLowerCase().trim();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
}

function toInt(value: string): number | null {
  if (!value || value.trim() === '') return null;
  const num = parseInt(value);
  return isNaN(num) ? null : num;
}

function toVerificationStatus(value: string): VerificationStatus {
  if (!value || value.trim() === '') return VerificationStatus.PENDING;
  const normalized = value.toUpperCase().trim();
  
  if (normalized === 'VERIFIED') return VerificationStatus.VERIFIED;
  if (normalized === 'NEEDS_REVIEW') return VerificationStatus.NEEDS_REVIEW;
  if (normalized === 'INCORRECT') return VerificationStatus.INCORRECT;
  
  return VerificationStatus.PENDING;
}

async function importParties() {
  console.log('🇳🇵 Importing Political Parties (Direct Schema Import)...\n');

  const csvPath = path.join(__dirname, '../../data/parties.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    console.log('\n📝 Expected file: packages/database/data/parties.csv');
    console.log('📋 Template: packages/database/data/parties-schema-template.csv');
    return;
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  const records: PartyCSVRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });

  console.log(`📊 Found ${records.length} parties in CSV\n`);

  let created = 0;
  let errors = 0;

  for (const row of records) {
    try {
      // Validate required fields
      if (!row.name || (!row.nameNepali && !row.name)) {
        console.log(`⚠️  Skipping row: Missing name`);
        errors++;
        continue;
      }

      // Map CSV row directly to Prisma schema
      const partyData = {
        name: toNullOrValue(row.name) || toNullOrValue(row.nameNepali) || 'Unknown',
        nameNepali: toNullOrValue(row.nameNepali),
        shortName: toNullOrValue(row.shortName),
        shortNameNepali: toNullOrValue(row.shortNameNepali),
        
        registrationNumber: toNullOrValue(row.registrationNumber),
        applicationDateBs: toNullOrValue(row.applicationDateBs),
        applicationDateAd: toDate(row.applicationDateAd),
        registrationDateBs: toNullOrValue(row.registrationDateBs),
        registrationDateAd: toDate(row.registrationDateAd),
        renewalDateBs: toNullOrValue(row.renewalDateBs),
        renewalDateAd: toDate(row.renewalDateAd),
        
        headquarters: toNullOrValue(row.headquarters),
        province: toNullOrValue(row.province),
        district: toNullOrValue(row.district),
        contactPhone: toNullOrValue(row.contactPhone),
        contactEmail: toNullOrValue(row.contactEmail),
        
        chairpersonName: toNullOrValue(row.chairpersonName),
        chairpersonNameNepali: toNullOrValue(row.chairpersonNameNepali),
        generalSecretaryName: toNullOrValue(row.generalSecretaryName),
        generalSecretaryNameNepali: toNullOrValue(row.generalSecretaryNameNepali),
        
        symbolName: toNullOrValue(row.symbolName),
        symbolNameNepali: toNullOrValue(row.symbolNameNepali),
        symbolUrl: toNullOrValue(row.symbolUrl),
        symbolDescription: toNullOrValue(row.symbolDescription),
        
        foundedYear: toInt(row.foundedYear),
        website: toNullOrValue(row.website),
        ideology: toNullOrValue(row.ideology),
        
        isActive: toBoolean(row.isActive ?? 'true'),
        isMajorParty: toBoolean(row.isMajorParty),
        
        dataSource: toNullOrValue(row.dataSource) || 'CSV-Import',
        verificationStatus: toVerificationStatus(row.verificationStatus),
        verifiedAt: toDate(row.verifiedAt),
        verifiedBy: toNullOrValue(row.verifiedBy),
      };

      const result = await prisma.party.create({
        data: partyData,
      });

      created++;
      console.log(`✅ Created: ${result.nameNepali || result.name} (${result.registrationNumber || 'no reg'})`);

    } catch (error) {
      errors++;
      console.error(`❌ Error: ${row.name || row.nameNepali}`);
      console.error(`   ${error instanceof Error ? error.message : error}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 Import Summary:');
  console.log(`   ✅ Created: ${created}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`   📈 Success Rate: ${Math.round(created/records.length*100)}%`);
  console.log('='.repeat(70));
  
  console.log('\n✨ Import complete! Your CSV data is now in the database.');
}

importParties()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
