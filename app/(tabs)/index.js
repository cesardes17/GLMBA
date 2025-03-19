// /app/index.js
import React from "react";
import Screen from "../../src/components/Screen";
import StyledText from "../../src/components/StyledText";
import { Stack } from "expo-router";

export default function HomePage() {
  return (
    <Screen>
      <Stack.Screen
        options={{
          title: "Inicio",
        }}
      />
      <StyledText>Inicio</StyledText>
    </Screen>
  );
}
