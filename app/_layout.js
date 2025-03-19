// /app/_layout.js
import React from "react";
import { Platform } from "react-native";
import { Slot, Stack } from "expo-router";
import { AppProvider } from "../src/hooks/useApp";
import { useTheme } from "../src/hooks/useTheme";

export default function Layout() {
  return (
    <AppProvider>
      <RootLayout />
    </AppProvider>
  );
}

function RootLayout() {
  const { theme } = useTheme();
  const isWeb = Platform.OS === "web";

  if (isWeb) {
    return <Slot />;
  }

  // En móviles, usar Stack
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.textColor,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="partido/[id]" />
    </Stack>
  );
}
