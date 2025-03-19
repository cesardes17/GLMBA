// /app/(drawer)/partido/[id].js
import React from "react";
import { StyleSheet } from "react-native";
import StyledText from "../../../src/components/StyledText";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "../../../src/hooks/useTheme";
import Screen from "../../../src/components/Screen";
export default function DetallePartido() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();

  return (
    <Screen style={styles.container}>
      <StyledText style={(styles.title, { color: theme.textColorr })}>
        Detalle del Partido
      </StyledText>
      <StyledText style={(styles.title, { color: theme.textColorr })}>
        ID del partido: {id}
      </StyledText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
  },
});
