// /app/(auth)/register.js
import React from "react";
import { Stack } from "expo-router";
import Screen from "../../src/components/Screen";
import RegistrationScreen from "../../src/screens/RegistrationScreen";

export default function RegisterPage() {
  return (
    <Screen>
      <Stack.Screen
        options={{
          title: "Registrate",
          headerBackTitleStyle: false,
        }}
      />
      <RegistrationScreen />
    </Screen>
  );
}
