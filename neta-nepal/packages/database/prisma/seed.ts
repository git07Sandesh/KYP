import { PrismaClient, UserRole, GovernmentLevel, Gender, CandidateStatus, PromiseCategory, PromiseType, PromiseStatus, WorkCategory, ImpactLevel, CaseStatus, RumorSource, SourceTier, RankingCategory } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // 1. Create Users
  console.log('Creating users...')
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@netanepal.org' },
    update: {},
    create: {
      email: 'admin@netanepal.org',
      name: 'Admin User',
      password: await bcrypt.hash('admin123', 12),
      role: UserRole.ADMIN,
    },
  })

  const moderatorUser = await prisma.user.upsert({
    where: { email: 'moderator@netanepal.org' },
    update: {},
    create: {
      email: 'moderator@netanepal.org',
      name: 'Moderator User',
      password: await bcrypt.hash('moderator123', 12),
      role: UserRole.MODERATOR,
    },
  })

  console.log('✅ Users created')

  // 2. Create Provinces
  console.log('Creating provinces...')
  const provinces = await Promise.all([
    prisma.province.create({
      data: { name: 'Koshi Province', nameNepali: 'कोशी प्रदेश', code: 'P1' },
    }),
    prisma.province.create({
      data: { name: 'Madhesh Province', nameNepali: 'मधेश प्रदेश', code: 'P2' },
    }),
    prisma.province.create({
      data: { name: 'Bagmati Province', nameNepali: 'बागमती प्रदेश', code: 'P3' },
    }),
    prisma.province.create({
      data: { name: 'Gandaki Province', nameNepali: 'गण्डकी प्रदेश', code: 'P4' },
    }),
    prisma.province.create({
      data: { name: 'Lumbini Province', nameNepali: 'लुम्बिनी प्रदेश', code: 'P5' },
    }),
    prisma.province.create({
      data: { name: 'Karnali Province', nameNepali: 'कर्णाली प्रदेश', code: 'P6' },
    }),
    prisma.province.create({
      data: { name: 'Sudurpashchim Province', nameNepali: 'सुदूरपश्चिम प्रदेश', code: 'P7' },
    }),
  ])

  console.log('✅ Provinces created')

  // 3. Create Districts
  console.log('Creating districts...')
  const kathmandu = await prisma.district.create({
    data: { name: 'Kathmandu', nameNepali: 'काठमाडौं', provinceId: provinces[2].id },
  })

  const lalitpur = await prisma.district.create({
    data: { name: 'Lalitpur', nameNepali: 'ललितपुर', provinceId: provinces[2].id },
  })

  const bhaktapur = await prisma.district.create({
    data: { name: 'Bhaktapur', nameNepali: 'भक्तपुर', provinceId: provinces[2].id },
  })

  const morang = await prisma.district.create({
    data: { name: 'Morang', nameNepali: 'मोरङ', provinceId: provinces[0].id },
  })

  console.log('✅ Districts created')

  // 4. Create Constituencies
  console.log('Creating constituencies...')
  const constituencies = await Promise.all([
    prisma.constituency.create({
      data: {
        name: 'Kathmandu-1',
        nameNepali: 'काठमाडौं-१',
        constituencyNumber: 1,
        level: GovernmentLevel.FEDERAL,
        provinceId: provinces[2].id,
        districtId: kathmandu.id,
      },
    }),
    prisma.constituency.create({
      data: {
        name: 'Kathmandu-2',
        nameNepali: 'काठमाडौं-२',
        constituencyNumber: 2,
        level: GovernmentLevel.FEDERAL,
        provinceId: provinces[2].id,
        districtId: kathmandu.id,
      },
    }),
    prisma.constituency.create({
      data: {
        name: 'Lalitpur-1',
        nameNepali: 'ललितपुर-१',
        constituencyNumber: 1,
        level: GovernmentLevel.FEDERAL,
        provinceId: provinces[2].id,
        districtId: lalitpur.id,
      },
    }),
    prisma.constituency.create({
      data: {
        name: 'Morang-1',
        nameNepali: 'मोरङ-१',
        constituencyNumber: 1,
        level: GovernmentLevel.FEDERAL,
        provinceId: provinces[0].id,
        districtId: morang.id,
      },
    }),
  ])

  console.log('✅ Constituencies created')

  // 5. Create Political Parties
  console.log('Creating parties...')
  const parties = await Promise.all([
    prisma.party.create({
      data: {
        name: 'Nepali Congress',
        nameNepali: 'नेपाली कांग्रेस',
        foundedYear: 1947,
        isActive: true,
      },
    }),
    prisma.party.create({
      data: {
        name: 'CPN-UML',
        nameNepali: 'नेकपा एमाले',
        foundedYear: 1991,
        isActive: true,
      },
    }),
    prisma.party.create({
      data: {
        name: 'CPN (Maoist Centre)',
        nameNepali: 'नेकपा माओवादी केन्द्र',
        foundedYear: 2009,
        isActive: true,
      },
    }),
    prisma.party.create({
      data: {
        name: 'Rastriya Swatantra Party',
        nameNepali: 'राष्ट्रिय स्वतन्त्र पार्टी',
        foundedYear: 2022,
        isActive: true,
      },
    }),
    prisma.party.create({
      data: {
        name: 'Independent',
        nameNepali: 'निर्दलीय',
        foundedYear: null,
        isActive: true,
      },
    }),
  ])

  console.log('✅ Parties created')

  // 6. Create Sources
  console.log('Creating sources...')
  const sources = await Promise.all([
    prisma.source.create({
      data: {
        title: 'Election Commission of Nepal - Candidate List 2022',
        publisher: 'Election Commission of Nepal',
        url: 'https://election.gov.np/candidates/2022',
        reliabilityTier: SourceTier.TIER_1_OFFICIAL,
        publishedDate: new Date('2022-10-01'),
      },
    }),
    prisma.source.create({
      data: {
        title: 'Kantipur Daily News Report',
        publisher: 'Kantipur Publications',
        url: 'https://kantipurdaily.com/news/2023/01/15',
        reliabilityTier: SourceTier.TIER_2_REPUTABLE,
        publishedDate: new Date('2023-01-15'),
      },
    }),
    prisma.source.create({
      data: {
        title: 'Supreme Court Case Record',
        publisher: 'Supreme Court of Nepal',
        url: 'https://supremecourt.gov.np/cases/2021-123',
        reliabilityTier: SourceTier.TIER_1_OFFICIAL,
        publishedDate: new Date('2021-06-10'),
      },
    }),
  ])

  console.log('✅ Sources created')

  // 7. Create Candidates with full profiles
  console.log('Creating candidates...')
  
  const candidate1 = await prisma.candidate.create({
    data: {
      name: 'Ram Kumar Sharma',
      nameNepali: 'राम कुमार शर्मा',
      age: 52,
      gender: Gender.MALE,
      partyId: parties[0].id,
      constituencyId: constituencies[0].id,
      bio: 'Experienced politician with 20 years of public service. Former Minister of Finance and current Member of Parliament from Kathmandu-1.',
      yearsInPolitics: 20,
      impactScore: 8.5,
      scandalScore: 2.0,
      fulfillmentRate: 75.0,
      popularityScore: 1250,
      status: CandidateStatus.PUBLISHED,
      isVerified: true,
      hasAllegations: false,
      hasCriminalCases: false,
      publishedAt: new Date(),
    },
  })

  // Add post for candidate 1
  await prisma.candidatePost.create({
    data: {
      candidateId: candidate1.id,
      position: 'Minister of Finance',
      positionNepali: 'अर्थमन्त्री',
      level: GovernmentLevel.FEDERAL,
      startDate: new Date('2020-01-01'),
      endDate: new Date('2022-12-31'),
      isCurrent: false,
    },
  })

  await prisma.candidatePost.create({
    data: {
      candidateId: candidate1.id,
      position: 'Member of Parliament',
      positionNepali: 'सांसद',
      level: GovernmentLevel.FEDERAL,
      startDate: new Date('2023-01-01'),
      isCurrent: true,
    },
  })

  // Add promises for candidate 1
  const promise1 = await prisma.promise.create({
    data: {
      candidateId: candidate1.id,
      text: 'Will build 10 new schools in Kathmandu district within 5 years',
      category: PromiseCategory.EDUCATION,
      type: PromiseType.MANIFESTO,
      status: PromiseStatus.IN_PROGRESS,
      electionCycle: '2022',
      progressPercent: 40,
      announcedDate: new Date('2022-09-01'),
    },
  })

  await prisma.promiseSource.create({
    data: {
      promiseId: promise1.id,
      sourceId: sources[0].id,
    },
  })

  // Add works for candidate 1
  const work1 = await prisma.work.create({
    data: {
      candidateId: candidate1.id,
      title: 'Kathmandu Ring Road Expansion Project',
      titleNepali: 'काठमाडौं रिंग रोड विस्तार परियोजना',
      description: 'Expanded the Ring Road from 2 lanes to 4 lanes, reducing traffic congestion by 30%',
      category: WorkCategory.INFRASTRUCTURE,
      impactLevel: ImpactLevel.HIGH,
      startDate: new Date('2020-03-01'),
      endDate: new Date('2022-10-31'),
      completionPercent: 100,
      budget: 5000000000,
      beneficiaries: 500000,
      location: 'Kathmandu Ring Road',
    },
  })

  await prisma.workSource.create({
    data: {
      workId: work1.id,
      sourceId: sources[1].id,
    },
  })

  const candidate2 = await prisma.candidate.create({
    data: {
      name: 'Sita Kumari Thapa',
      nameNepali: 'सीता कुमारी थापा',
      age: 45,
      gender: Gender.FEMALE,
      partyId: parties[1].id,
      constituencyId: constituencies[1].id,
      bio: 'Social activist turned politician. Focus on women empowerment and education reform.',
      yearsInPolitics: 12,
      impactScore: 7.2,
      scandalScore: 1.5,
      fulfillmentRate: 68.0,
      popularityScore: 980,
      status: CandidateStatus.PUBLISHED,
      isVerified: true,
      hasAllegations: false,
      hasCriminalCases: false,
      publishedAt: new Date(),
    },
  })

  const candidate3 = await prisma.candidate.create({
    data: {
      name: 'Krishna Bahadur Rai',
      nameNepali: 'कृष्ण बहादुर राई',
      age: 58,
      gender: Gender.MALE,
      partyId: parties[2].id,
      constituencyId: constituencies[2].id,
      bio: 'Former activist with deep roots in grassroots politics. Known for environmental conservation work.',
      yearsInPolitics: 25,
      impactScore: 6.8,
      scandalScore: 3.5,
      fulfillmentRate: 52.0,
      popularityScore: 750,
      status: CandidateStatus.PUBLISHED,
      isVerified: true,
      hasAllegations: true,
      hasCriminalCases: true,
      publishedAt: new Date(),
    },
  })

  // Add a case for candidate 3
  const case1 = await prisma.case.create({
    data: {
      candidateId: candidate3.id,
      allegation: 'Corruption charges related to misuse of development funds',
      caseNumber: 'CR-2021-0123',
      courtName: 'District Court Lalitpur',
      severity: 4,
      status: CaseStatus.UNDER_INVESTIGATION,
      filedDate: new Date('2021-06-15'),
    },
  })

  await prisma.caseSource.create({
    data: {
      caseId: case1.id,
      sourceId: sources[2].id,
    },
  })

  // Create more candidates (lighter profiles)
  const additionalCandidates = []
  for (let i = 4; i <= 20; i++) {
    const candidate = await prisma.candidate.create({
      data: {
        name: `Candidate ${i}`,
        nameNepali: `उम्मेदवार ${i}`,
        age: 35 + Math.floor(Math.random() * 30),
        gender: i % 2 === 0 ? Gender.MALE : Gender.FEMALE,
        partyId: parties[i % parties.length].id,
        constituencyId: constituencies[i % constituencies.length].id,
        bio: `Politician from ${constituencies[i % constituencies.length].name}`,
        yearsInPolitics: 5 + Math.floor(Math.random() * 20),
        impactScore: 4 + Math.random() * 5,
        scandalScore: Math.random() * 5,
        fulfillmentRate: 40 + Math.random() * 50,
        popularityScore: Math.floor(Math.random() * 1000),
        status: CandidateStatus.PUBLISHED,
        isVerified: true,
        publishedAt: new Date(),
      },
    })
    additionalCandidates.push(candidate)
  }

  console.log('✅ Candidates created')

  // 8. Create Rankings
  console.log('Creating rankings...')
  const allCandidates = [candidate1, candidate2, candidate3, ...additionalCandidates]
  
  // Top Impact Rankings
  const impactSorted = [...allCandidates].sort((a, b) => (b.impactScore || 0) - (a.impactScore || 0))
  for (let i = 0; i < Math.min(10, impactSorted.length); i++) {
    await prisma.ranking.create({
      data: {
        category: RankingCategory.TOP_IMPACT,
        candidateId: impactSorted[i].id,
        rank: i + 1,
        score: impactSorted[i].impactScore || 0,
      },
    })
  }

  // Cleanest Records Rankings (lowest scandal score)
  const cleanSorted = [...allCandidates].sort((a, b) => (a.scandalScore || 0) - (b.scandalScore || 0))
  for (let i = 0; i < Math.min(10, cleanSorted.length); i++) {
    await prisma.ranking.create({
      data: {
        category: RankingCategory.CLEANEST_RECORDS,
        candidateId: cleanSorted[i].id,
        rank: i + 1,
        score: 10 - (cleanSorted[i].scandalScore || 0), // Inverted score
      },
    })
  }

  // Highest Fulfillment Rankings
  const fulfillmentSorted = [...allCandidates].sort((a, b) => (b.fulfillmentRate || 0) - (a.fulfillmentRate || 0))
  for (let i = 0; i < Math.min(10, fulfillmentSorted.length); i++) {
    await prisma.ranking.create({
      data: {
        category: RankingCategory.HIGHEST_FULFILLMENT,
        candidateId: fulfillmentSorted[i].id,
        rank: i + 1,
        score: fulfillmentSorted[i].fulfillmentRate || 0,
      },
    })
  }

  console.log('✅ Rankings created')

  console.log('🎉 Database seeding completed successfully!')
  console.log(`
  Created:
  - ${2} Users (admin@netanepal.org, moderator@netanepal.org)
  - ${provinces.length} Provinces
  - ${4} Districts
  - ${constituencies.length} Constituencies
  - ${parties.length} Political Parties
  - ${sources.length} Sources
  - ${allCandidates.length} Candidates
  - Multiple promises, works, cases, and rankings
  
  Login credentials:
  Admin: admin@netanepal.org / admin123
  Moderator: moderator@netanepal.org / moderator123
  `)
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
