// /app/_layout.js
import React from "react";
import { Stack } from "expo-router";
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

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.textColor,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Volver", headerShown: false }}
      />

      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="partido/[id]"
        options={{
          title: "Detalle Partido",
          headerBackTitleStyle: false,
        }}
      />
    </Stack>
  );
}
