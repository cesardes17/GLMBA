import { Stack } from "expo-router";

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
  return (
    <Stack.Screen
      options={{
        title: title,
        headerShown: true,
        headerBackVisible: showBackButton,
        headerBackTitle: backTitle,
        headerTitleAlign: "center",
      }}
    />
  );
}
