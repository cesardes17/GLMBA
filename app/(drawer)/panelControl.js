// /app/(tabs)/clasificacion.js
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import StyledText from "../../src/components/StyledText";
import Screen from "../../src/components/Screen";

export default function ClasificacionPage() {
  return (
    <Screen>
      <ActivityIndicator size="large" color="#05C484" />
      <StyledText style={styles.text}>
        Estamos trabajando en esta funcionalidad...
      </StyledText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});
