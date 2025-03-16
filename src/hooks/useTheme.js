// hooks/useTheme.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { themes } from "../theme/themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Valor de preferencia del usuario: "system", "light" o "dark"
  const [userPreference, setUserPreference] = useState("system");
  const systemColorScheme = useColorScheme();

  const getTheme = () => {
    if (userPreference === "system") {
      return systemColorScheme === "dark" ? themes.dark : themes.light;
    }
    return userPreference === "dark" ? themes.dark : themes.light;
  };

  // Si la preferencia es "system", el tema se actualiza automáticamente
  useEffect(() => {
    // No es necesario cambiar nada aquí, ya que getTheme() se basa en systemColorScheme
  }, [systemColorScheme, userPreference]);

  return (
    <ThemeContext.Provider
      value={{ theme: getTheme(), setUserPreference, userPreference }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
