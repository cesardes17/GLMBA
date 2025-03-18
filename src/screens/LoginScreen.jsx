// /src/screens/LoginScreen.jsx
import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";
import LoginForm from "../components/forms/LoginForm";
import Separator from "../components/Separator";
import StyledButton from "../components/StyledButton";
import { router, useRouter } from "expo-router";

export default function LoginScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: theme.textColor, marginBottom: 10, fontSize: 34 }}>
        Inicia Sesión
      </Text>
      <LoginForm />
      <Separator />
      <Text style={{ color: theme.textColor, marginBottom: 10 }}>
        ¿No tienes una cuenta?
      </Text>
      <StyledButton
        title="Registrate"
        onPress={() => {
          router.push("/registration");
        }}
      />
    </View>
  );
}
