// theme/themes.js
import { colors } from "./colors";

export const themes = {
  light: {
    background: colors.lightBackground,
    color: colors.color950,
    colorIcon: colors.color500,
    inactiveIconColor: colors.color200,
    borderColor: colors.color800,
    // Puedes añadir más propiedades como buttonColor, borderColor, etc.
  },
  dark: {
    background: colors.darkBackground,
    color: colors.color200,
    colorIcon: colors.color500,
    inactiveIconColor: colors.color200,
    borderColor: colors.color300,

    // Añade más propiedades según necesites
  },
};
