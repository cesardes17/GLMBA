// /app/_layout.js
import React, { useEffect, useState } from "react";
import { useWindowDimensions, Platform, View } from "react-native";
import { Slot } from "expo-router";
import { AuthProvider } from "../src/hooks/useAuth";
import { ThemeProvider } from "../src/hooks/useTheme";

export default function Layout() {
  const { width } = useWindowDimensions();
  const [useDrawer, setUseDrawer] = useState(
    width >= 1024 || Platform.OS === "web"
  );

  useEffect(() => {
    setUseDrawer(width >= 1024 || Platform.OS === "web");
  }, [width]);

  return (
    <AuthProvider>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </ThemeProvider>
    </AuthProvider>
  );
}
