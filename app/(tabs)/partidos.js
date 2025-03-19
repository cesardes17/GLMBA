// /app/(tabs)/partidos.js
import React from "react";
import GamesScreen from "../../src/screens/GamesScreen";
import { Stack, Tabs } from "expo-router";
import Screen from "../../src/components/Screen";

export default function PartidosPage() {
  return (
    <Screen>
      <Tabs.Screen options={{ headerShown: true }} />
      <GamesScreen />;
    </Screen>
  );
}
