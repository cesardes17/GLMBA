// /src/hooks/useApp.js
import React from "react";
import { ThemeProvider, useTheme } from "./useTheme";
import { AuthProvider, useAuth } from "./useAuth";

// El AppProvider se encarga de envolver la aplicación con los providers de tema y autenticación.
export const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

// Además, si quieres facilitar el acceso a ambos contextos desde un solo hook,
// puedes crear un hook que los combine:
export const useApp = () => {
  const theme = useTheme();
  const auth = useAuth();
  return { theme, auth };
};
