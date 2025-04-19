import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { UserProvider } from "../src/context/UserContext";
import { useEffect } from "react";
import { authService } from "../src/api/authSupabase";

export default function RootLayout() {
  useEffect(() => {
    const { data: authListener } = authService.initializeAuthStateChange(
      (user) => {
        // Session state changes will be handled automatically
        console.log("Auth state changed:", user);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  return (
    <ThemeProvider>
      <UserProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </UserProvider>
    </ThemeProvider>
  );
}
