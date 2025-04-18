import { Stack } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

interface HeaderConfigProps {
  title?: string;
  showBackButton?: boolean;
  backTitle?: string;
}

export function HeaderConfig({
  title,
  showBackButton = true,
  backTitle = "Inicio",
}: HeaderConfigProps) {
  const { theme } = useTheme();
  return (
    <Stack.Screen
      options={{
        title: title,
        headerShown: true,
        headerBackVisible: showBackButton,
        headerBackTitle: backTitle,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        headerTintColor: theme.textPrimary,
      }}
    />
  );
}
