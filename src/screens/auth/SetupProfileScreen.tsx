import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import StyledAlert from "../../components/common/StyledAlert";
import FormikSetupProfileForm from "../../components/forms/auth/FormikSetupProfileForm";
import StyledText from "../../components/common/StyledText";
import { useUser } from "../../context/UserContext";
import { router } from "expo-router";
import { isUsuario } from "../../types/usuario";

export default function SetupProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { theme } = useTheme();
  const { user } = useUser();

  useEffect(() => {
    if (user && isUsuario(user)) {
      // If user has a complete profile, redirect to profile screen
      router.replace("/profile");
    }
  }, [user]);

  if (!user) {
    return null;
  }

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
      <StyledText>Bienvenido, Completa el registro{user.email}</StyledText>
      <FormikSetupProfileForm setLoading={setIsLoading} setError={setError} />
    </View>
  );
}
