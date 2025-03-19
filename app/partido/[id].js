// /app/partido/[id].js
import React from "react";
import { StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import StyledText from "../../src/components/StyledText";
import Screen from "../../src/components/Screen";

export default function DetallePartido() {
  const { id } = useLocalSearchParams();

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: "Detalle Partido",
          headerBackTitleStyle: false,
        }}
      />
      <StyledText style={styles.title}>Detalle del Partido</StyledText>
      <StyledText style={styles.detail}>ID del partido: {id}</StyledText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
  },
});
