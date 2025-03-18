import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "../theme/themes";
import { StatusBar } from "expo-status-bar";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [userPreference, setUserPreference] = useState("system"); // Por defecto "system"
  const [statusBarStyle, setStatusBarStyle] = useState("dark"); // Estado para actualizar la StatusBar

  // Obtener el tema correcto según la preferencia del usuario
  const getTheme = () => {
    if (userPreference === "system") {
      return systemColorScheme === "dark" ? themes.dark : themes.light;
    }
    return userPreference === "dark" ? themes.dark : themes.light;
  };

  // Actualizar `StatusBar` cuando cambie el esquema de colores
  useEffect(() => {
    const newStatusBarStyle = getTheme() === themes.dark ? "light" : "dark";
    setStatusBarStyle(newStatusBarStyle);
  }, [userPreference, systemColorScheme]);

  // Cargar la preferencia del usuario desde AsyncStorage al iniciar la app
  useEffect(() => {
    const loadUserPreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem("themePreference");
        if (storedPreference) {
          setUserPreference(storedPreference); // Aplica la preferencia guardada
        }
      } catch (error) {
        console.error("Error al cargar la preferencia del tema:", error);
      }
    };
    loadUserPreference();
  }, []);

  // Guardar la preferencia del usuario en AsyncStorage cada vez que cambie
  useEffect(() => {
    const saveUserPreference = async () => {
      try {
        await AsyncStorage.setItem("themePreference", userPreference);
      } catch (error) {
        console.error("Error al guardar la preferencia del tema:", error);
      }
    };
    saveUserPreference();
  }, [userPreference]);

  return (
    <ThemeContext.Provider
      value={{ theme: getTheme(), userPreference, setUserPreference }}
    >
      <StatusBar style={statusBarStyle} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
