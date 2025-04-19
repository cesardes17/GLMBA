import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import StyledAlert from "../../components/common/StyledAlert";
import FormikLoginForm from "../../components/forms/auth/FormikLoginForm";
import StyledButton from "../../components/common/StyledButton";
import { router } from "expo-router";
import StyledText from "../../components/common/StyledText";

export default function LoginScreen() {
  // Changed name from RegistroScreen to LoginScreen
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { theme } = useTheme();

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StyledAlert type="error" message={error.message} />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FormikLoginForm setLoading={setIsLoading} setError={setError} />
      <View
        style={{
          minWidth: "80%",
          height: 2,
          backgroundColor: theme.separator,
          marginVertical: 20,
        }}
      />
      <StyledText variant="primary" style={{ marginBottom: 16 }}>
        ¿No tienes una cuenta?
      </StyledText>
      <StyledButton
        title="Registrarse"
        onPress={() => {
          router.replace("/registro");
        }}
        variant="outline"
      />
    </View>
  );
}
