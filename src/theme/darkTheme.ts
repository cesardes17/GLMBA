// src/theme/darkTheme.ts
import { colors } from './colors';
import { baseButtonStyles, baseInputStyles } from './baseStyles';

export const darkTheme = {
  backgroundColor: colors.gray900,
  surfaceColor: colors.gray800,
  cardBackground: colors.gray800,
  backgroundNavigation: colors.primary950,

  textPrimary: colors.white,
  textSecondary: colors.gray300,
  textDisabled: colors.gray600,
  textInverted: colors.black, // Add this line

  primary: colors.primary600,
  primaryLight: colors.primary700,
  primaryDark: colors.primary400,

  separator: colors.gray700,

  button: baseButtonStyles,
  input: baseInputStyles,

  border: colors.gray700,
  divider: colors.gray700,

  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,

  activeElement: colors.primary300,
  inactiveElement: colors.primary700,

  backdrop: 'rgba(0, 0, 0, 0.7)',
  shadow: colors.gray900, // Changed from gray950 to gray900
  selectableCard: {
    default: {
      background: colors.gray800,
      border: colors.gray700,
      title: colors.white,
      description: colors.gray300,
      checkIcon: undefined,
    },
    selected: {
      background: colors.primary900,
      border: colors.primary400,
      title: colors.primary200,
      description: colors.primary300,
      checkIcon: colors.primary300,
    },
  },
};

export type Theme = typeof darkTheme;
