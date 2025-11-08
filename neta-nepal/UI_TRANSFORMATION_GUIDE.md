# UI/UX Transformation Guide

## 🎨 Design System Overview

This document outlines the comprehensive UI/UX transformation applied to both the web and mobile applications of the Nepal Political Candidate Information Platform.

### Design Philosophy

The new design system is built on three core principles:

1. **Cultural Identity**: Colors inspired by Nepal's flag (crimson red) and natural beauty
2. **Professional Polish**: Modern, clean interfaces that inspire trust and authority
3. **Accessibility First**: Clear hierarchy, proper contrast ratios, and touch-friendly interactions

---

## 🎨 Color Palette

### Primary Colors
- **Primary Red**: `#C1121F` - Used for primary actions, key highlights, and important CTAs
- **Primary Light**: `#DC4251` - Hover states and emphasis
- **Primary Dark**: `#A00F1A` - Pressed states and depth

### Accent Colors
- **Accent Blue**: `#003049` - Secondary actions, links, and informational elements
- **Accent Light**: `#1A4D6B` - Backgrounds and subtle highlights
- **Accent Dark**: `#001F30` - Deep emphasis and contrast

### Background Colors
- **Cream**: `#FDF0D5` - Main background, soft and warm
- **Cream Light**: `#FFFBF0` - Elevated surfaces
- **Cream Dark**: `#F5E8C7` - Subtle contrast and borders

### Text Colors
- **Text Dark**: `#2C2C2C` - Primary content (AA contrast compliant)
- **Text Medium**: `#4A4A4A` - Secondary content
- **Text Light**: `#6B6B6B` - Tertiary content, labels
- **Text Muted**: `#9CA3AF` - Disabled text, placeholders

### Status Colors
- **Success**: `#059669` - Positive actions, verified badges
- **Warning**: `#F59E0B` - Cautions, pending states
- **Error**: `#DC2626` - Errors, critical warnings, allegations
- **Info**: `#3B82F6` - Informational messages

---

## 📐 Typography System

### Font Sizes (Web)
```css
xs: 0.75rem   (12px)
sm: 0.875rem  (14px)
base: 1rem    (16px)
lg: 1.125rem  (18px)
xl: 1.25rem   (20px)
2xl: 1.5rem   (24px)
3xl: 1.75rem  (28px)
4xl: 2rem     (32px)
5xl: 2.25rem  (36px)
```

### Font Sizes (Mobile)
```typescript
xs: 12
sm: 14
base: 16
lg: 18
xl: 20
2xl: 24
3xl: 28
4xl: 32
5xl: 36
```

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Subtle emphasis
- **Semibold**: 600 - Strong emphasis, labels
- **Bold**: 700 - Headings, primary emphasis

### Line Heights
- **Tight**: 1.2 - Headings, compact text
- **Normal**: 1.5 - Body text, comfortable reading
- **Relaxed**: 1.75 - Long-form content, maximum readability

---

## 🔲 Spacing System

Consistent spacing scale based on 4px increments:

```
xs: 4px
sm: 8px
md: 12px
base: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

**Usage Guidelines:**
- Use `xs` (4px) for micro-adjustments
- Use `sm` (8px) for tight spacing within components
- Use `md` (12px) for moderate spacing
- Use `base` (16px) for default component padding
- Use `lg` (24px) for section spacing
- Use `xl` (32px) for major section breaks
- Use `2xl` (48px) for hero sections
- Use `3xl` (64px) for dramatic spacing

---

## 🎭 Shadows & Elevation

### Shadow Scale

**Small (sm)**: Subtle elevation
```css
Web: 0 1px 2px 0 rgb(0 0 0 / 0.05)
Mobile: shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.05, elevation: 1
```

**Medium (md)**: Standard cards, buttons
```css
Web: 0 4px 6px -1px rgb(0 0 0 / 0.1)
Mobile: shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, elevation: 3
```

**Large (lg)**: Elevated cards, modals
```css
Web: 0 10px 15px -3px rgb(0 0 0 / 0.15)
Mobile: shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.15, elevation: 5
```

**Extra Large (xl)**: Prominent elements, hero sections
```css
Web: 0 20px 25px -5px rgb(0 0 0 / 0.2)
Mobile: shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.2, elevation: 8
```

---

## 🔘 Border Radius

```
sm: 6px   - Small elements, badges
md: 8px   - Buttons, inputs
lg: 12px  - Cards, containers
xl: 16px  - Large sections, modals
full: 9999px - Circular elements, avatars
```

---

## ⚡ Animations & Transitions

### Duration
- **Fast**: 150ms - Quick feedback (hover states)
- **Normal**: 300ms - Standard transitions (color changes, transforms)
- **Slow**: 500ms - Dramatic effects (page transitions)

### Easing
- **Ease-in-out**: Most transitions
- **Ease-out**: Entering animations
- **Ease-in**: Exiting animations

---

## 🎯 Component Patterns

### Buttons

**Primary Button**
```tsx
// Web
style={{
  backgroundColor: 'var(--color-primary)',
  color: 'var(--color-white)',
  padding: '0.75rem 2rem',
  borderRadius: 'var(--radius-lg)',
  fontWeight: '600',
  boxShadow: 'var(--shadow-md)',
  transition: 'all 300ms',
}}

