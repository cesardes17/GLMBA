import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";
import { lightTheme, darkTheme, Theme } from "../theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: "light" | "dark" | "system") => void;
  themeMode: "light" | "dark" | "system";
  currentThemeStyle: "light" | "dark"; // Add this new property
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@app_theme_mode";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    "system"
  );

  // Load stored theme on mount
  useEffect(() => {
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

    loadStoredTheme();
  }, []);

  // Determine if dark mode is active based on theme mode and system settings
  const isDarkMode =
    themeMode === "system"
      ? systemColorScheme === "dark"
      : themeMode === "dark";

  const theme = isDarkMode ? darkTheme : lightTheme;
  const currentThemeStyle = isDarkMode ? "dark" : "light";

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? "light" : "dark";
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeMode(newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleTheme,
        themeMode,
        setThemeMode,
        currentThemeStyle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
