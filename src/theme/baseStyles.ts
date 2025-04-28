// src/theme/baseStyles.ts
import { colors } from './colors';

export const baseButtonStyles = {
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
    background: 'transparent',
    text: colors.primary600,
    border: colors.primary600,
  },
  danger: {
    background: colors.error,
    text: colors.white,
    border: colors.error,
  },
  dangerActive: {
    background: colors.errorStyle.text, // Un rojo más intenso, puedes ajustar el color si lo prefieres
    text: colors.white,
    border: colors.errorStyle.border,
    shadow: colors.errorStyle.border,
  },
};

export const baseInputStyles = {
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
};
