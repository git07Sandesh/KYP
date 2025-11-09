# Database Schema Analysis & Recommendations

## Current Schema Strengths ✅

1. **Well-Organized Structure**
   - Clear separation of concerns (Core, Content, Sources, Features, Moderation)
   - Good use of enums for constrained values
   - Proper indexing on frequently queried fields

2. **Strong Relationships**
   - Proper foreign keys and cascade deletes
   - Many-to-many relationships handled correctly with junction tables
   - Good use of optional vs required fields

3. **Audit Trail**
   - AuditLog for tracking changes
   - ModerationQueue for content review
   - CorrectionRequest for community contributions

4. **Computed Scores**
   - Impact, scandal, fulfillment scores on candidates
   - Rankings system for leaderboards

## Critical Issues & Recommendations 🔧

### 1. **Missing Social Media Fields for Candidates**
Your UI shows social media links, but schema doesn't have them:

```prisma
model Candidate {
  // Add these fields:
  twitterHandle    String?
  facebookUrl      String?
  instagramHandle  String?
  websiteUrl       String?
  linkedinUrl      String?
}
```

### 2. **Missing Performance Metrics**
Your UI shows attendance and trust score, but they're not in schema:

```prisma
model Candidate {
  // Add these fields:
  attendance       Float?           // Attendance percentage
  trustScore       Float?           // Public trust index (0-10)
}
```

### 3. **Incomplete Address/Contact Info**
For comprehensive profiles:

```prisma
model Candidate {
  // Add these fields:
  dateOfBirth      DateTime?
  placeOfBirth     String?
  education        String?          @db.Text
  occupation       String?
  contactEmail     String?
  contactPhone     String?
  residenceAddress String?          @db.Text
}
```

### 4. **Missing Source Metadata**
Sources need better tracking:

```prisma
model Source {
  // Add these fields:
  accessedAt       DateTime?        // When we last verified the link
  isArchived       Boolean          @default(false)
  archiveStatus    ArchiveStatus    @default(NOT_ARCHIVED)
  language         String?          // "en", "ne"
  mediaType        MediaType        @default(ARTICLE)
}

enum ArchiveStatus {
  NOT_ARCHIVED
  ARCHIVED
  ARCHIVE_FAILED
  ARCHIVE_PENDING
}

enum MediaType {
  ARTICLE
  VIDEO
  AUDIO
  DOCUMENT
  IMAGE
  SOCIAL_POST
}
```

### 5. **Financial Transparency**
Critical for political accountability:

```prisma
model FinancialDisclosure {
  id              String    @id @default(cuid())
  candidateId     String
  year            Int
  assets          Decimal?  @db.Decimal(15, 2)
  liabilities     Decimal?  @db.Decimal(15, 2)
  income          Decimal?  @db.Decimal(15, 2)
  declarationUrl  String?   @db.Text
  isVerified      Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  candidate       Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  
  @@unique([candidateId, year])
  @@index([candidateId])
  @@index([year])
}
```

### 6. **Votes & Legislative Activity**
Track actual parliamentary performance:

```prisma
model LegislativeVote {
  id              String    @id @default(cuid())
  candidateId     String
  billTitle       String
  billNumber      String?
  voteDate        DateTime
  voteChoice      VoteChoice
  billCategory    PromiseCategory
  billResult      VoteResult?
  
  createdAt       DateTime  @default(now())
  
  candidate       Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  
  @@index([candidateId])
  @@index([voteDate])
}

enum VoteChoice {
  YES
  NO
  ABSTAIN
  ABSENT
}

enum VoteResult {
  PASSED
  FAILED
  PENDING
}
```

### 7. **Election History**
Track candidate performance over time:

```prisma
model ElectionResult {
  id              String    @id @default(cuid())
  candidateId     String
  electionYear    Int
  electionType    ElectionType
  constituencyId  Int
  partyId         Int
  votesReceived   Int?
  totalVotes      Int?
  rank            Int?
  isWinner        Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
  
  candidate       Candidate    @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  constituency    Constituency @relation(fields: [constituencyId], references: [id])
  party           Party        @relation(fields: [partyId], references: [id])
  
  @@unique([candidateId, electionYear, constituencyId])
  @@index([candidateId])
  @@index([electionYear])
  @@index([isWinner])
}

enum ElectionType {
  FEDERAL_FPTP
  FEDERAL_PR
  PROVINCIAL_FPTP
  PROVINCIAL_PR
  LOCAL_MAYOR
  LOCAL_DEPUTY_MAYOR
  LOCAL_WARD
}
```

