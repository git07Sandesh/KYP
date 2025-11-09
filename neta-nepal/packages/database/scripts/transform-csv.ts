import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Old CSV columns (from your current parties.csv):
// 0: सि.नं. (Serial Number)
// 1: दर्ता नं. (Registration Number)
// 2: दलको नाम (Party Name in Nepali)
// 3: निवेदन दर्ता मिति (Application Date BS)
// 4: दल दर्ता मिति (Registration Date BS)
// 5: दलको मुख्य कार्यालय (ठेगाना) (Headquarters)
// 6: सम्पर्क टेलिफोन/मोवाइल (Contact Phone)
// 7: अध्यक्ष/सभापति/महासचिव/संयोजकको नाम (Chairperson/General Secretary Name)
// 8: चिन्हको नाम (Symbol Name)
// 9: निर्वाचन चिन्ह (Symbol character/image)

// Helper function to clean citation markers
function cleanText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\[cite_start\]/g, '')
    .replace(/\[cite:\s*\d+\]/g, '')
    .replace(/\[cite:\d+\]/g, '')
    .trim();
}

// Helper function to convert BS date format from "२०७३।७।३" to "2073-07-03"
function convertBsDate(dateStr: string): string {
  if (!dateStr) return '';
  
  // Clean the date string
  const cleaned = cleanText(dateStr);
  if (!cleaned) return '';
  
  // Convert Nepali numerals to English
  const nepaliToEnglish: { [key: string]: string } = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };
  
  let englishDate = cleaned;
  for (const [nepali, english] of Object.entries(nepaliToEnglish)) {
    englishDate = englishDate.replace(new RegExp(nepali, 'g'), english);
  }
  
  // Convert "2073.7.3" format to "2073-07-03"
  const parts = englishDate.split(/[।.]/);
  if (parts.length === 3) {
    const year = parts[0].padStart(4, '0');
    const month = parts[1].padStart(2, '0');
    const day = parts[2].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  return '';
}

// Helper function to convert Nepali registration number to English
function convertRegNumber(regNum: string): string {
  if (!regNum) return '';
  
  const nepaliToEnglish: { [key: string]: string } = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };
  
  let englishNum = regNum;
  for (const [nepali, english] of Object.entries(nepaliToEnglish)) {
    englishNum = englishNum.replace(new RegExp(nepali, 'g'), english);
  }
  
  return englishNum;
}

// Helper function to extract location info (province, district)
function extractLocation(headquarters: string): { province: string; district: string } {
  const hq = headquarters.toLowerCase();
  
  // Common districts
  const districtMap: { [key: string]: { district: string; province: string } } = {
    'काठमाडौं': { district: 'Kathmandu', province: 'Bagmati' },
    'भक्तपुर': { district: 'Bhaktapur', province: 'Bagmati' },
    'ललितपुर': { district: 'Lalitpur', province: 'Bagmati' },
    'धनुषा': { district: 'Dhanusha', province: 'Madhesh' },
    'रौतहट': { district: 'Rautahat', province: 'Madhesh' },
    'सर्लाही': { district: 'Sarlahi', province: 'Madhesh' },
    'पर्सा': { district: 'Parsa', province: 'Madhesh' },
    'सुनसरी': { district: 'Sunsari', province: 'Koshi' },
    'मोरङ': { district: 'Morang', province: 'Koshi' },
  };
  
  for (const [nepaliName, location] of Object.entries(districtMap)) {
    if (hq.includes(nepaliName)) {
      return location;
    }
  }
  
  return { province: '', district: '' };
}

// Helper function to parse chairperson name
function parseChairperson(nameField: string): { name: string; nameNepali: string } {
  const cleaned = cleanText(nameField);
  
  // Remove titles like "अध्यक्षः", "सभापतिः", "महासचिवः", "संयोजकः"
  const withoutTitle = cleaned
    .replace(/^(अध्यक्षः|सभापतिः|महासचिवः|संयोजकः|प्रेसिडेण्टः)\s*/i, '')
    .trim();
  
  // For now, keep Nepali name as is (you can add translation later)
  return {
    name: '', // Leave empty for manual translation
    nameNepali: withoutTitle
  };
}

// Helper function to parse general secretary (if mentioned)
function parseGeneralSecretary(nameField: string): { name: string; nameNepali: string } {
  const cleaned = cleanText(nameField);
  
  // Only extract if explicitly mentions "महासचिव"
  if (cleaned.includes('महासचिवः')) {
    const withoutTitle = cleaned
      .replace(/^.*महासचिवः\s*/i, '')
      .trim();
    
    return {
      name: '', // Leave empty for manual translation
      nameNepali: withoutTitle
    };
  }
  
  return { name: '', nameNepali: '' };
}

