import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import StyledAlert from "../../components/common/StyledAlert";
import FormikSetupProfileForm from "../../components/forms/auth/FormikSetupProfileForm";

export default function SetupProfileScreen() {
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
      <FormikSetupProfileForm setLoading={setIsLoading} setError={setError} />
    </View>
  );
}
