// screens/SettingsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UniversalPicker from "../components/UniversalPicker";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import StyledButton from "../components/StyledButton";
import Separator from "../components/Separator";
const themeOptions = [
  { key: "system", label: "Preferencias del Sistema" },
  { key: "light", label: "Modo Claro" },
  { key: "dark", label: "Modo Oscuro" },
];

export default function SettingsScreen() {
  // Obtenemos el valor global y el setter desde el contexto.
  const { theme, userPreference, setUserPreference } = useTheme();
  const { user, userData, logout } = useAuth();

  const handleLogOut = () => {
    console.log("Cerrando sesión...");
    logout();
  };

  return (
    <View style={[styles.container]}>
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

      {user && (
        <>
          <Separator />
          <StyledButton
            title="Cerrar Sesión"
            onPress={handleLogOut}
            danger={true}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "75%",
    padding: 20,
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