async function transformCsv() {
  console.log('🔄 Starting CSV transformation...\n');
  
  // Read old CSV
  const oldCsvPath = join(__dirname, '..', 'data', 'parties.csv');
  let oldCsvContent = readFileSync(oldCsvPath, 'utf-8');
  
  // Clean citation markers from CSV content
  console.log('🧹 Cleaning citation markers...');
  oldCsvContent = oldCsvContent
    .replace(/\[cite_start\]/g, '')
    .replace(/\[cite:\s*\d+\]/g, '')
    .replace(/\[cite:\d+\]/g, '');
  
  // Parse old CSV
  const records = parse(oldCsvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
    relaxColumnCount: true,
    relax_quotes: true,
  });
  
  console.log(`📊 Found ${records.length} parties in old CSV\n`);
  
  // Transform to new format
  const newRecords = records.map((record: any, index: number) => {
    const serialNum = cleanText(record['सि.नं.']);
    const regNum = cleanText(record['दर्ता नं.']);
    const partyNameNepali = cleanText(record['दलको नाम']);
    const applicationDateBs = convertBsDate(record['निवेदन दर्ता मिति']);
    const registrationDateBs = convertBsDate(record['दल दर्ता मिति']);
    const headquarters = cleanText(record['दलको मुख्य कार्यालय (ठेगाना)']);
    const contactPhone = cleanText(record['सम्पर्क टेलिफोन/मोवाइल']);
    const leadershipField = cleanText(record['अध्यक्ष/सभापति/महासचिव/संयोजकको नाम']);
    const symbolNameNepali = cleanText(record['चिन्हको नाम']);
    const symbolChar = cleanText(record['निर्वाचन चिन्ह']);
    
    // Extract location
    const location = extractLocation(headquarters);
    
    // Parse leadership
    const chairperson = parseChairperson(leadershipField);
    const generalSecretary = parseGeneralSecretary(leadershipField);
    
    // Convert registration number
    const registrationNumber = convertRegNumber(regNum);
    
    console.log(`[${index + 1}/${records.length}] ${partyNameNepali} (Reg #${registrationNumber})`);
    
    // Return new format (33 columns)
    return {
      name: '', // Leave empty for manual translation
      nameNepali: partyNameNepali,
      shortName: '',
      shortNameNepali: '',
      registrationNumber: registrationNumber,
      applicationDateBs: applicationDateBs,
      applicationDateAd: '', // Leave empty (requires BS to AD conversion)
      registrationDateBs: registrationDateBs,
      registrationDateAd: '', // Leave empty (requires BS to AD conversion)
      renewalDateBs: '',
      renewalDateAd: '',
      headquarters: headquarters,
      province: location.province,
      district: location.district,
      contactPhone: contactPhone,
      contactEmail: '',
      chairpersonName: chairperson.name,
      chairpersonNameNepali: chairperson.nameNepali,
      generalSecretaryName: generalSecretary.name,
      generalSecretaryNameNepali: generalSecretary.nameNepali,
      symbolName: '', // Leave empty for manual translation
      symbolNameNepali: symbolNameNepali,
      symbolUrl: '',
      symbolDescription: symbolChar,
      foundedYear: '',
      website: '',
      ideology: '',
      isActive: 'true',
      isMajorParty: 'false', // You can manually mark major parties later
      dataSource: 'ECN-2080-CSV',
      verificationStatus: 'NEEDS_REVIEW',
      verifiedAt: '',
      verifiedBy: ''
    };
  });
  
  // Generate new CSV
  const newCsv = stringify(newRecords, {
    header: true,
    columns: [
      'name', 'nameNepali', 'shortName', 'shortNameNepali', 'registrationNumber',
      'applicationDateBs', 'applicationDateAd', 'registrationDateBs', 'registrationDateAd',
      'renewalDateBs', 'renewalDateAd', 'headquarters', 'province', 'district',
      'contactPhone', 'contactEmail', 'chairpersonName', 'chairpersonNameNepali',
      'generalSecretaryName', 'generalSecretaryNameNepali', 'symbolName', 'symbolNameNepali',
      'symbolUrl', 'symbolDescription', 'foundedYear', 'website', 'ideology',
      'isActive', 'isMajorParty', 'dataSource', 'verificationStatus', 'verifiedAt', 'verifiedBy'
    ],
    quoted: true,
  });
  
  // Save new CSV
  const newCsvPath = join(__dirname, '..', 'data', 'parties-transformed.csv');
  writeFileSync(newCsvPath, '\ufeff' + newCsv, 'utf-8'); // UTF-8 with BOM
  
  console.log(`\n✅ Transformation complete!`);
  console.log(`📁 New CSV saved to: ${newCsvPath}`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Review the transformed CSV`);
  console.log(`   2. Fill in empty fields (name, shortName, symbolName, etc.)`);
  console.log(`   3. Manually translate Nepali names to English`);
  console.log(`   4. Convert BS dates to AD dates if needed`);
  console.log(`   5. Mark major parties (set isMajorParty to 'true')`);
  console.log(`   6. Rename to 'parties.csv' when ready`);
  console.log(`   7. Run: npx tsx prisma/seeds/02-import-parties.ts`);
}

transformCsv().catch(console.error);
