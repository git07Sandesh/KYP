# 🚀 Quick Start: Data Population

## ✅ Your Database is Ready!

Migration complete! Here's how to start adding data right away.

---

## 📊 Current Status

- ✅ **20 candidates** already in database
- ✅ **All new fields** added (social media, attendance, trust score)
- ✅ **5 new tables** created (Financial, Election, Media, Relations, Activity)
- ✅ **Foundation data** ready (provinces, districts, parties)

---

## 🎯 Quick Actions

### 1. View Your Data (Right Now!)
```bash
cd packages/database
npx prisma studio
```
Opens browser at http://localhost:5555

### 2. Update Existing Candidates with Social Media
```typescript
// In your admin panel or API endpoint:
await prisma.candidate.update({
  where: { id: 'candidate-id' },
  data: {
    twitterHandle: '@RamSharma',
    facebookUrl: 'https://facebook.com/ramsharma',
    instagramHandle: 'ram.sharma.official',
    websiteUrl: 'https://ramsharma.com.np',
    attendance: 85.5,
    trustScore: 7.8,
    dateOfBirth: new Date('1972-03-15'),
    education: 'MA in Political Science, Tribhuvan University',
  },
});
```

### 3. Add Financial Disclosure
```typescript
await prisma.financialDisclosure.create({
  data: {
    candidateId: 'candidate-id',
    year: 2023,
    assets: 45000000,      // NPR 4.5 crore
    liabilities: 5000000,  // NPR 50 lakh
    income: 2000000,       // NPR 20 lakh
    declarationUrl: 'https://ciaa.gov.np/...',
    isVerified: true,
  },
});
```

### 4. Add Election Result
```typescript
await prisma.electionResult.create({
  data: {
    candidateId: 'candidate-id',
    electionYear: 2022,
    electionType: 'FEDERAL_FPTP',
    constituencyId: 1,
    partyId: 1,
    votesReceived: 35420,
    totalVotes: 65000,
    rank: 1,
    isWinner: true,
  },
});
```

### 5. Add Media Mention
```typescript
// First create source if not exists
const source = await prisma.source.create({
  data: {
    title: 'Kantipur Daily',
    publisher: 'Kantipur Publications',
    url: 'https://ekantipur.com',
    reliabilityTier: 'TIER_2_REPUTABLE',
    language: 'ne',
    mediaType: 'ARTICLE',
  },
});

// Then add media mention
await prisma.mediaMention.create({
  data: {
    candidateId: 'candidate-id',
    sourceId: source.id,
    title: 'Minister inaugurates new hospital',
    publishedDate: new Date('2024-01-15'),
    sentiment: 'POSITIVE',
    category: 'ACHIEVEMENT',
    excerptText: 'The minister praised the healthcare initiative...',
  },
});
```

---

## 📝 Priority Tasks (This Week)

### Monday: Update Existing Candidates
- [ ] Add social media links for all 20 candidates
- [ ] Add attendance data (where available)
- [ ] Add trust scores (can start with estimates)
- [ ] Add education and occupation

### Tuesday-Wednesday: Add More Candidates
- [ ] Add 10 high-profile current ministers
- [ ] Add 10 party leaders
- [ ] Focus on complete profiles (all basic fields)

### Thursday: Historical Data
- [ ] Add 2022 election results for major candidates
- [ ] Add at least 1 financial disclosure per candidate
- [ ] Start tracking media mentions

### Friday: Review & Quality Check
- [ ] Verify all data has sources
- [ ] Check for missing photos
- [ ] Ensure all published candidates are complete
- [ ] Test UI with new data

---

## 🔑 Most Important Fields for Launch

### Must Have (for published candidates):
1. ✅ name, nameNepali
2. ✅ partyId, constituencyId
3. ✅ photoUrl
4. ✅ bio (min 100 characters)
5. ✅ At least 1 source for any claim

### Should Have (for quality):
6. 📱 At least 1 social media link
7. 📊 Attendance or trustScore
8. 🎓 Education
9. 📅 Age or dateOfBirth
10. 📰 At least 1 promise or work

### Nice to Have (for completeness):
11. 💰 Financial disclosure
12. 🗳️ Election results
13. 👥 Family relations
14. 📰 Media mentions

---

## 📊 Data Sources

### Official Government Sources (TIER_1):
- **Election Commission**: http://election.gov.np
- **Parliament**: http://parliament.gov.np  
- **CIAA**: https://ciaa.gov.np (financial disclosures)
- **Supreme Court**: https://supremecourt.gov.np (case records)

