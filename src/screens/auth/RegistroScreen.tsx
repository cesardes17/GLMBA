import React, { useState } from "react";
import FormikRegistroForm from "../../components/forms/auth/FormikRegistroForm";
import { ActivityIndicator, View } from "react-native";
import StyledText from "../../components/common/StyledText";
import { useTheme } from "../../context/ThemeContext";

export default function RegistroScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.primary} />
        <StyledText style={{ marginTop: 16 }}>Creando tu cuenta...</StyledText>
      </View>
    );
  }

  return <FormikRegistroForm setLoading={setIsLoading} />;
}
