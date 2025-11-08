/**
 * Design System Constants for Web App
 * 
 * Professional color palette and design tokens
 * Based on Nepal's cultural identity with modern UX principles
 */

export const designSystem = {
  colors: {
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
    surface: '#FFFFFF',        // Alias for white
    border: '#E5E7EB',         // Borders and dividers
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Text Color Aliases
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
  },
  
  typography: {
    // Font Sizes (in rem for web)
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.75rem', // 28px
      '4xl': '2rem',    // 32px
      '5xl': '2.25rem', // 36px
    },
    
    // Font Weights
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    // Line Heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    base: '1rem',     // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.15)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.2)',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
};

// CSS class generator utilities
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Named exports for convenience
export const colors = designSystem.colors;
export const typography = designSystem.typography;
export const spacing = designSystem.spacing;
export const borderRadius = designSystem.borderRadius;
export const shadows = designSystem.shadows;
export const transitions = designSystem.transitions;

export default designSystem;
