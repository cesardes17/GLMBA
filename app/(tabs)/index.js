import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useAuth } from "../../src/hooks/useAuth";
import { useTheme } from "../../src/hooks/useTheme";

export default function HomePage() {
  const { theme } = useTheme();
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? (
        <>
          <Text style={{ color: theme.color }}>Bienvenido, {user.email}</Text>
          <Button title="Cerrar sesión" onPress={logout} />
        </>
      ) : (
        <Text style={{ color: theme.color }}>No hay usuario autenticado</Text>
      )}
    </View>
  );
}
