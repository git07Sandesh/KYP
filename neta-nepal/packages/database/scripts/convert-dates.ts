import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { join } from 'path';
import NepaliDate from 'nepali-date-converter';

/**
 * Convert BS date string (YYYY-MM-DD) to AD date string (YYYY-MM-DD)
 */
function convertBsToAd(bsDate: string): string {
  if (!bsDate || bsDate.trim() === '') {
    return '';
  }

  try {
    // Parse BS date
    const parts = bsDate.split('-');
    if (parts.length !== 3) {
      console.log(`⚠️  Invalid date format: ${bsDate}`);
      return '';
    }

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    // Validate
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      console.log(`⚠️  Invalid date values: ${bsDate}`);
      return '';
    }

    // Create Nepali date and convert to AD
    const nepaliDate = new NepaliDate(year, month - 1, day);
    const adDate = nepaliDate.toJsDate();

    // Format as YYYY-MM-DD
    const adYear = adDate.getFullYear();
    const adMonth = String(adDate.getMonth() + 1).padStart(2, '0');
    const adDay = String(adDate.getDate()).padStart(2, '0');

    return `${adYear}-${adMonth}-${adDay}`;
  } catch (error) {
    console.log(`⚠️  Error converting ${bsDate}:`, error instanceof Error ? error.message : 'Unknown error');
    return '';
  }
}

async function convertDates() {
  console.log('📅 Converting BS dates to AD dates...\n');

  const csvPath = join(__dirname, '..', 'data', 'parties-transformed.csv');
  const csvContent = readFileSync(csvPath, 'utf-8');

  // Parse CSV
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });

  console.log(`📊 Found ${records.length} parties\n`);

  let convertedCount = 0;
  let skippedCount = 0;

  // Convert dates
  const updatedRecords = records.map((record: any, index: number) => {
    const partyName = record.nameNepali || record.name || `Party #${index + 1}`;
    let hasConversions = false;

    // Convert application date
    if (record.applicationDateBs && !record.applicationDateAd) {
      const adDate = convertBsToAd(record.applicationDateBs);
      if (adDate) {
        record.applicationDateAd = adDate;
        hasConversions = true;
      }
    }

    // Convert registration date
    if (record.registrationDateBs && !record.registrationDateAd) {
      const adDate = convertBsToAd(record.registrationDateBs);
      if (adDate) {
        record.registrationDateAd = adDate;
        hasConversions = true;
      }
    }

    // Skip renewal dates as requested
    // record.renewalDateBs and record.renewalDateAd will remain empty

    if (hasConversions) {
      convertedCount++;
      console.log(`✅ [${index + 1}/${records.length}] ${partyName}`);
      if (record.applicationDateAd) {
        console.log(`   Application: ${record.applicationDateBs} → ${record.applicationDateAd}`);
      }
      if (record.registrationDateAd) {
        console.log(`   Registration: ${record.registrationDateBs} → ${record.registrationDateAd}`);
      }
    } else {
      skippedCount++;
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

  console.log(`\n✅ Date conversion complete!`);
  console.log(`📊 Summary:`);
  console.log(`   Parties with dates converted: ${convertedCount}`);
  console.log(`   Parties skipped (no dates or already converted): ${skippedCount}`);
  console.log(`\n📁 File updated: ${csvPath}`);
}

convertDates().catch(console.error);
