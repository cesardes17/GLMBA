// /src/screens/ProfileScreen.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";
import StyledText from "../components/StyledText";
import Screen from "../components/Screen";
import ThemePicker from "../components/ThemePicker";
import Separator from "../components/Separator";
export default function ProfileScreen() {
  const { user, userData } = useAuth();

  return (
    <Screen>
      <View style={{ padding: 16 }}>
        {/* 🔹 Sección de información del usuario */}
        <View style={styles.infoContainer}>
          <StyledText style={styles.label}>Nombre:</StyledText>
          <StyledText style={styles.value}>
            {userData?.fullName || "No disponible"}
          </StyledText>

          <StyledText style={styles.label}>Email:</StyledText>
          <StyledText style={styles.value}>
            {user?.email || "No disponible"}
          </StyledText>

          <StyledText style={styles.label}>Rol:</StyledText>
          <StyledText style={styles.value}>
            {userData?.role || "Usuario"}
          </StyledText>
        </View>

        <Separator />

        <View style={styles.themeContainer}>
          <ThemePicker />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  themeContainer: {
    marginTop: 20,
  },
});
