import React, { useState } from "react";
import FormikRegistroForm from "../../components/forms/auth/FormikRegistroForm";
import { ActivityIndicator, View } from "react-native";
import StyledText from "../../components/common/StyledText";
import { useTheme } from "../../context/ThemeContext";
import StyledAlert from "../../components/common/StyledAlert";

export default function RegistroScreen() {
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
        <StyledText style={{ marginTop: 16 }}>Creando tu cuenta...</StyledText>
        <StyledAlert
          type="info"
          message="Recuerda que para completar el perfil primero debes iniciar sesión"
        />
      </View>
    );
  }

  return <FormikRegistroForm setLoading={setIsLoading} setError={setError} />;
}
