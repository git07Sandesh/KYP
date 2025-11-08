# 📱 Mobile App Testing Guide - Stage 5

## Prerequisites

### 1. Install Dependencies
```bash
cd /Users/sandeshbhattarai/Desktop/neta_china/neta-nepal/apps/mobile
pnpm install
```

### 2. Configure Environment
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Find your computer's IP address:
   ```bash
   # Mac/Linux
   ipconfig getifaddr en0
   
   # Windows
   ipconfig
   
   # Look for IPv4 Address (usually starts with 192.168.x.x)
   ```

3. Update `.env` file:
   ```bash
   EXPO_PUBLIC_API_URL="http://YOUR_IP_ADDRESS:3000/api"
   # Example: EXPO_PUBLIC_API_URL="http://192.168.0.23:3000/api"
   ```

### 3. Start Backend Server
In a separate terminal:
```bash
cd /Users/sandeshbhattarai/Desktop/neta_china/neta-nepal/apps/web
pnpm run dev
```

Verify it's running at `http://localhost:3000`

---

## Starting the Mobile App

### Option 1: Expo Go (Physical Device - Easiest)

1. **Install Expo Go**
   - iOS: App Store
   - Android: Google Play Store

2. **Start Expo Server**
   ```bash
   cd /Users/sandeshbhattarai/Desktop/neta_china/neta-nepal/apps/mobile
   pnpm start
   ```

3. **Scan QR Code**
   - iOS: Use Camera app to scan QR
   - Android: Use Expo Go app to scan QR

4. **App will load on your device!**

### Option 2: iOS Simulator (Mac Only)

1. **Install Xcode** from Mac App Store (if not already installed)

2. **Start iOS Simulator**
   ```bash
   cd /Users/sandeshbhattarai/Desktop/neta_china/neta-nepal/apps/mobile
   pnpm ios
   ```

3. **Wait for build** (first time takes 3-5 minutes)

### Option 3: Android Emulator

1. **Install Android Studio** (if not already installed)

2. **Create AVD (Android Virtual Device)**
   - Open Android Studio
   - Tools → Device Manager
   - Create Device → Pick Pixel 5
   - Download system image (API 33 recommended)

3. **Start Android Emulator**
   ```bash
   cd /Users/sandeshbhattarai/Desktop/neta_china/neta-nepal/apps/mobile
   pnpm android
   ```

---

## Testing Checklist

### 🏠 Home Tab

#### Visual Elements
- [ ] Hero section displays with blue background
- [ ] "Know Your Political Candidate" title visible
- [ ] 3 quick stat cards show (Candidates, Constituencies, Parties)
- [ ] 3 action buttons display (Search, Compare, Rankings)
- [ ] 2 featured candidate cards show
- [ ] 3 "Browse by Level" cards display

#### Interactions
- [ ] Pull down to refresh (RefreshControl works)
- [ ] Tap "Search" button → navigates to Search tab
- [ ] Tap "Compare" button → navigates to Compare tab
- [ ] Tap "Rankings" button → navigates to Rankings tab
- [ ] Tap "See All →" → opens Candidates List screen
- [ ] Tap candidate card → opens Candidate Profile screen
- [ ] Tap level card → (future: will filter candidates)

#### Data
- [ ] Mock featured candidates display
- [ ] Stats show placeholder numbers
- [ ] Icons render correctly

---

### 🔍 Search Tab

#### Visual Elements
- [ ] Search input auto-focuses when tab opens
- [ ] Search icon displays in input
- [ ] Empty state shows: "Start typing to search candidates"

#### Interactions
- [ ] Type 2+ characters → search triggers
- [ ] Results display as you type
- [ ] Loading indicator shows during search
- [ ] Tap result → opens Candidate Profile
- [ ] Clear input → returns to empty state

#### Edge Cases
- [ ] Type 1 character → no search (need 2+ chars)
- [ ] Type "xyz" → shows "No candidates found"
- [ ] Network error → shows error message

---

### ⚖️ Compare Tab

#### Visual Elements
- [ ] Header shows "Compare Candidates"
- [ ] Subtitle: "Select up to 3 candidates to compare"
- [ ] Empty state displays with "No candidates selected yet"
- [ ] "Add Candidate" button visible

