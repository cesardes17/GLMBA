// theme/themes.js
import { colors } from "./colors";

export const themes = {
  light: {
    background: colors.lightBackground,
    color: colors.color500,
    colorIcon: colors.color700,
    inactiveIconColor: colors.color500,
    borderColor: colors.color800,
    textColor: colors.color950,
    //boton
    buttonbackgroundColor: colors.color200,
    buttonTextColor: colors.color950,
    buttonBorderColor: colors.color950,
    // Inputs
    inputBackgroundColor: colors.color050,
    inputBorderColor: colors.color500,
    inputTextColor: colors.color950,
    inputFocusedBackgroundColor: colors.color200,
  },
  dark: {
    background: colors.darkBackground,
    color: colors.color500,
    colorIcon: colors.color500,
    inactiveIconColor: colors.color700,
    borderColor: colors.color300,
    textColor: colors.color200,
    //boton
    buttonbackgroundColor: colors.color200,
    buttonTextColor: colors.color950,
    buttonBorderColor: colors.color950,
    // Inputs
    inputBackgroundColor: colors.color050,
    inputBorderColor: colors.color500,
    inputTextColor: colors.color950,
    inputFocusedBackgroundColor: colors.color200,
    inputErrorBackgroundColor: colors.errorLight,
    inputErrorBorderColor: colors.errorStrong,
    inputErrorTextColor: colors.errorText,
  },
};
