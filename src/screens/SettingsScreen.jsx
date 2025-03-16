// screens/SettingsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UniversalPicker from "../components/UniversalPicker";
import { useTheme } from "../hooks/useTheme";

const themeOptions = [
  { key: "system", label: "Preferencias del Sistema" },
  { key: "light", label: "Modo Claro" },
  { key: "dark", label: "Modo Oscuro" },
];

export default function SettingsScreen() {
  // Obtenemos el valor global y el setter desde el contexto.
  const { theme, userPreference, setUserPreference } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>
        Selecciona el tema:
      </Text>
      <UniversalPicker
        data={themeOptions}
        selectedValue={userPreference}
        onValueChange={setUserPreference}
      />
      <Text style={[styles.info, { color: theme.textColor }]}>
        Tema seleccionado: {userPreference}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  info: {
    marginTop: 20,
    fontSize: 16,
    alignSelf: "center",
  },
});
