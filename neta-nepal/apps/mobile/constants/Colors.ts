/**
 * Theme Colors using Design System
 * 
 * Integrates the professional design system with Expo's theming
 */

import { Colors as DSColors } from './DesignSystem';

const tintColorLight = DSColors.primary;
const tintColorDark = DSColors.primaryLight;

export default {
  light: {
    text: DSColors.textDark,
    background: DSColors.background,
    tint: tintColorLight,
    tabIconDefault: DSColors.textMuted,
    tabIconSelected: tintColorLight,
    card: DSColors.white,
    border: DSColors.gray300,
    notification: DSColors.error,
    primary: DSColors.primary,
    accent: DSColors.accent,
    success: DSColors.success,
    warning: DSColors.warning,
    error: DSColors.error,
  },
  dark: {
    text: DSColors.white,
    background: DSColors.gray900,
    tint: tintColorDark,
    tabIconDefault: DSColors.gray400,
    tabIconSelected: tintColorDark,
    card: DSColors.gray800,
    border: DSColors.gray700,
    notification: DSColors.errorLight,
    primary: DSColors.primaryLight,
    accent: DSColors.accentLight,
    success: DSColors.success,
    warning: DSColors.warning,
    error: DSColors.error,
  },
};
