import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { ThemeSelector } from "./theme/ThemeSelector";
import { router } from "expo-router";

export const ProfileScreen = () => {
  const { user, logout } = useUser();
  const { theme } = useTheme();

  const handleLogout = async () => {
    const result = await logout();
    if (!result) {
      router.replace("/");
    }
  };

  if (!user) {
    return null; // or return a loading state/error message
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {/* User Info Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Información del Usuario
        </Text>
        <View
          style={[styles.card, { backgroundColor: theme.backgroundNavigation }]}
        >
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Email
          </Text>
          <Text style={[styles.value, { color: theme.textPrimary }]}>
            {user.email}
          </Text>
          {"nombre" in user && (
            <>
              <Text style={[styles.label, { color: theme.textSecondary }]}>
                Nombre
              </Text>
              <Text style={[styles.value, { color: theme.textPrimary }]}>
                {user.nombre} {user.apellidos}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Theme Selector Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Tema de la Aplicación
        </Text>
        <ThemeSelector />
      </View>

      {/* Logout Button */}
      <Pressable
        style={[styles.logoutButton, { backgroundColor: theme.error }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
