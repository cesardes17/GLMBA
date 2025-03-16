// app/_layout.js
import React from "react";
import { ThemeProvider } from "../src/hooks/useTheme";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Slot />
    </ThemeProvider>
  );
}
