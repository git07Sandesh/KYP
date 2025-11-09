import { PrismaClient, GovernmentLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function seedReferenceData() {
  console.log('🌱 PHASE 1: Seeding Static Reference Data...\n');

  // ======================
  // 1. PROVINCES (7)
  // ======================
  console.log('📍 Seeding provinces...');
  
  const provinceData = [
    { code: 'P1', name: 'Koshi Province', nameNepali: 'कोशी प्रदेश' },
    { code: 'P2', name: 'Madhesh Province', nameNepali: 'मधेश प्रदेश' },
    { code: 'P3', name: 'Bagmati Province', nameNepali: 'बागमती प्रदेश' },
    { code: 'P4', name: 'Gandaki Province', nameNepali: 'गण्डकी प्रदेश' },
    { code: 'P5', name: 'Lumbini Province', nameNepali: 'लुम्बिनी प्रदेश' },
    { code: 'P6', name: 'Karnali Province', nameNepali: 'कर्णाली प्रदेश' },
    { code: 'P7', name: 'Sudurpashchim Province', nameNepali: 'सुदूरपश्चिम प्रदेश' },
  ];

  const provinces = [];
  for (const p of provinceData) {
    const province = await prisma.province.upsert({
      where: { code: p.code },
      update: {},
      create: p,
    });
    provinces.push(province);
  }
  console.log(`✅ Created ${provinces.length} provinces\n`);

  // ======================
  // 2. DISTRICTS (77)
  // ======================
  console.log('📍 Seeding all 77 districts...');

  const districtsByProvince: Record<string, string[]> = {
    'P1': [ // Koshi Province (14 districts)
      'Bhojpur', 'Dhankuta', 'Ilam', 'Jhapa', 'Khotang', 'Morang',
      'Okhaldhunga', 'Panchthar', 'Sankhuwasabha', 'Solukhumbu',
      'Sunsari', 'Taplejung', 'Terhathum', 'Udayapur'
    ],
    'P2': [ // Madhesh Province (8 districts)
      'Bara', 'Dhanusha', 'Mahottari', 'Parsa', 'Rautahat',
      'Saptari', 'Sarlahi', 'Siraha'
    ],
    'P3': [ // Bagmati Province (13 districts)
      'Bhaktapur', 'Chitwan', 'Dhading', 'Dolakha', 'Kathmandu',
      'Kavrepalanchok', 'Lalitpur', 'Makwanpur', 'Nuwakot',
      'Ramechhap', 'Rasuwa', 'Sindhuli', 'Sindhupalchok'
    ],
    'P4': [ // Gandaki Province (11 districts)
      'Baglung', 'Gorkha', 'Kaski', 'Lamjung', 'Manang', 'Mustang',
      'Myagdi', 'Nawalparasi East', 'Parbat', 'Syangja', 'Tanahun'
    ],
    'P5': [ // Lumbini Province (12 districts)
      'Arghakhanchi', 'Banke', 'Bardiya', 'Dang', 'Gulmi', 'Kapilvastu',
      'Nawalparasi West', 'Palpa', 'Pyuthan', 'Rolpa', 'Rukum East', 'Rupandehi'
    ],
    'P6': [ // Karnali Province (10 districts)
      'Dailekh', 'Dolpa', 'Humla', 'Jajarkot', 'Jumla', 'Kalikot',
      'Mugu', 'Rukum West', 'Salyan', 'Surkhet'
    ],
    'P7': [ // Sudurpashchim Province (9 districts)
      'Achham', 'Baitadi', 'Bajhang', 'Bajura', 'Dadeldhura',
      'Darchula', 'Doti', 'Kailali', 'Kanchanpur'
    ],
  };

  let totalDistricts = 0;
  for (const [code, districtNames] of Object.entries(districtsByProvince)) {
    const province = provinces.find(p => p.code === code);
    if (!province) continue;

    for (const name of districtNames) {
      await prisma.district.upsert({
        where: {
          provinceId_name: {
            provinceId: province.id,
            name: name,
          },
        },
        update: {},
        create: {
          name: name,
          nameNepali: name, // TODO: Add Nepali names from official source
          provinceId: province.id,
        },
      });
      totalDistricts++;
    }
  }
  console.log(`✅ Created ${totalDistricts} districts\n`);

  // ======================
  // 3. FEDERAL CONSTITUENCIES (165 total)
  // ======================
  console.log('📍 Seeding federal constituencies...');

  // Federal constituency counts by district (based on Wikipedia/ECN official data)
  // Source: https://en.wikipedia.org/wiki/Constituencies_of_Nepal
  // Total: 165 federal constituencies
  const federalConstituencyCount: Record<string, number> = {
    // Koshi Province (P1) - 28 constituencies
    'Bhojpur': 1,
    'Dhankuta': 1,
    'Ilam': 2,
    'Jhapa': 5,
    'Khotang': 1,
    'Morang': 6,
    'Okhaldhunga': 1,
    'Panchthar': 1,
    'Sankhuwasabha': 1,
    'Solukhumbu': 1,
    'Sunsari': 4,
    'Taplejung': 1,
    'Terhathum': 1,
    'Udayapur': 2,

    // Madhesh Province (P2) - 32 constituencies
    'Bara': 4,
    'Dhanusha': 4,
    'Mahottari': 4,
    'Parsa': 4,
    'Rautahat': 4,
    'Saptari': 4,
    'Sarlahi': 4,
    'Siraha': 4,

    // Bagmati Province (P3) - 33 constituencies
    'Bhaktapur': 2,
    'Chitwan': 3,
    'Dhading': 2,
    'Dolakha': 1,
    'Kathmandu': 10,
    'Kavrepalanchok': 2,
    'Lalitpur': 3,
    'Makwanpur': 2,
    'Nuwakot': 2,
    'Ramechhap': 1,
    'Rasuwa': 1,
    'Sindhuli': 2,
    'Sindhupalchok': 2,

    // Gandaki Province (P4) - 18 constituencies
    'Baglung': 2,
    'Gorkha': 2,
    'Kaski': 3,
    'Lamjung': 1,
    'Manang': 1,
    'Mustang': 1,
    'Myagdi': 1,
    'Nawalparasi East': 2,
    'Parbat': 1,
    'Syangja': 2,
    'Tanahun': 2,

    // Lumbini Province (P5) - 26 constituencies
    'Arghakhanchi': 1,
    'Banke': 3,
    'Bardiya': 2,
    'Dang': 3,
    'Gulmi': 2,
    'Kapilvastu': 3,
    'Nawalparasi West': 2,
    'Palpa': 2,
    'Pyuthan': 1,
    'Rolpa': 1,
    'Rukum East': 1,
    'Rupandehi': 5,

    // Karnali Province (P6) - 12 constituencies
    'Dailekh': 2,
    'Dolpa': 1,
    'Humla': 1,
    'Jajarkot': 1,
    'Jumla': 1,
    'Kalikot': 1,
    'Mugu': 1,
    'Rukum West': 1,
    'Salyan': 1,
    'Surkhet': 2,

    // Sudurpashchim Province (P7) - 16 constituencies
    'Achham': 2,
    'Baitadi': 1,
    'Bajhang': 1,
    'Bajura': 1,
    'Dadeldhura': 1,
    'Darchula': 1,
    'Doti': 1,
    'Kailali': 5,
    'Kanchanpur': 3,
  };

  let totalConstituencies = 0;
  
  for (const [districtName, count] of Object.entries(federalConstituencyCount)) {
    const district = await prisma.district.findFirst({
      where: { name: districtName },
      include: { province: true },
    });

    if (!district || !district.province) {
      console.warn(`⚠️  District not found: ${districtName}`);
      continue;
    }

    for (let i = 1; i <= count; i++) {
      await prisma.constituency.upsert({
        where: {
          provinceId_districtId_constituencyNumber_level: {
            provinceId: district.provinceId,
            districtId: district.id,
            constituencyNumber: i,
            level: GovernmentLevel.FEDERAL,
          },
        },
        update: {},
        create: {
          name: `${districtName}-${i}`,
          nameNepali: `${districtName}-${i}`, // TODO: Add proper Nepali names
          constituencyNumber: i,
          level: GovernmentLevel.FEDERAL,
          provinceId: district.provinceId,
          districtId: district.id,
        },
      });
      totalConstituencies++;
    }
  }
  
  console.log(`✅ Created ${totalConstituencies} federal constituencies\n`);

  // ======================
  // VERIFICATION
  // ======================
  console.log('🔍 Verifying data...');
  
  const provinceCount = await prisma.province.count();
  const districtCount = await prisma.district.count();
  const constituencyCount = await prisma.constituency.count({
    where: { level: GovernmentLevel.FEDERAL },
  });

  console.log('\n✨ PHASE 1 COMPLETE!\n');
  console.log('📊 Summary:');
  console.log(`   ✅ Provinces:            ${provinceCount}/7`);
  console.log(`   ✅ Districts:            ${districtCount}/77`);
  console.log(`   ✅ Federal Constituencies: ${constituencyCount}/165\n`);

  if (provinceCount !== 7 || districtCount !== 77 || constituencyCount !== 165) {
    console.warn('⚠️  Warning: Some data may be incomplete!');
  } else {
    console.log('🎉 All reference data populated successfully!');
  }

  console.log('\n🚀 Next Steps:');
  console.log('   1. Verify data in Prisma Studio: npx prisma studio');
  console.log('   2. Run Phase 2: Political Parties');
  console.log('   3. Run Phase 3: Candidates\n');
}

seedReferenceData()
  .catch((e) => {
    console.error('❌ Error seeding reference data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
