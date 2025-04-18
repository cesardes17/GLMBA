import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import { SelectableCardGroup } from "../components/SelectableCardGroup";

const THEME_STORAGE_KEY = "@app_theme_mode";

const themeOptions = [
  {
    id: "system",
    title: "Sistema",
    description: "Usar el tema del sistema",
  },
  {
    id: "light",
    title: "Modo Claro",
    description: "Usar tema claro",
  },
  {
    id: "dark",
    title: "Modo Oscuro",
    description: "Usar tema oscuro",
  },
];

export const SettingsScreen = () => {
  const { theme, themeMode, setThemeMode } = useTheme();

  useEffect(() => {
    loadStoredTheme();
  }, []);

  const loadStoredTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme) {
        setThemeMode(storedTheme as "light" | "dark" | "system");
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const handleThemeSelect = async (selectedTheme: string) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
      setThemeMode(selectedTheme as "light" | "dark" | "system");
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SelectableCardGroup
        options={themeOptions}
        selectedId={themeMode}
        onSelect={handleThemeSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
