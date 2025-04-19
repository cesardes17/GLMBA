import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { UserProvider } from "../src/context/UserContext";

export default function RootLayout() {
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
