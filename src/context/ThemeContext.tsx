import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";
import { lightTheme, darkTheme, Theme } from "../theme/theme";

type ThemeContextType = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: "light" | "dark" | "system") => void;
  themeMode: "light" | "dark" | "system";
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get the system color scheme
  const systemColorScheme = useColorScheme();

  // Theme mode can be 'light', 'dark', or 'system'
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    "system"
  );

  // Determine if dark mode is active based on theme mode and system settings
  const isDarkMode =
    themeMode === "system"
      ? systemColorScheme === "dark"
      : themeMode === "dark";

  // Set the active theme based on dark mode state
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setThemeMode(isDarkMode ? "light" : "dark");
  };

  // Listen for system theme changes if in 'system' mode
  useEffect(() => {
    if (themeMode !== "system") return;

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // This will trigger a re-render with the new system theme
    });

    return () => {
      subscription.remove();
    };
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleTheme,
        themeMode,
        setThemeMode,
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
