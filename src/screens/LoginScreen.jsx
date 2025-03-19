// /src/screens/LoginScreen.jsx
import React from "react";
import { View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import LoginForm from "../components/forms/LoginForm";
import Separator from "../components/Separator";
import StyledButton from "../components/StyledButton";
import { useRouter } from "expo-router";
import StyledText from "../components/StyledText";
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
      <StyledText
        style={{ color: theme.textColor, marginBottom: 10, fontSize: 34 }}
      >
        Inicia Sesión
      </StyledText>
      <LoginForm />
      <Separator />
      <StyledText style={{ color: theme.textColor, marginBottom: 10 }}>
        ¿No tienes una cuenta?
      </StyledText>
      <StyledButton
        title="Registrate"
        onPress={() => {
          router.push("/register");
        }}
      />
    </View>
  );
}
