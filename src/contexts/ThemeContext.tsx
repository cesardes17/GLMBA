// src/context/themeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import { Theme, darkTheme, lightTheme } from '@/src/theme/theme';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: Theme;
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const THEME_KEY = 'user_theme_preference';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>('system');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Función para aplicar el tema según preferencia y esquema
  const applyTheme = (
    preference: ThemePreference,
    scheme: ColorSchemeName | null
  ) => {
    if (preference === 'system') {
      setIsDark(scheme === 'dark');
    } else {
      setIsDark(preference === 'dark');
    }
  };

  // Inicialización del tema
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        const initialPreference: ThemePreference =
          stored === 'light' || stored === 'dark' ? stored : 'system';
        setThemePreferenceState(initialPreference);
        applyTheme(initialPreference, systemColorScheme);
      } catch (e) {
        // Si hay error, usar system como fallback
        setThemePreferenceState('system');
        applyTheme('system', systemColorScheme);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, [systemColorScheme]);

  // Función pública para cambiar la preferencia de tema
  const handleSetThemePreference = async (preference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, preference);
      setThemePreferenceState(preference);
      applyTheme(preference, Appearance.getColorScheme());
    } catch (error) {
      // Manejar error si es necesario
      console.error('Error al guardar la preferencia de tema:', error);
    }
  };

  // Cargar preferencia guardada solo una vez al montar
  useEffect(() => {
    const loadThemePreference = async () => {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      const pref: ThemePreference =
        stored === 'light' || stored === 'dark' ? stored : 'system';
      setThemePreferenceState(pref);
      applyTheme(pref, systemColorScheme);
    };
    loadThemePreference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo al montar

  // Actualizar tema si cambia el esquema del sistema y la preferencia es 'system'
  useEffect(() => {
    if (themePreference === 'system') {
      setIsDark(systemColorScheme === 'dark');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemColorScheme, themePreference]);

  // Listener para cambios en el sistema solo si la preferencia es 'system'
  useEffect(() => {
    if (themePreference === 'system') {
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        applyTheme('system', colorScheme);
      });
      return () => {
        listener.remove();
      };
    }
  }, [themePreference]);

  if (isLoading) {
    return null; // O un componente de carga si lo prefieres
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? darkTheme : lightTheme,
        themePreference,
        setThemePreference: handleSetThemePreference,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext debe usarse dentro de ThemeProvider');
  }
  return context;
};
