// /src/components/Screen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
// Componente Screen que ocupa todo el espacio disponible de la pantalla
const Screen = ({ children, style, ...props }) => {
  const { theme } = useTheme();
  return (
    <View
      style={[styles.container, style, { backgroundColor: theme.background }]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Screen;