### 8. **Media Coverage Tracking**
Track candidate visibility:

```prisma
model MediaMention {
  id              String       @id @default(cuid())
  candidateId     String
  title           String
  sourceId        String
  publishedDate   DateTime
  sentiment       Sentiment    @default(NEUTRAL)
  category        MentionCategory
  excerptText     String?      @db.Text
  
  createdAt       DateTime     @default(now())
  
  candidate       Candidate    @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  source          Source       @relation(fields: [sourceId], references: [id])
  
  @@index([candidateId])
  @@index([publishedDate])
  @@index([sentiment])
}

enum Sentiment {
  POSITIVE
  NEUTRAL
  NEGATIVE
}

enum MentionCategory {
  ACHIEVEMENT
  CONTROVERSY
  POLICY
  PERSONAL
  OTHER
}
```

### 9. **Family & Associates**
Important for conflict of interest tracking:

```prisma
model CandidateRelation {
  id              String         @id @default(cuid())
  candidateId     String
  relatedName     String
  relationship    RelationType
  details         String?        @db.Text
  isPublicFigure  Boolean        @default(false)
  relatedCandidateId String?     // If they're also a candidate
  
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  
  candidate       Candidate      @relation("CandidateRelations", fields: [candidateId], references: [id], onDelete: Cascade)
  relatedCandidate Candidate?   @relation("RelatedCandidates", fields: [relatedCandidateId], references: [id])
  
  @@index([candidateId])
  @@index([relatedCandidateId])
}

enum RelationType {
  SPOUSE
  PARENT
  CHILD
  SIBLING
  BUSINESS_PARTNER
  POLITICAL_ALLY
  OTHER
}
```

### 10. **User Engagement**
Track user interactions for analytics:

```prisma
model UserActivity {
  id              String       @id @default(cuid())
  userId          String?      // Null for anonymous
  sessionId       String?
  activityType    ActivityType
  targetType      String?      // "Candidate", "Promise", etc.
  targetId        String?
  metadata        Json?
  
  createdAt       DateTime     @default(now())
  
  user            User?        @relation(fields: [userId], references: [id])
  
  @@index([userId])
  @@index([activityType])
  @@index([createdAt])
  @@index([targetType, targetId])
}

enum ActivityType {
  VIEW_PROFILE
  VIEW_PROMISE
  VIEW_WORK
  COMPARE_CANDIDATES
  SEARCH
  SHARE
  REPORT_ERROR
  UPVOTE
  DOWNVOTE
}
```

## Recommended Schema Updates

Here's the complete updated schema with all improvements:

