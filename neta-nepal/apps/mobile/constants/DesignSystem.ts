/**
 * Design System Constants for Mobile App
 * 
 * Professional color palette and design tokens
 * Based on Nepal's cultural identity with modern UX principles
 */

export const Colors = {
  // Primary Palette
  primary: '#C1121F',        // Crimson Red - Primary actions, key highlights
  primaryLight: '#DC4251',   // Lighter shade for hover states
  primaryDark: '#A00F1A',    // Darker shade for pressed states
  
  // Accent Palette
  accent: '#003049',         // Deep Blue - Secondary actions, links, information
  accentLight: '#1A4D6B',    // Lighter blue for backgrounds
  accentDark: '#001F30',     // Darker blue for emphasis
  
  // Background Palette
  background: '#FDF0D5',     // Cream - Main backgrounds, cards
  backgroundLight: '#FFFBF0', // Lighter cream for elevated surfaces
  backgroundDark: '#F5E8C7',  // Slightly darker for contrast
  
  // Text Palette
  textDark: '#2C2C2C',       // Primary text
  textMedium: '#4A4A4A',     // Secondary text
  textLight: '#6B6B6B',      // Tertiary text, labels
  textMuted: '#9CA3AF',      // Disabled text, placeholders
  
  // Neutral Palette
  white: '#FFFFFF',          // Elevated surfaces, cards
  surface: '#FFFFFF',        // Alias for white - elevated surfaces
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  border: '#E5E7EB',         // Alias for gray200 - borders and dividers
  
  // Text Color Aliases (for consistency)
  textPrimary: '#2C2C2C',    // Alias for textDark
  textSecondary: '#4A4A4A',  // Alias for textMedium
  textTertiary: '#6B6B6B',   // Alias for textLight
  
  // Status Colors
  success: '#059669',        // Success states, positive actions
  successLight: '#D1FAE5',
  successDark: '#047857',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  warningDark: '#92400E',
  error: '#DC2626',          // Errors, warnings, destructive actions
  errorLight: '#FEE2E2',
  errorDark: '#991B1B',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  // Transparent Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.25)',
  overlayDark: 'rgba(0, 0, 0, 0.75)',
};

export const Typography = {
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  // Alias for easier access
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Alias for easier access
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Alias for easier access
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 48,      // Alias for 2xl
  '2xl': 48,
  '3xl': 64,
};

export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Component-specific styles
export const Components = {
  // Button styles
  button: {
    primary: {
      backgroundColor: Colors.primary,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      minHeight: 44, // Touch target minimum
    },
    secondary: {
      backgroundColor: Colors.accent,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      minHeight: 44,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: Colors.primary,
      paddingVertical: Spacing.md - 2,
      paddingHorizontal: Spacing.lg - 2,
      borderRadius: BorderRadius.md,
      minHeight: 44,
    },
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadows.md,
  },
  
  // Input styles
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    fontSize: Typography.fontSize.base,
    color: Colors.textDark,
    minHeight: 48, // Touch target
  },
};

// Utility for consistent animations
export const Animations = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
  },
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Components,
  Animations,
};
