import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { join } from 'path';

// Common word translations for party names
const WORD_TRANSLATIONS: { [key: string]: string } = {
  // Party types
  'पार्टी': 'Party',
  'दल': 'Dal',
  'मोर्चा': 'Morcha',
  'फोरम': 'Forum',
  'संगठन': 'Organization',
  'अर्गनाइजेशन': 'Organization',
  'सेना': 'Sena',
  'शक्ति': 'Shakti',
  'एकता': 'Ekta',
  'समाज': 'Samaj',
  
  // Political terms
  'नेपाल': 'Nepal',
  'नेपाली': 'Nepali',
  'नेपालका': 'Nepal',
  'राष्ट्रिय': 'Rastriya',
  'राष्ट्रवादी': 'Rashtrawadi',
  'लोकतान्त्रिक': 'Loktantrik',
  'प्रजातन्त्रवादी': 'Prajatantrawadi',
  'प्रजातन्त्रित': 'Prajatantrik',
  'प्रजातान्त्रिक': 'Prajatantrik',
  'समाजवादी': 'Samajwadi',
  'कम्युनिष्ट': 'Communist',
  'कम्यूनिष्ट': 'Communist',
  'काँग्रेस': 'Congress',
  'संघीय': 'Sanghiya',
  'माओवादी': 'Maoist',
  'मार्क्सवादी': 'Marxist',
  'लेनिनवादी': 'Leninist',
  'एकीकृत': 'Ekikrit',
  'जनता': 'Janata',
  'जनवादी': 'Janabadi',
  'आधुनिक': 'Adhunik',
  'मधेश': 'Madhesh',
  'मधेशी': 'Madhesi',
  'तराई': 'Tarai',
  'विकासवादी': 'Bikasbadi',
  'गान्धीवादी': 'Gandhiwadi',
  'नागरिक': 'Nagarik',
  'जनमुक्ति': 'Janmukti',
  'स्वतन्त्र': 'Swatantra',
  'विवेकशील': 'Bibeksheel',
  'साझा': 'Sajha',
  'मातृभूमि': 'Matribhumi',
  'मौलिक': 'Maulik',
  'जरोकिलो': 'Jarokilo',
  'प्रगतिशिल': 'Pragatishil',
  'उन्नत': 'Unnat',
  'बहुजन': 'Bahujan',
  'समावेशी': 'Samabeshi',
  'देशभक्त': 'Deshabhakta',
  'पुनर्जागरण': 'Punarjagaran',
  'हाम्रो': 'Hamro',
  'आम': 'Aam',
  'आमूल': 'Amul',
  'परिवर्तन': 'Paribartan',
  'इतिहासिक': 'Itihasik',
  'मंगोल': 'Mongol',
  'खम्बुवान': 'Khambuwan',
  'अखण्ड': 'Akhand',
  'सुदूरपश्चिम': 'Sudurpashchim',
  'विकास': 'Bikas',
  'संरक्षण': 'Sanrakshan',
  'जनजागरण': 'Janajagaran',
  'नेपालवाद': 'Nepalwad',
  'पिछडावर्ग': 'Pichhādabarga',
  'निषाद': 'Nishad',
  'दलित': 'Dalit',
  'जनजाती': 'Janajati',
  'जनसमाजवादी': 'Janasamajwadi',
  'त्रिमुल': 'Trimul',
  'युवा': 'Yuwa',
  'लोहियावादी': 'Lohiyawadi',
  'रिपब्लिकन': 'Republican',
  'जनमत': 'Janamat',
  'सचेत': 'Sachet',
  'नेश्नलिष्ट': 'Nationalist',
  'पिपल्स': "People's",
  'गौरवशाली': 'Gauravshali',
  'सामाजिक': 'Samajik',
  'उन्मुक्ति': 'Unmukti',
  'जनएकता': 'Janaekta',
  'अभियान': 'Abhiyan',
  'जय': 'Jaya',
  'जन्मभूमि': 'Janmabhumi',
  'केन्द्र': 'Kendra',
  'समता': 'Samata',
  'नेशनल': 'National',
  'रिपब्लिक': 'Republic',
  
  // Adjectives and descriptors
  'मुक्ति': 'Mukti',
  'यथार्थवादी': 'Yathartha wadi',
  'चुरेभावर': 'Chure Bhawar',
  'मुस्कान': 'Muskan',
  'शिव': 'Shiv',
  'मानवतावादी': 'Manab tawadi',
  'मितेरी': 'Miteri',
  'जनप्रिय': 'Janapriya',
  'लोक': 'Lok',
  'नेपाः': 'Newar',
  'सद्भावना': 'Sadbhawana',
  'स‌द्भावना': 'Sadbhawana',
  'जनमुखी': 'Janamukhi',
  'ग्रिन्स': 'Greens',
  'परिवार': 'Pariwar',
  'नौलो': 'Naulo',
  'जनसेवा': 'Janasewa',
  
  // Common brackets and particles
  '(': '(',
  ')': ')',
  'को': '',
  'का': '',
  'लागि': 'Lagi',
  'भित्र': 'Bhitra',
  'माथि': 'Mathi',
  'तल': 'Tala',
};

