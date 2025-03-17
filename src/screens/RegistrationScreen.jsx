// /src/screens/LoginScreen.jsx
import React from "react";
import { View } from "react-native-web";
import { useTheme } from "../hooks/useTheme";
import RegistrationForm from "../components/forms/RegistartionFrom";

export default function LoginScreen() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RegistrationForm />
    </View>
  );
}
