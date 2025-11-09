import { PrismaClient, VerificationStatus } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV columns from ECN PDF extraction
interface ECNPartyCSVRow {
  'सि.नं.': string;                                    // Serial number
  'दर्ता नं.': string;                                // Registration number
  'दलको नाम': string;                                 // Party name (Nepali)
  'निवेदन दर्ता मिति': string;                        // Application date (BS)
  'दल दर्ता मिति': string;                           // Registration date (BS)
  'दलको मुख्य कार्यालय (ठेगाना)': string;             // Headquarters address
  'सम्पर्क टेलिफोन/मोवाइल': string;                   // Contact phones
  'अध्यक्ष/सभापति/महासचिव/संयोजकको नाम': string;      // Leader names
  'चिन्हको नाम': string;                              // Symbol name
  'निर्वाचन चिन्ह': string;                           // Symbol image (emoji/empty)
}

/**
 * Extract province and district from Nepali address
 */
function extractLocation(address: string): { province: string | null, district: string | null } {
  const result = { province: null as string | null, district: null as string | null };
  
  // District patterns (common districts in addresses)
  const districts = [
    'काठमाडौं', 'ललितपुर', 'भक्तपुर', 'धनुषा', 'सुनसरी', 'मोरङ', 'झापा',
    'सर्लाही', 'रौतहट', 'पर्सा', 'चितवन', 'काभ्रे', 'सिन्धुली', 'धादिङ',
    'रसुवा', 'नुवाकोट', 'मकवानपुर', 'सिन्धुपाल्चोक', 'पोखरा', 'कास्की'
  ];
  
  for (const dist of districts) {
    if (address.includes(dist)) {
      result.district = dist;
      break;
    }
  }
  
  // Province mapping based on district (simplified)
  if (result.district) {
    if (['काठमाडौं', 'ललितपुर', 'भक्तपुर', 'चितवन', 'काभ्रे', 'सिन्धुली', 'धादिङ', 'रसुवा', 'नुवाकोट', 'मकवानपुर', 'सिन्धुपाल्चोक'].includes(result.district)) {
      result.province = 'Bagmati';
    } else if (['धनुषा', 'सर्लाही', 'रौतहट', 'पर्सा'].includes(result.district)) {
      result.province = 'Madhesh';
    } else if (['सुनसरी', 'मोरङ', 'झापा'].includes(result.district)) {
      result.province = 'Koshi';
    } else if (['पोखरा', 'कास्की'].includes(result.district)) {
      result.province = 'Gandaki';
    }
  }
  
  return result;
}

/**
 * Parse leadership field which contains mixed information
 * Formats: "अध्यक्षः नाम", "महासचिवः नाम", "संयोजकः नाम", or just "नाम"
 */
function parseLeadership(leaderText: string): {
  chairpersonNepali: string | null;
  generalSecretaryNepali: string | null;
} {
  const result = {
    chairpersonNepali: null as string | null,
    generalSecretaryNepali: null as string | null
  };
  
  // Check for महासचिव (General Secretary)
  const secMatch = leaderText.match(/महासचिव[ः:]\s*([^\n,]+)/);
  if (secMatch) {
    result.generalSecretaryNepali = secMatch[1].trim();
  }
  
  // Check for अध्यक्ष or सभापति or संयोजक (Chairperson/President/Coordinator)
  const chairMatch = leaderText.match(/(?:अध्यक्ष|सभापति|संयोजक)[ः:]\s*([^\n,]+)/);
  if (chairMatch) {
    result.chairpersonNepali = chairMatch[1].trim();
  }
  
  // If no prefix found, assume it's chairperson
  if (!result.chairpersonNepali && !result.generalSecretaryNepali) {
    // Take first name-like string (exclude phones)
    const cleanText = leaderText.replace(/[०-९\d\s,।-]+/g, ' ').trim();
    if (cleanText.length > 3) {
      result.chairpersonNepali = cleanText;
    }
  }
  
  return result;
}

/**
 * Translate common party names to English
 */
function translatePartyName(nepaliName: string): string {
  const translations: { [key: string]: string } = {
    'नेपाली काँग्रेस': 'Nepali Congress',
    'नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी लेलिनवादी)': 'Nepal Communist Party (Unified Marxist-Leninist)',
    'नेपाल कम्युनिष्ट पार्टी (माओवादी केन्द्र)': 'Nepal Communist Party (Maoist Centre)',
    'राष्ट्रिय स्वतन्त्र पार्टी': 'Rastriya Swatantra Party',
    'राष्ट्रिय प्रजातन्त्र पार्टी': 'Rastriya Prajatantra Party',
    'जनता समाजवादी पार्टी, नेपाल': 'Janata Samajwadi Party Nepal',
    'लोकतान्त्रिक समाजवादी पार्टी नेपाल': 'Loktantrik Samajwadi Party Nepal',
    'नागरिक उन्मुक्ति पार्टी': 'Nagarik Unmukti Party',
    'राष्ट्रिय जनमोर्चा': 'Rastriya Janamorcha',
    'नेपाल समाजवादी पार्टी': 'Nepal Samajwadi Party',
  };
  
  return translations[nepaliName] || nepaliName; // Return original if no translation
}