// Person name parts (common names)
const NAME_TRANSLATIONS: { [key: string]: string } = {
  'नारायणमान': 'Narayan Man',
  'बिजुक्छे': 'Bijukchhe',
  'चन्द्रप्रकाश': 'Chandra Prakash',
  'मैनाली': 'Mainali',
  'लाल': 'Lal',
  'बहादुर': 'Bahadur',
  'राना': 'Rana',
  'देवप्रकाश': 'Dev Prakash',
  'त्रिपाठी': 'Tripathi',
  'मुस्कान': 'Muskan',
  'पौडेल': 'Paudel',
  'भूमिराज': 'Bhumiraja',
  'निरौला': 'Niraula',
  'जयवन्त': 'Jayawanta',
  'विक्रम': 'Vikram',
  'शाह': 'Shah',
  'विष्णु': 'Vishnu',
  'कार्की': 'Karki',
  'मोतीलाल': 'Motilal',
  'भारती': 'Bharati',
  'शरतचन्द्र': 'Sharat Chandra',
  'दाहाल': 'Dahal',
  'वावूकाजी': 'Babukaji',
  'श्रेष्ठ': 'Shrestha',
  'त्रिभूवननाथ': 'Tribhuwannath',
  'पाठक': 'Pathak',
  'राजेन्द्र': 'Rajendra',
  'लिङ्गदेन': 'Lingden',
  'एकनाथ': 'Eknath',
  'ढकाल': 'Dhakal',
  'अमर': 'Amar',
  'प्रसाद': 'Prasad',
  'यादव': 'Yadav',
  'कृष्ण': 'Krishna',
  'गोपाल': 'Gopal',
  'बन्जारा': 'Banjara',
  'गंगा': 'Ganga',
  'भक्त': 'Bhakta',
  'लामा': 'Lama',
  'अम्बिका': 'Ambika',
  'चैव': 'Chaudhary',
  'दोर्जे': 'Dorje',
  'लोकनारायण': 'Loknārāyaṇa',
  'सुवेदी': 'Subedi',
  'भाग्यनाथ': 'Bhagyanath',
  'साह': 'Sah',
  'केपी': 'KP',
  'शर्मा': 'Sharma',
  'ओली': 'Oli',
  'कुमार': 'Kumar',
  'पुष्प': 'Pushpa',
  'कमल': 'Kamal',
  'शेर': 'Sher',
  'देउवा': 'Deuba',
  'चित्र': 'Chitra',
  'के.सी.': 'KC',
  'अनिल': 'Anil',
  'बस्नेत': 'Basnet',
  'विश्वेन्द्र': 'Vishwendra',
  'पासवान': 'Paswan',
  'मेघ': 'Megha',
  'कामी': 'Kami',
  'रामकुमार': 'Ram Kumar',
  'राई': 'Rai',
  'रुक्मिणी': 'Rukmini',
  'चौधरी': 'Chaudhary',
  'गोविन्द': 'Gobinda',
  'हुकुम': 'Hukum',
  'पुजन': 'Pujan',
  'महरा': 'Mahara',
  'मिननाथ': 'Minnath',
  'देवकोटा': 'Devkota',
  'विष्णुराज': 'Vishnu Raj',
  'अर्याल': 'Aryal',
  'हरिचरण': 'Haricharan',
  'उमा': 'Uma',
  'सिङमान': 'Singman',
  'तामाङ': 'Tamang',
  'कौशल': 'Kaushal',
  'सिंह': 'Singh',
  'द्रोण': 'Drona',
  'अधिकारी': 'Adhikari',
  'धनेन्द्र': 'Dhanendra',
  'खगेन्द्र': 'Khagendra',
  'राज': 'Raj',
  'अवस्थी': 'Awasthi',
  'तेज': 'Tej',
  'पाल': 'Pal',
  'निलु': 'Nilu',
  'कुमारी': 'Kumari',
  'विजय': 'Bijaya',
  'सैजु': 'Sayaju',
  'विजेन्द्र': 'Bijendra',
  'जोशी': 'Joshi',
  'खनाल': 'Khanal',
  'किरण': 'Kiran',
  'प्रितम': 'Pritam',
  'मुखिया': 'Mukhiya',
  'शुक्र': 'Shukra',
  'गुरुङ्ग': 'Gurung',
  'गुरुङ': 'Gurung',
  'खड्क': 'Khadka',
  'पालुङ्वा': 'Palungwa',
  'सुवासराज': 'Subas Raj',
  'काफ्ले': 'Kafle',
  'भरतमणि': 'Bharat Mani',
  'श्याम': 'Shyam',
  'थापा': 'Thapa',
  'नन्दन': 'Nandan',
  'यावद': 'Yabada',
  'वद्रि': 'Badri',
  'नारायण': 'Narayan',
  'ठाकुर': 'Thakur',
  'भरत': 'Bharat',
  'गिरी': 'Giri',
  'ज्ञान': 'Gyan',
  'बुद्धलाल': 'Buddha Lal',
  'मेचे': 'Meche',
  'मो.': 'Mohammad',
  'रिजवान': 'Rijwan',
  'अन्सारी': 'Ansari',
  'अशोक': 'Ashok',
  'रुद्रजंग': 'Rudra Jung',
  'पुलामी': 'Pulami',
  'बालकृष्ण': 'Bal Krishna',
  'न्यौपाने': 'Nyaupane',
  'ज्ञानसेर': 'Gyansher',
  'सुशिलमान': 'Sushil Man',
  'शेरचन': 'Sherchan',
  'समिक्षा': 'Samikshya',
  'बासकोटा': 'Baskota',
  'नरेन्द्र': 'Narendra',
  'मान': 'Man',
  'सिं': 'Singh',
  'ओम': 'Om',
  'विश्वकर्मा': 'Bishwakarma',
  'गीता': 'Geeta',
  'क्षेत्री': 'Chhetri',
  'रितेश': 'Ritesh',
  'चन्द्रकान्त': 'Chandrakanta',
  'राउत': 'Raut',
  'शुसिल': 'Sushil',
  'गौतम': 'Gautam',
  'राम': 'Ram',
  'मानध्वज': 'Man Dhwaj',
  'कविता': 'Kabita',
  'भूपि': 'Bhupi',
  'सन्ध्या': 'Sandhya',
  'तिवारी': 'Tiwari',
  'पुण्य': 'Punya',
  'प्रसाई': 'Prasai',
  'इन्द्र': 'Indra',
  'सुदिप': 'Sudip',
  'रूवाली': 'Ruwali',
  'जोगमान': 'Jogman',
  'माधव': 'Madhav',
  'महन्थ': 'Mahantha',
  'हरिनन्दन': 'Harinandan',
  'रंजन': 'Ranjan',
  'युवराज': 'Yubaraj',
  'राजु': 'Raju',
  'नृपेन्द्र': 'Nripendra',
  'भद्र': 'Bhadra',
  'हरि': 'Hari',
  'कर्मा': 'Karma',
  'शंकरकुमार': 'Shankar Kumar',
  'कर्ण': 'Karna',
  'वावुचन्द्र': 'Babu Chandra',
  'प्रभु': 'Prabhu',
  'हृदयेश': 'Hridayesh',
  'चरि': 'Chari',
  'गहतराज': 'Gahatraj',
  'रन्जिता': 'Ranjita',
  'बाबुराम': 'Baburam',
  'भट्टाराई': 'Bhattarai',
  'प्रभाष': 'Prabhas',
  'बस्न्यात': 'Basnyat',
  'भविसोर': 'Bhabisor',
  'पराजुली': 'Parajuli',
  'कर्णजित': 'Karnajit',
  'बुढथोकी': 'Budhathoki',
  'मनमोहन': 'Manmohan',
  'शमशेर': 'Shamsher',
  'लामिछाने': 'Lamichhane',
  'अनन्तराज': 'Ananta Raj',
  'घिमिरे': 'Ghimire',
  'बाबु': 'Babu',
  'बामदेव': 'Bamdev',
  'किसोर': 'Kishor',
  'विश्वास': 'Bishwas',
  'धन': 'Dhan',
  'चन्द्र': 'Chandra',
  'तुलसी': 'Tulasi',
  'थम्मन': 'Thaman',
  'बुढा': 'Budha',
  'मगर': 'Magar',
  'रोमलाल': 'Romlal',
  'उपेन्द्र': 'Upendra',
  'डा.': 'Dr.',
  'श्री': 'Shri',
};