#### Interactions
- [ ] Tap "Add Candidate" → (future: opens picker)
- [ ] When candidates added → vertical cards display
- [ ] Each card shows photo, name, party, 3 stats
- [ ] Swipe tip at bottom: "Swipe left or right..."

#### Data
- [ ] Mock comparison data displays
- [ ] Impact, Fulfillment, Scandal scores show
- [ ] Max 3 candidates enforced

---

### 🏆 Rankings Tab

#### Visual Elements
- [ ] 4 category tabs display horizontally
- [ ] Active tab highlighted in blue
- [ ] Inactive tabs gray
- [ ] Ranked list displays with:
  - Rank badge (blue circle)
  - Candidate avatar
  - Name and party
  - Score value

#### Interactions
- [ ] Swipe category tabs left/right
- [ ] Tap category → changes active tab
- [ ] Tap candidate → opens profile
- [ ] Scroll list vertically

#### Categories
- [ ] Top Impact tab works
- [ ] Cleanest Records tab works
- [ ] Highest Fulfillment tab works
- [ ] Most Popular tab works

#### Data
- [ ] Mock rankings display
- [ ] Empty state shows for categories without data
- [ ] Scores display correctly

---

### ⋯ More Tab

#### Visual Elements
- [ ] Header shows app name and version
- [ ] 3 sections visible:
  - Information (3 items)
  - Help & Support (2 items)
  - Legal (2 items)
- [ ] All menu items have icons
- [ ] Chevron arrows on right
- [ ] Footer shows copyright

#### Interactions
- [ ] Tap menu item → (future: navigates to page)
- [ ] All items are tappable
- [ ] Smooth scrolling

#### Content
- [ ] About Neta Nepal
- [ ] Editorial Policy
- [ ] FAQs
- [ ] Send Feedback
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Contact Us

---

### 📋 Candidates List Screen

#### Access
- [ ] Open from Home tab "See All" link
- [ ] Screen title: "All Candidates"
- [ ] Back button navigates to Home

#### Visual Elements
- [ ] Search bar at top with icon
- [ ] Sort button shows current sort
- [ ] Filter button displays
- [ ] Candidate cards in list format
- [ ] Each card shows:
  - Avatar (60px circle)
  - Name with verified checkmark (if applicable)
  - Party name
  - Constituency
  - Impact score

#### Interactions
- [ ] Type in search → filters list
- [ ] Tap Sort button → dropdown menu appears
- [ ] Select sort option → list reorders
- [ ] Tap Filter button → (future: opens filter sheet)
- [ ] Tap candidate card → opens profile
- [ ] Scroll to bottom → loads more (pagination)

#### Sort Options
- [ ] Name (A-Z)
- [ ] Impact (high to low)
- [ ] Fulfillment (high to low)
- [ ] Cleanest (low scandal score)

---

### 👤 Candidate Profile Screen

#### Access
- [ ] Open from Home featured candidates
- [ ] Open from Candidates List
- [ ] Open from Search results
- [ ] Open from Rankings
- [ ] Open via deep link: `/candidates/1`

#### Header
- [ ] Back button navigates back
- [ ] Title shows candidate name
- [ ] Share button displays (top right)
- [ ] Tap share → Native share sheet opens

#### Profile Section
- [ ] Large photo displays (120px circle)
- [ ] Name (English) displays
- [ ] Name (Nepali) displays if available
- [ ] Party name in blue
- [ ] Constituency name
- [ ] Verified badge shows if verified

#### Score Cards
- [ ] 4 score cards in row:
  - Impact Score (blue)
  - Fulfillment Rate % (blue)
  - Scandal Score (red)
  - Popularity Score (blue)

#### Tabs
- [ ] 4 tabs display horizontally
- [ ] Active tab has blue underline
- [ ] Tabs scroll horizontally
- [ ] Tap tab → switches content

#### Overview Tab
- [ ] "About" section with bio
- [ ] "Details" table shows:
  - Age
  - Gender
  - Years in Politics
