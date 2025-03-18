import { useRouter, Slot } from "expo-router";
import { useAuth } from "../../../src/hooks/useAuth";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "../../../src/hooks/useTheme";

export default function AuthLayout() {
  const router = useRouter();
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      router.replace("/"); // 🔹 Redirige a Home si el usuario ya está autenticado
    }
  }, [user, router]);

  // 🔹 Muestra un indicador de carga mientras se verifica el usuario
  if (user) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#05C484" />
      </View>
    );
  }

  return <Slot />;
}
