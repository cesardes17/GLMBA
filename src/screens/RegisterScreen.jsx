// /src/screens/RegistrationScreen.jsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import RegistrationForm from "../components/forms/RegistartionFrom";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, width: "100%" }}
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