// Symbol translations
const SYMBOL_TRANSLATIONS: { [key: string]: string } = {
  'मादल': 'Madal',
  'हँसिया': 'Sickle',
  'तारा': 'Star',
  'भेडा': 'Sheep',
  'त्रिशुल': 'Trident',
  'पुरूष': 'Man',
  'भकुण्डो': 'Bhakundo',
  'षट्कोण': 'Hexagon',
  'मोटरसाइकल': 'Motorcycle',
  'सुगा': 'Parrot',
  'हिमाल': 'Mountain',
  'कमलको फूल': 'Lotus Flower',
  'हलो': 'Plough',
  'साँचो': 'Key',
  'वाल्टिन': 'Bucket',
  'वाघ': 'Tiger',
  'परेवा': 'Pigeon',
  'धरहरा': 'Dharahara',
  'कोदालो': 'Spade',
  'चर्खा': 'Spinning Wheel',
  'सूर्य': 'Sun',
  'खुकुरी': 'Khukuri',
  'हँसिया हथौडा': 'Sickle and Hammer',
  'रूख': 'Tree',
  'गिलास': 'Glass',
  'डमरू': 'Damaru',
  'जग': 'Jug',
  'इनार': 'Well',
  'हथौडा': 'Hammer',
  'गाग्री': 'Water Pot',
  'भुइकटहर': 'Jackfruit',
  'डोको': 'Basket',
  'हौस': 'Mortar',
  'धारा': 'Water Tap',
  'सुकुन्दा': 'Sukunda',
  'गोरू गाडाको चक्का': 'Bullock Cart Wheel',
  'बज': 'Vajra',
  'कल': 'Sewing Machine',
  'जरायो': 'Pliers',
  'घोडा': 'Horse',
  'चियादानी': 'Teapot',
  'पुल': 'Bridge',
  'हात्ती': 'Elephant',
  'खङ्ग': 'Sword',
  'औठी': 'Ring',
  'टर्चलाइट': 'Torch',
  'तारापुञ्ज': 'Star Cluster',
  'कछुवा': 'Turtle',
  'चङ्गा': 'Kite',
  'घर': 'House',
  'पाँच कुने तारा': 'Five Pointed Star',
  'ओदान': 'Mortar',
  'चस्मा': 'Spectacles',
  'मेच': 'Match',
  'ट्र्याक्टर': 'Tractor',
  'प्रेम': 'Love',
  'गैंडा': 'Rhino',
  'कुखुराको भाले': 'Rooster',
  'बस': 'Bus',
  'पृथ्वी': 'Earth',
  'शंड': 'Bull',
  'हवाईजहाज': 'Airplane',
  'करूवा': 'Pot',
  'तराज्': 'Scale',
  'अधिनो': 'Hearth',
  'रथ': 'Chariot',
  'दियो': 'Lamp',
  'नमस्कार': 'Namaste',
  'रेडियो': 'Radio',
  'तीर': 'Arrow',
  'लाउड स्पिकर': 'Loudspeaker',
  'कम्प्युटर': 'Computer',
  'किसान': 'Farmer',
  'गैती': 'Pickaxe',
  'पञ्जा छाप': 'Hand Print',
  'ढाका टोपी': 'Dhaka Topi',
  'कुचो': 'Broom',
  'छाता': 'Umbrella',
  'नाग': 'Snake',
  'सिंह': 'Lion',
  'लाटोकोसेरो': 'Candle',
  'चन्द्रमा': 'Moon',
  'डम्फु': 'Drum',
  'कलम': 'Pen',
  'साइकल': 'Bicycle',
  'भन्याइ': 'Ladle',
  'मयुर': 'Peacock',
  'कार': 'Car',
  'गदा': 'Mace',
  'किताब': 'Book',
  'मसाल': 'Torch',
  'कुकुरको टाउको': 'Dog Head',
  'गाग्रोमा': 'Pot',
  'नरिवल': 'Coconut',
  'रुद्राक्षको दाना': 'Rudraksha Bead',
  'मोवाइल': 'Mobile',
  'गितार': 'Guitar',
  'ढकिया': 'Lid',
  'आँखा': 'Eye',
  'पैताला छाप': 'Footprint',
  'स्याउ': 'Apple',
  'महिला पुरुष': 'Man Woman',
  'ताला': 'Lock',
  'घण्टी': 'Bell',
  'लौरो': 'Stick',
  'मैनवत्ती': 'Candle',
  'धानका बाला': 'Rice Sheaves',
  'घडी': 'Clock',
  'छत्रे टोपी': 'Umbrella Hat',
  'लालटिन': 'Lantern',
  'धनुष': 'Bow',
  'सयपत्री फूल': 'Chrysanthemum',
  'माहुरी': 'Bee',
  'आमा': 'Mother',
};

