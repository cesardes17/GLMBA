import { colors } from "./colors";

// Light theme definition
export const lightTheme = {
  // Background colors
  backgroundColor: colors.white,
  surfaceColor: colors.gray100,
  cardBackground: colors.white,
  backgroundNavigation: colors.white,

  // Text colors
  textPrimary: colors.gray900,
  textSecondary: colors.gray600,
  textDisabled: colors.gray400,

  // UI element colors
  primary: colors.primary600,
  primaryLight: colors.primary300,
  primaryDark: colors.primary800,

  //separator
  separator: colors.gray200,

  // Button states
  button: {
    default: {
      background: colors.primary200,
      text: colors.gray900,
      border: colors.primary300,
    },
    hover: {
      background: colors.primary300,
      text: colors.gray900,
      border: colors.primary400,
    },
    active: {
      background: colors.primary500,
      text: colors.gray900,
      border: colors.primary600,
      shadow: colors.primary600,
    },
    disabled: {
      background: colors.primary50,
      text: colors.primary300,
      border: colors.primary100,
    },
    outline: {
      background: "transparent",
      text: colors.primary600,
      border: colors.primary600,
    },
  },

  // Border colors
  border: colors.gray300,
  divider: colors.gray200,

  // Status colors
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,

  // Input fields
  inputBackground: colors.white,
  inputBorder: colors.gray300,
  inputText: colors.gray900,
  inputPlaceholder: colors.gray500,

  // Active state
  activeElement: colors.primary500,
  inactiveElement: colors.primary300,

  selectableCard: {
    default: {
      background: colors.white,
      border: colors.gray300,
      title: colors.gray900,
      description: colors.gray600,
    },
    selected: {
      background: colors.primary50,
      border: colors.primary600,
      title: colors.primary800,
      description: colors.primary700,
      checkIcon: colors.primary600,
    },
  },
  input: {
    default: {
      background: colors.primary50,
      border: colors.primary950,
      text: colors.primary800,
      placeholder: colors.primary800,
    },
    focused: {
      background: colors.primary200,
      border: colors.primary950,
      text: colors.primary900,
      placeholder: colors.primary900,
    },
    error: {
      background: colors.errorStyle.background,
      border: colors.errorStyle.border,
      text: colors.errorStyle.text,
      placeholder: colors.errorStyle.text,
    },
    disabled: {
      background: colors.gray100,
      border: colors.gray300,
      text: colors.gray400,
      placeholder: colors.gray400,
    },
  },
};

// Dark theme definition
export const darkTheme = {
  // Background colors
  backgroundColor: colors.gray900,
  surfaceColor: colors.gray800,
  cardBackground: colors.gray800,
  backgroundNavigation: colors.primary950,

  // Text colors
  textPrimary: colors.white,
  textSecondary: colors.gray300,
  textDisabled: colors.gray600,

  // UI element colors
  primary: colors.primary600,
  primaryLight: colors.primary700,
  primaryDark: colors.primary400,

  //separator
  separator: colors.gray200,

  // Button states
  button: {
    default: {
      background: colors.primary200,
      text: colors.gray900,
      border: colors.primary300,
    },
    hover: {
      background: colors.primary300,
      text: colors.gray900,
      border: colors.primary400,
    },
    active: {
      background: colors.primary500,
      text: colors.gray900,
      border: colors.primary600,
      shadow: colors.primary600,
    },
    disabled: {
      background: colors.primary900,
      text: colors.primary300,
      border: colors.primary800,
    },
    outline: {
      background: "transparent",
      text: colors.primary300,
      border: colors.primary300,
    },
  },

  // Border colors
  border: colors.gray700,
  divider: colors.gray700,

  // Status colors
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,

  // Input fields
  inputBackground: colors.gray800,
  inputBorder: colors.gray700,
  inputText: colors.white,
  inputPlaceholder: colors.gray500,

  // Active
  activeElement: colors.primary300,
  inactiveElement: colors.primary700,

  selectableCard: {
    default: {
      background: colors.gray800,
      border: colors.gray700,
      title: colors.white,
      description: colors.gray300,
    },
    selected: {
      background: colors.primary900,
      border: colors.primary400,
      title: colors.primary200,
      description: colors.primary300,
      checkIcon: colors.primary300,
    },
  },
  input: {
    default: {
      background: colors.gray800,
      border: colors.gray700,
      text: colors.white,
      placeholder: colors.gray500,
    },
    focused: {
      background: colors.gray800,
      border: colors.primary600,
      text: colors.white,
      placeholder: colors.gray500,
    },
    error: {
      background: colors.gray800,
      border: colors.error,
      text: colors.error,
      placeholder: colors.gray500,
    },
    disabled: {
      background: colors.gray700,
      border: colors.gray600,
      text: colors.gray500,
      placeholder: colors.gray500,
    },
  },
};

// Create a type based on the theme structure
export type Theme = typeof lightTheme;

// Default theme
export const defaultTheme = lightTheme;