// Mobile
{
  backgroundColor: Colors.primary,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: BorderRadius.lg,
  minHeight: 44,
  ...Shadows.md,
}
```

**Secondary Button**
```tsx
// Web
style={{
  backgroundColor: 'var(--color-accent)',
  color: 'var(--color-white)',
  padding: '0.75rem 2rem',
  borderRadius: 'var(--radius-lg)',
  fontWeight: '600',
}}

// Mobile
{
  backgroundColor: Colors.accent,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: BorderRadius.lg,
  minHeight: 44,
}
```

**Outline Button**
```tsx
// Web
style={{
  backgroundColor: 'transparent',
  color: 'var(--color-primary)',
  border: '2px solid var(--color-primary)',
  padding: '0.625rem 1.875rem',
  borderRadius: 'var(--radius-lg)',
  fontWeight: '600',
}}

// Mobile
{
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: Colors.primary,
  paddingVertical: 10,
  paddingHorizontal: 22,
  borderRadius: BorderRadius.lg,
  minHeight: 44,
}
```

### Cards

**Standard Card**
```tsx
// Web
className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
style={{
  backgroundColor: 'var(--color-white)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)',
  border: '1px solid var(--color-background-dark)',
  padding: '1.5rem',
}}

// Mobile
{
  backgroundColor: Colors.white,
  borderRadius: BorderRadius.lg,
  padding: Spacing.base,
  ...Shadows.md,
}
```

### Input Fields

```tsx
// Web
style={{
  padding: '0.75rem',
  border: '2px solid var(--color-background-dark)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-white)',
  fontSize: '0.875rem',
  color: 'var(--color-text-dark)',
  transition: 'all 200ms',
}}

// Mobile
{
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.gray300,
  borderRadius: BorderRadius.md,
  paddingVertical: 12,
  paddingHorizontal: 16,
  fontSize: Typography.fontSize.base,
  color: Colors.textDark,
  minHeight: 48,
}
```

### Badges

**Verified Badge**
```tsx
style={{
  backgroundColor: 'var(--color-success)',
  color: 'var(--color-white)',
  padding: '0.25rem 0.75rem',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.75rem',
  fontWeight: '600',
}}
```

**Warning Badge**
```tsx
style={{
  backgroundColor: 'var(--color-warning-light)',
  color: 'var(--color-warning)',
  padding: '0.25rem 0.75rem',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.75rem',
  fontWeight: '600',
}}
```

**Error Badge**
```tsx
style={{
  backgroundColor: 'var(--color-error-light)',
  color: 'var(--color-error)',
  padding: '0.25rem 0.75rem',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.75rem',
  fontWeight: '600',
}}
```

---

## 📱 Mobile-Specific Guidelines

### Touch Targets
- **Minimum size**: 44px × 44px (iOS Human Interface Guidelines)
- **Recommended size**: 48px × 48px (Material Design)
- **Comfortable size**: 56px × 56px (for primary actions)

### Spacing on Mobile
- Increase padding for better touch accuracy
- Use larger gaps between interactive elements
- Provide ample whitespace around text

### Typography on Mobile
- Maintain 16px minimum for body text (prevents zoom on iOS)
- Use larger headings for better hierarchy
- Limit line length to 50-75 characters

---

## 🖥️ Web-Specific Guidelines

### Hover States
All interactive elements must have hover states:
```css
transition: all 300ms ease-in-out;

&:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### Focus States
All interactive elements must have clear focus indicators:
```css
&:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Responsive Breakpoints
```css
mobile: 0-640px
tablet: 641px-1024px
desktop: 1025px+
wide: 1440px+
```

---

## ✨ Micro-interactions

### Button Press
```tsx
// Add subtle scale on press
onPressIn={() => setPressed(true)}
onPressOut={() => setPressed(false)}
style={{ transform: [{ scale: pressed ? 0.97 : 1 }] }}
```

### Card Hover (Web)
```tsx
className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
```

### Loading States
Use skeleton loaders with shimmer animation:
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.skeleton {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #f8f8f8 50%,
    #f0f0f0 100%
  );
  background-size: 1000px 100%;
}
```

