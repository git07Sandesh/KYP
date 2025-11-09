import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { join } from 'path';

// Major parties based on 2022 election results and political significance
const MAJOR_PARTIES = [
  'नेपाली काँग्रेस', // Nepali Congress
  'नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी लेलिनवादी)', // CPN-UML
  'नेपाल कम्युनिष्ट पार्टी (माओवादी केन्द्र)', // CPN-Maoist Centre
  'राष्ट्रिय स्वतन्त्र पार्टी', // Rastriya Swatantra Party
  'राष्ट्रिय प्रजातन्त्र पार्टी नेपाल', // RPP Nepal
  'नेपाल कम्युनिष्ट पार्टी (एकीकृत समाजवादी)', // CPN-Unified Socialist
  'जनता समाजवादी पार्टी, नेपाल', // Janata Samajwadi Party Nepal
  'लोकतान्त्रिक समाजवादी पार्टी नेपाल', // Loktantrik Samajwadi Party
  'राष्ट्रिय जनमोर्चा', // Rastriya Janamorcha
];

// English translations for major parties
const PARTY_TRANSLATIONS: { [key: string]: { name: string; shortName: string } } = {
  'नेपाली काँग्रेस': { name: 'Nepali Congress', shortName: 'NC' },
  'नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी लेलिनवादी)': { name: 'Communist Party of Nepal (Unified Marxist-Leninist)', shortName: 'CPN-UML' },
  'नेपाल कम्युनिष्ट पार्टी (माओवादी केन्द्र)': { name: 'Communist Party of Nepal (Maoist Centre)', shortName: 'CPN-MC' },
  'राष्ट्रिय स्वतन्त्र पार्टी': { name: 'Rastriya Swatantra Party', shortName: 'RSP' },
  'राष्ट्रिय प्रजातन्त्र पार्टी नेपाल': { name: 'Rastriya Prajatantra Party Nepal', shortName: 'RPP-N' },
  'नेपाल कम्युनिष्ट पार्टी (एकीकृत समाजवादी)': { name: 'Communist Party of Nepal (Unified Socialist)', shortName: 'CPN-US' },
  'जनता समाजवादी पार्टी, नेपाल': { name: 'Janata Samajwadi Party Nepal', shortName: 'JSP' },
  'लोकतान्त्रिक समाजवादी पार्टी नेपाल': { name: 'Loktantrik Samajwadi Party Nepal', shortName: 'LSP' },
  'राष्ट्रिय जनमोर्चा': { name: 'Rastriya Janamorcha', shortName: 'RJM' },
};

async function markMajorParties() {
  console.log('🔍 Identifying and marking major parties...\n');
  
  const csvPath = join(__dirname, '..', 'data', 'parties-transformed.csv');
  const csvContent = readFileSync(csvPath, 'utf-8');
  
  // Parse CSV
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });
  
  let majorPartyCount = 0;
  let translatedCount = 0;
  
  // Update records
  const updatedRecords = records.map((record: any) => {
    const nameNepali = record.nameNepali;
    
    // Check if this is a major party
    if (MAJOR_PARTIES.includes(nameNepali)) {
      record.isMajorParty = 'true';
      majorPartyCount++;
      
      // Add English translation if available
      const translation = PARTY_TRANSLATIONS[nameNepali];
      if (translation) {
        record.name = translation.name;
        record.shortName = translation.shortName;
        translatedCount++;
        console.log(`✅ ${nameNepali}`);
        console.log(`   → ${translation.name} (${translation.shortName})`);
      }
    }
    
    return record;
  });
  
  // Generate updated CSV
  const updatedCsv = stringify(updatedRecords, {
    header: true,
    quoted: true,
  });
  
  // Save
  writeFileSync(csvPath, '\ufeff' + updatedCsv, 'utf-8');
  
  console.log(`\n📊 Summary:`);
  console.log(`   Major parties marked: ${majorPartyCount}`);
  console.log(`   Translations added: ${translatedCount}`);
  console.log(`\n✅ File updated: ${csvPath}`);
}

markMajorParties().catch(console.error);
