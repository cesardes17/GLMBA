import React from "react";
import { View, StyleSheet } from "react-native";
import {
  SelectableCardGroup,
  Option,
} from "../../components/SelectableCardGroup";
import { useTheme } from "../../context/ThemeContext";

export const ThemeSelector = () => {
  const { themeMode, setThemeMode } = useTheme();

  const themeOptions: Option[] = [
    {
      id: "system",
      title: "Sistema",
      description: "Usa el tema del sistema",
    },
    {
      id: "light",
      title: "Claro",
      description: "Usa el tema claro",
    },
    {
      id: "dark",
      title: "Oscuro",
      description: "Usa el tema oscuro",
    },
  ];

  const handleThemeSelect = (selectedTheme: string) => {
    setThemeMode(selectedTheme as "light" | "dark" | "system");
  };

  return (
    <View style={styles.container}>
      <SelectableCardGroup
        options={themeOptions}
        selectedId={themeMode}
        onSelect={handleThemeSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