function translateText(text: string, isSymbol = false, isPerson = false): string {
  if (!text || text.trim() === '') return '';
  
  // If already has English text or starts with English, return as is
  if (/^[A-Za-z]/.test(text)) return text;
  
  let translated = text;
  
  // Choose appropriate dictionary
  const dict = isSymbol ? SYMBOL_TRANSLATIONS : 
               isPerson ? { ...NAME_TRANSLATIONS, ...WORD_TRANSLATIONS } :
               WORD_TRANSLATIONS;
  
  // Try direct translation first
  if (dict[text]) {
    return dict[text];
  }
  
  // Word by word translation
  const words = text.split(/\s+/);
  translated = words.map(word => {
    // Remove punctuation for lookup
    const cleanWord = word.replace(/[().,।]/g, '');
    return dict[cleanWord] || word;
  }).join(' ');
  
  // Clean up extra spaces
  translated = translated.replace(/\s+/g, ' ').trim();
  
  return translated;
}

async function translateNames() {
  console.log('🌐 Translating Nepali names to English...\n');

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

  let translatedCount = 0;
  let skippedCount = 0;

  // Translate
  const updatedRecords = records.map((record: any, index: number) => {
    let hasTranslations = false;

    // Translate party name
    if (record.nameNepali && !record.name) {
      const translated = translateText(record.nameNepali);
      if (translated !== record.nameNepali) {
        record.name = translated;
        hasTranslations = true;
      }
    }

    // Translate chairperson name
    if (record.chairpersonNameNepali && !record.chairpersonName) {
      const translated = translateText(record.chairpersonNameNepali, false, true);
      if (translated !== record.chairpersonNameNepali) {
        record.chairpersonName = translated;
        hasTranslations = true;
      }
    }

    // Translate general secretary name
    if (record.generalSecretaryNameNepali && !record.generalSecretaryName) {
      const translated = translateText(record.generalSecretaryNameNepali, false, true);
      if (translated !== record.generalSecretaryNameNepali) {
        record.generalSecretaryName = translated;
        hasTranslations = true;
      }
    }

    // Translate symbol name
    if (record.symbolNameNepali && !record.symbolName) {
      const translated = translateText(record.symbolNameNepali, true);
      if (translated !== record.symbolNameNepali) {
        record.symbolName = translated;
        hasTranslations = true;
      }
    }

    if (hasTranslations) {
      translatedCount++;
      console.log(`✅ [${index + 1}/${records.length}] ${record.nameNepali}`);
      if (record.name) console.log(`   Party: ${record.name}`);
      if (record.chairpersonName) console.log(`   Chair: ${record.chairpersonName}`);
      if (record.symbolName) console.log(`   Symbol: ${record.symbolName}`);
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

  console.log(`\n✅ Translation complete!`);
  console.log(`📊 Summary:`);
  console.log(`   Parties with translations: ${translatedCount}`);
  console.log(`   Parties skipped (already translated): ${skippedCount}`);
  console.log(`\n📁 File updated: ${csvPath}`);
  console.log(`\n⚠️  Note: Some translations may need manual review and correction.`);
}

translateNames().catch(console.error);
