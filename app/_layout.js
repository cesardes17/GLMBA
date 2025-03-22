// /app/_layout.js
import React from "react";
import { Platform } from "react-native";
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
  const isWeb = Platform.OS === 'web';

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.textColor,
      }}
    >
      {isWeb ? (
        <Stack.Screen
          name="(drawer)"
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      )}
      
      <Stack.Screen
        name="(routes)/(auth)/login"
        options={{ headerTitle: "Inicia Sesión", headerBackTitle:"Volver" }}
      />
      <Stack.Screen
        name="(routes)/(auth)/register"
        options={{ headerTitle: "Crea una Cuenta", headerBackTitle:"Volver"  }}
      />
    </Stack>
  );
}