- [ ] Warning cards display if applicable:
  - Yellow for allegations
  - Red for criminal cases

#### Other Tabs
- [ ] Promises tab shows empty state
- [ ] Works tab shows empty state
- [ ] Cases tab shows empty state
- [ ] Empty state has icon + text

#### Loading States
- [ ] Shows ActivityIndicator while loading
- [ ] Error state displays if load fails
- [ ] "Go Back" button on error

---

## 📊 Performance Testing

### Load Times
- [ ] App launches < 3 seconds
- [ ] Tab switches instant
- [ ] Profile loads < 1 second (with mock data)
- [ ] Search results appear < 500ms
- [ ] Images load progressively

### Scrolling
- [ ] Home tab scrolls smoothly
- [ ] Rankings list scrolls smoothly
- [ ] Candidates list scrolls smoothly
- [ ] No frame drops or stuttering

### Memory
- [ ] App doesn't crash after 5 minutes
- [ ] Navigate between all tabs 10 times
- [ ] Open 10 different profiles
- [ ] App remains responsive

---

## 🎨 UI/UX Testing

### Touch Targets
- [ ] All buttons minimum 44px height
- [ ] Tab bar items easy to tap
- [ ] Cards have adequate spacing
- [ ] No accidental taps

### Typography
- [ ] All text is readable
- [ ] Font sizes appropriate (12-24px)
- [ ] Line height provides breathing room
- [ ] Color contrast meets WCAG standards

### Visual Consistency
- [ ] Colors match design system
- [ ] Icons consistent size and style
- [ ] Spacing uniform throughout
- [ ] Border radius consistent

### Animations
- [ ] Tab transitions smooth
- [ ] Pull-to-refresh animation works
- [ ] Loading indicators spin
- [ ] No janky animations

---

## 🐛 Bug Reporting

If you find issues, document:

### Required Info
1. **Device:** iPhone 14 / Pixel 5 / etc.
2. **OS Version:** iOS 17 / Android 13 / etc.
3. **Steps to Reproduce:** 
   - Step 1
   - Step 2
   - Step 3
4. **Expected Behavior:** What should happen
5. **Actual Behavior:** What actually happens
6. **Screenshots:** If visual bug

### Example Bug Report
```markdown
**Device:** iPhone 14 Pro (Physical)
**OS:** iOS 17.1
**Bug:** Search results don't display

Steps:
1. Open app
2. Navigate to Search tab
3. Type "Ram" in search input
4. Results list is empty

Expected: Show candidates matching "Ram"
Actual: Empty list shows

Screenshot: [attach]
```

---

## 🚀 Next Steps After Testing

### High Priority Fixes
1. Fix any crash bugs immediately
2. Fix navigation issues
3. Fix layout problems on different screen sizes
4. Connect real API (replace mock data)

### Medium Priority
1. Add pull-to-refresh to remaining screens
2. Implement Promises/Works/Cases tabs
3. Add swipe gestures
4. Optimize images

### Low Priority
1. Add animations
2. Add haptic feedback
3. Improve empty states
4. Add skeleton loaders

---

## 📝 Testing Log Template

```markdown
# Testing Session: [Date]

**Tester:** [Your Name]
**Device:** [Device Name]
**OS:** [OS Version]
**Build:** [Commit Hash / Date]

## Tests Passed: X/Y

### Home Tab
- ✅ All elements visible
- ✅ Navigation works
- ❌ Pull-to-refresh not working

### Search Tab
- ✅ Search input works
- ...

## Bugs Found:
1. [Bug description]
2. [Bug description]

## Notes:
- [Any additional observations]
```

---

## ✅ Sign-Off Checklist

Before moving to production:

- [ ] All tabs tested on iOS
- [ ] All tabs tested on Android
- [ ] No crash bugs
- [ ] No navigation issues
- [ ] All touch targets work
- [ ] Text is readable
- [ ] Images load correctly
- [ ] API integration complete
- [ ] Performance acceptable
- [ ] UI matches design

---

**Happy Testing! 🎉**

If you encounter any issues, refer back to this guide or check the `MOBILE_STAGE5_SUMMARY.md` file for implementation details.