### Reputable Media (TIER_2):
- **Kantipur**: https://ekantipur.com
- **The Himalayan Times**: https://thehimalayantimes.com
- **Kathmandu Post**: https://kathmandupost.com
- **BBC Nepali**: https://www.bbc.com/nepali

### Party Websites (TIER_3):
- Individual party websites for manifesto promises
- Social media for campaign statements

---

## 🎯 Sample Data Entry Script

Create: `scripts/update-candidate-social.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateCandidateSocial() {
  // Example: Update Ram Kumar Sharma
  const candidate = await prisma.candidate.findFirst({
    where: { name: 'Ram Kumar Sharma' },
  });

  if (candidate) {
    await prisma.candidate.update({
      where: { id: candidate.id },
      data: {
        twitterHandle: '@RamSharmaNC',
        facebookUrl: 'https://facebook.com/RamKumarSharmaOfficial',
        websiteUrl: 'https://ramsharma.com.np',
        attendance: 87.5,
        trustScore: 8.2,
        dateOfBirth: new Date('1972-01-15'),
        education: 'MA in Political Science, Tribhuvan University; LLB',
        occupation: 'Lawyer, Politician',
        contactEmail: 'contact@ramsharma.com.np',
      },
    });
    
    console.log('✅ Updated', candidate.name);
  }
}

updateCandidateSocial()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run it:
```bash
cd packages/database
tsx scripts/update-candidate-social.ts
```

---

## 🎨 UI Integration

Your UI already has placeholders for social media! Now you can fill them:

```typescript
// In your candidate card component:
{candidate.twitterHandle && (
  <a href={`https://twitter.com/${candidate.twitterHandle}`}>
    <Twitter className="w-5 h-5" />
  </a>
)}

{candidate.facebookUrl && (
  <a href={candidate.facebookUrl}>
    <Facebook className="w-5 h-5" />
  </a>
)}

// In your profile page:
<div>Attendance: {candidate.attendance?.toFixed(1)}%</div>
<div>Trust Score: {candidate.trustScore?.toFixed(1)}/10</div>
```

---

## ⚡ Pro Tips

1. **Start Small**: 10 complete profiles > 100 incomplete ones
2. **Verify Everything**: Every claim needs a source
3. **Use Transactions**: For related data (candidate + posts + promises)
4. **Backup Often**: `pg_dump` before bulk operations
5. **Test in Studio**: Use Prisma Studio to verify data before deploying
6. **Progressive Enhancement**: Add basic data first, details later

---

## 🚨 Common Mistakes to Avoid

❌ Publishing candidates without sources
❌ Adding promises without election cycle
❌ Creating sources without reliability tier
❌ Forgetting to set isVerified = true
❌ Using inconsistent date formats
❌ Not linking related data (candidate → party → constituency)

✅ Always link to sources
✅ Use proper enums (don't hardcode strings)
✅ Fill required fields before publishing
✅ Validate data before committing
✅ Use transactions for related inserts

---

## 📈 Success Metrics

**After Day 1**:
- ✅ All 20 existing candidates have social media links
- ✅ At least 10 candidates have attendance data
- ✅ At least 5 candidates have financial disclosures

**After Week 1**:
- ✅ 50+ candidates total
- ✅ 100+ promises tracked
- ✅ 50+ election results added
- ✅ 20+ financial disclosures

**After Month 1**:
- ✅ 200+ candidates (all federal MPs)
- ✅ 500+ promises with sources
- ✅ 300+ works documented
- ✅ Complete 2022 election results

---

## 🆘 Need Help?

**Database Issues**: Check `IMPLEMENTATION_COMPLETE.md`
**Data Strategy**: Check `DATA_POPULATION_GUIDE.md`
**Schema Questions**: Check `SCHEMA_ANALYSIS.md`

---

## ✨ You're Ready!

Everything is set up. Your database has:
- ✅ Enhanced schema with all new fields
- ✅ Sample data to work with
- ✅ Proper relationships and indexes
- ✅ Production-ready structure

**Start adding data today!** 🚀

---

**Quick Command Reference**:
```bash
# View data
npx prisma studio

# Run migrations
npx prisma migrate dev

# Generate client
npx prisma generate

# Reset database (CAREFUL!)
npx prisma migrate reset

# Backup database
pg_dump -U sandeshbhattarai -d neta_nepal > backup.sql
```
