// /src/screens/LoginScreen.jsx
import React from "react";
import { View, Text } from "react-native-web";
import { useTheme } from "../hooks/useTheme";
import LoginForm from "../components/forms/LoginForm";
import Separator from "../components/Separator";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";

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
      <Separator />
      <Text style={{ color: theme.textColor }}>¿No tienes una cuenta?</Text>
      <Link href="/registration">
        <TouchableOpacity>
          <Text style={{ color: theme.textColor }}>Registrate</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
