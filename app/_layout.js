// app/_layout.js
import React from "react";
import { ThemeProvider } from "../src/hooks/useTheme";
import { Slot } from "expo-router";
import { AuthProvider } from "../src/hooks/useAuth";

export default function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </AuthProvider>
  );
}