### Updated Candidate Model
```prisma
model Candidate {
  id                  String           @id @default(cuid())
  name                String
  nameNepali          String?
  
  // Personal Info
  age                 Int?
  dateOfBirth         DateTime?
  gender              Gender?
  placeOfBirth        String?
  education           String?          @db.Text
  occupation          String?
  
  // Visual & Contact
  photoUrl            String?
  contactEmail        String?
  contactPhone        String?
  residenceAddress    String?          @db.Text
  
  // Social Media
  twitterHandle       String?
  facebookUrl         String?
  instagramHandle     String?
  linkedinUrl         String?
  websiteUrl          String?
  
  // Political Info
  partyId             Int
  constituencyId      Int
  bio                 String?          @db.Text
  yearsInPolitics     Int?
  
  // Performance Scores (computed)
  impactScore         Float?           @default(0)
  scandalScore        Float?           @default(0)
  fulfillmentRate     Float?           @default(0)
  attendance          Float?           @default(0)    // NEW
  trustScore          Float?           @default(0)    // NEW
  popularityScore     Int?             @default(0)
  
  // Status indicators
  status              CandidateStatus  @default(DRAFT)
  isVerified          Boolean          @default(false)
  hasAllegations      Boolean          @default(false)
  hasCriminalCases    Boolean          @default(false)
  
  createdAt           DateTime         @default(now())
  updatedAt           DateTime         @updatedAt
  publishedAt         DateTime?
  
  // Relations
  party               Party            @relation(fields: [partyId], references: [id])
  constituency        Constituency     @relation(fields: [constituencyId], references: [id])
  
  posts               CandidatePost[]
  promises            Promise[]
  works               Work[]
  cases               Case[]
  rumors              Rumor[]
  financialDisclosures FinancialDisclosure[]  // NEW
  legislativeVotes    LegislativeVote[]      // NEW
  electionResults     ElectionResult[]       // NEW
  mediaMentions       MediaMention[]         // NEW
  relations           CandidateRelation[]    @relation("CandidateRelations")     // NEW
  relatedTo           CandidateRelation[]    @relation("RelatedCandidates")      // NEW
  comparisons         Comparison[]           @relation("ComparedCandidates")
  auditLogs           AuditLog[]
  
  @@index([partyId])
  @@index([constituencyId])
  @@index([status])
  @@index([name])
  @@index([impactScore])
  @@index([scandalScore])
  @@index([fulfillmentRate])
  @@index([twitterHandle])  // NEW - for social lookup
}
```

## Migration Strategy 📋

### Phase 1: Essential Fields (Do First)
1. Add social media fields (twitterHandle, facebookUrl, instagramHandle, websiteUrl)
2. Add performance metrics (attendance, trustScore)
3. Add personal info (dateOfBirth, education, occupation)

### Phase 2: Accountability Features
4. Add FinancialDisclosure model
5. Add LegislativeVote model
6. Add ElectionResult model

### Phase 3: Engagement & Analytics
7. Add MediaMention model
8. Add UserActivity model
9. Add CandidateRelation model

### Phase 4: Source Improvements
10. Update Source model with archive tracking
11. Add MediaType enum

## Data Entry Strategy 💡

### Start with Minimal Viable Data:
```typescript
// Minimum required for a candidate to be published:
{
  name: "Required",
  nameNepali: "Optional but recommended",
  partyId: "Required",
  constituencyId: "Required",
  photoUrl: "Optional but important for UI",
  bio: "Optional but recommended",
  status: "PUBLISHED",
  isVerified: true
}
```

### Progressive Enhancement:
1. **Week 1**: Add basic candidate info + party + constituency
2. **Week 2**: Add promises with sources
3. **Week 3**: Add works and calculate impact scores
4. **Week 4**: Add cases and scandal scores
5. **Week 5**: Add social media links and election history
6. **Week 6**: Add financial disclosures and legislative votes

## Validation Rules 🛡️

### Required for Publishing:
- ✅ name
- ✅ partyId
- ✅ constituencyId
- ✅ At least 1 source for any claim

### Recommended for Quality:
- 📸 photoUrl
- 📝 bio (min 100 characters)
- 🔗 At least 1 social media link
- 📊 At least 3 promises OR works OR posts

### Data Integrity:
- All dates in past (except endDate for current positions)
- Scores between valid ranges (0-5, 0-10, 0-100%)
- Valid URLs for social media and sources
- Phone/email format validation

## Next Steps 🚀

1. **Review & Approve Schema Changes**
   - Decide which models to add in Phase 1
   - Confirm field names and types

2. **Create Migration**
   ```bash
   npx prisma migrate dev --name add_candidate_enhancements
   ```

3. **Update TypeScript Types**
   ```bash
   npx prisma generate
   ```

4. **Update API Endpoints**
   - Add new fields to candidate queries
   - Create CRUD for new models

5. **Update UI Components**
   - Already done for social media! ✅
   - Add forms for new data entry

6. **Seed Sample Data**
   - Create realistic test data
   - Use real Nepal data where possible

Would you like me to:
1. Create the updated schema.prisma file with Phase 1 changes?
2. Generate seed data script for testing?
3. Create API endpoints for the new fields?
4. Update the UI forms for data entry?