/**
 * Determine if party is "major" based on registration number or known names
 */
function isMajorParty(regNum: string, nepaliName: string): boolean {
  // Major parties typically have low registration numbers or are well-known
  const majorPartyNames = [
    'नेपाली काँग्रेस',
    'नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी लेलिनवादी)',
    'नेपाल कम्युनिष्ट पार्टी (माओवादी केन्द्र)',
    'राष्ट्रिय स्वतन्त्र पार्टी',
    'राष्ट्रिय प्रजातन्त्र पार्टी',
    'जनता समाजवादी पार्टी, नेपाल',
    'लोकतान्त्रिक समाजवादी पार्टी नेपाल',
    'नागरिक उन्मुक्ति पार्टी',
    'राष्ट्रिय जनमोर्चा',
  ];
  
  return majorPartyNames.includes(nepaliName) || parseInt(regNum) <= 50;
}

async function importPartiesFromCSV() {
  console.log('🇳🇵 Importing Political Parties from ECN CSV...\n');

  // Read CSV file (use cleaned version without citation markers)
  const csvPath = path.join(__dirname, '../../data/parties-clean.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    console.log('\n📝 Please ensure CSV file exists at: packages/database/data/parties.csv');
    return;
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  // Parse CSV
  const records: ECNPartyCSVRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true, // Handle UTF-8 BOM
  });

  console.log(`📊 Found ${records.length} parties in CSV\n`);

  let created = 0;
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of records) {
    try {
      const nameNepali = row['दलको नाम']?.trim();
      const regNum = row['दर्ता नं.']?.trim();
      
      // Skip rows without essential data
      if (!nameNepali || nameNepali === '(दलको नाम खाली)') {
        console.log(`⚠️  Skipping row ${row['सि.नं.']}: No party name`);
        skipped++;
        continue;
      }

      // Parse headquarters address
      const headquarters = row['दलको मुख्य कार्यालय (ठेगाना)']?.trim() || null;
      const location = headquarters ? extractLocation(headquarters) : { province: null, district: null };
      
      // Parse leadership
      const leadership = parseLeadership(row['अध्यक्ष/सभापति/महासचिव/संयोजकको नाम'] || '');
      
      // Build party data
      const partyData = {
        name: translatePartyName(nameNepali),
        nameNepali: nameNepali,
        
        registrationNumber: regNum || null,
        applicationDateBs: row['निवेदन दर्ता मिति']?.trim().replace(/\s+/g, '') || null,
        registrationDateBs: row['दल दर्ता मिति']?.trim().replace(/\s+/g, '') || null,
        
        headquarters: headquarters,
        province: location.province,
        district: location.district,
        contactPhone: row['सम्पर्क टेलिफोन/मोवाइल']?.trim() || null,
        
        chairpersonNameNepali: leadership.chairpersonNepali,
        generalSecretaryNameNepali: leadership.generalSecretaryNepali,
        
        symbolNameNepali: row['चिन्हको नाम']?.trim() || null,
        
        isActive: true,
        isMajorParty: regNum ? isMajorParty(regNum, nameNepali) : false,
        dataSource: 'ECN-2080-CSV',
        verificationStatus: VerificationStatus.NEEDS_REVIEW,
      };

      // Upsert using registration number if available, else use Nepali name
      const whereCondition = regNum 
        ? { registrationNumber: regNum }
        : { name: partyData.name };

      const result = await prisma.party.upsert({
        where: whereCondition,
        update: partyData,
        create: partyData,
      });

      // Check if created or updated
      const isNewRecord = result.createdAt.getTime() === result.updatedAt.getTime();
      
      if (isNewRecord) {
        created++;
        console.log(`✅ Created: ${nameNepali} (${regNum || 'no reg'})`);
      } else {
        updated++;
        console.log(`🔄 Updated: ${nameNepali} (${regNum || 'no reg'})`);
      }

    } catch (error) {
      errors++;
      console.error(`❌ Error: ${row['दलको नाम'] || row['सि.नं.']}`);
      console.error(`   ${error instanceof Error ? error.message : error}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 Import Summary:');
  console.log(`   ✅ Created: ${created}`);
  console.log(`   🔄 Updated: ${updated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`   📈 Total Imported: ${created + updated}/${records.length}`);
  console.log('='.repeat(70));
  
  console.log('\n📝 Next Steps:');
  console.log('   1. Review imported parties for accuracy');
  console.log('   2. Add English translations for party/leader names');
  console.log('   3. Upload symbol images and update symbolUrl fields');
  console.log('   4. Verify province/district extraction');
  console.log('   5. Update verificationStatus to VERIFIED after review');
}

importPartiesFromCSV()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
