import { colors } from './colors';
import { baseButtonStyles, baseInputStyles } from './baseStyles';
import type { Theme } from './theme';

export const lightTheme: Theme = {
  backgroundColor: colors.white,
  surfaceColor: colors.gray100,
  cardBackground: colors.white,
  backgroundNavigation: colors.white,

  textPrimary: colors.gray900,
  textSecondary: colors.gray600,
  textDisabled: colors.gray400,
  textInverted: colors.white, // Add this line

  primary: colors.primary600,
  primaryLight: colors.primary300,
  primaryDark: colors.primary800,

  separator: colors.gray200,

  button: baseButtonStyles,
  input: baseInputStyles,

  border: colors.gray300,
  divider: colors.gray200,

  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,

  activeElement: colors.primary500,
  inactiveElement: colors.primary300,

  backdrop: 'rgba(0, 0, 0, 0.5)',
  shadow: colors.gray900,

  selectableCard: {
    default: {
      background: colors.white,
      border: colors.gray300,
      title: colors.gray900,
      description: colors.gray600,
      checkIcon: undefined,
    },
    selected: {
      background: colors.primary50,
      border: colors.primary600,
      title: colors.primary800,
      description: colors.primary700,
      checkIcon: colors.primary600,
    },
  },
};
