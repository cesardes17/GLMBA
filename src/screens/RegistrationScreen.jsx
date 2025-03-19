// /src/screens/LoginScreen.jsx
import React from "react";
import { View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import RegistrationForm from "../components/forms/RegistartionFrom";
import Separator from "../components/Separator";
import { useRouter } from "expo-router";
import StyledButton from "../components/StyledButton";
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
        Registro
      </StyledText>
      <RegistrationForm />
      <Separator />
      <StyledText style={{ color: theme.textColor, marginBottom: 10 }}>
        ¿Tienes una cuenta?
      </StyledText>
      <StyledButton
        title="Iniciar sesión"
        onPress={() => {
          router.push("/login");
        }}
      />
    </View>
  );
}
