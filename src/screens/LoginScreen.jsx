// /src/screens/LoginScreen.jsx
import React from "react";
import { View, Text } from "react-native-web";
import { useTheme } from "../hooks/useTheme";
import LoginForm from "../components/forms/LoginForm";

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
      <LoginForm />
    </View>
  );
}
