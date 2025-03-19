// /app/(tabs)/partidos.js
import React from "react";
import GamesScreen from "../../src/screens/GamesScreen";
import { Stack } from "expo-router";
import Screen from "../../src/components/Screen";

export default function PartidosPage() {
  return (
    <Screen>
      <Stack.Screen
        options={{
          title: "Jornadas",
          headerBackTitleStyle: false,
        }}
      />
      <GamesScreen />;
    </Screen>
  );
}