---

## 📊 Score Display Components

### Impact Score
- **Color**: Success green (`#059669`)
- **Format**: `95` or `95.0` (1 decimal)
- **Range**: 0-100

### Fulfillment Rate
- **Color**: Accent blue (`#003049`)
- **Format**: `87%`
- **Range**: 0-100%

### Scandal Score
- **Color**: Error red (`#DC2626`)
- **Format**: `2.3` (1 decimal)
- **Range**: 0-10 (lower is better)

---

## 🎨 Implementation Checklist

### Web Application
- [x] Design system constants created (`lib/design-system.ts`)
- [x] Global CSS variables configured
- [x] Home page hero section updated
- [x] Feature cards enhanced with icons and animations
- [x] CTA section redesigned
- [x] Footer updated with proper styling
- [x] Candidates page header improved
- [x] Filter sidebar redesigned
- [x] Candidate cards enhanced with badges and scores
- [ ] Candidate profile page (needs update)
- [ ] Search page (needs update)
- [ ] Compare page (needs update)
- [ ] Rankings page (needs update)
- [ ] Admin dashboard (needs update)

### Mobile Application
- [x] Design system constants created (`constants/DesignSystem.ts`)
- [x] Colors.ts integrated with design system
- [x] Home tab completely redesigned
- [x] Search tab updated with new styling
- [x] Tab bar enhanced with proper colors and shadows
- [x] Tab headers styled consistently
- [ ] Compare tab (needs update)
- [ ] Rankings tab (needs update)
- [ ] More tab (needs update)
- [ ] Candidate profile screen (needs update)
- [ ] Candidates list screen (needs update)

---

## 🚀 Next Steps

### Immediate (High Priority)
1. **Complete remaining mobile screens** - Compare, Rankings, More tabs
2. **Update candidate profile screens** - Both web and mobile
3. **Enhance form inputs** - Apply consistent styling to all forms
4. **Add loading skeletons** - Replace simple spinners with skeleton screens

### Short Term
1. **Implement toast notifications** - Success, error, info messages
2. **Add empty states** - Illustrative empty states for all lists
3. **Create reusable button components** - Standardize button usage
4. **Enhance table components** - Style data tables consistently

### Medium Term
1. **Dark mode support** - Implement dark theme option
2. **Animation library** - Add subtle entrance/exit animations
3. **Icon system** - Create consistent icon usage patterns
4. **Illustration set** - Add custom illustrations for empty states

---

## 📝 Design System Files

### Web
- `/apps/web/lib/design-system.ts` - Design tokens and utilities
- `/apps/web/app/globals.css` - Global styles and CSS variables

### Mobile
- `/apps/mobile/constants/DesignSystem.ts` - Design tokens
- `/apps/mobile/constants/Colors.ts` - Theme integration

---

## 🎓 Best Practices

### DO ✅
- Use design system constants for all colors, spacing, and typography
- Add hover/focus states to all interactive elements
- Maintain consistent spacing throughout the app
- Use proper semantic HTML
- Test touch targets on mobile (minimum 44px)
- Provide clear visual feedback for all actions
- Use proper contrast ratios for accessibility

### DON'T ❌
- Use inline colors (use variables/constants)
- Mix spacing values (stick to the scale)
- Use pure black (#000000) for text
- Create overly complex animations
- Ignore accessibility standards
- Skip loading/error states
- Use small touch targets on mobile

---

## 📚 Resources

- [Web Design System](../apps/web/lib/design-system.ts)
- [Mobile Design System](../apps/mobile/constants/DesignSystem.ts)
- [Global Styles](../apps/web/app/globals.css)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design](https://material.io/design)

---

## 🤝 Contributing

When adding new components or features:

1. **Use the design system** - Never hardcode colors or spacing
2. **Follow patterns** - Look at existing components for reference
3. **Test responsiveness** - Verify on mobile, tablet, and desktop
4. **Check accessibility** - Use proper contrast and keyboard navigation
5. **Add hover states** - All interactive elements need visual feedback
6. **Document your work** - Update this guide when adding new patterns

---

**Last Updated**: November 8, 2025
**Version**: 1.0.0
**Status**: In Progress (60% Complete)
