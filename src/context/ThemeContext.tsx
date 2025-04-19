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
  const [themeMode, setThemeModeState] = useState<"light" | "dark" | "system">(
    "system"
  );

  // Load stored theme on mount
  useEffect(() => {
    const loadStoredTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (
          storedTheme === "light" ||
          storedTheme === "dark" ||
          storedTheme === "system"
        ) {
          setThemeModeState(storedTheme);
        } else {
          setThemeModeState("system"); // Explicitly set to system if nothing is stored
        }
      } catch (error) {
        console.error("Error loading theme:", error);
        setThemeModeState("system");
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

  // Persist theme mode to storage and update state
  const setThemeMode = async (mode: "light" | "dark" | "system") => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? "light" : "dark";
    await setThemeMode(newTheme);
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
