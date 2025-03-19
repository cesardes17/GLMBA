// /src/screens/LoginScreen.jsx
import React from "react";
import Screen from "../components/Screen";
import { useTheme } from "../hooks/useTheme";
import LoginForm from "../components/forms/LoginForm";
import Separator from "../components/Separator";
import StyledButton from "../components/StyledButton";
import { Link, useRouter } from "expo-router";
import StyledText from "../components/StyledText";

export default function LoginScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <Screen>
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
      <Link href="/register" asChild>
        <StyledButton
          title="Regístrate"
          onPress={() => {
            console.log("Queriendo registrarse");
          }}
        />
      </Link>
    </Screen>
  );
}
