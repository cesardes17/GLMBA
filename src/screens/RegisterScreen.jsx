// /src/screens/RegistrationScreen.jsx
import React from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import RegistrationForm from "../components/forms/RegistartionFrom";

export default function RegisterScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, width: Platform.OS ==="web"? "50%" : "100%", alignSelf: "center", backgroundColor: theme.background     }}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled" // ✅ Cierra teclado al tocar fuera
    >
      <RegistrationForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16, // ✅ Espaciado para evitar que el contenido quede pegado
  },
});
