import React from "react";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import StyledText from "./StyledText";
import { useTheme } from "../hooks/useTheme";

export default function HeaderRight() {
  const { theme } = useTheme();
  return (
    <Link href="/" style={{ marginRight: 20 }}>
      <TouchableOpacity>
        <StyledText style={styles.appTitle}> GLMBA</StyledText>
      </TouchableOpacity>
    </Link>
  );
}
const styles = {
  appTitle: {
    fontSize: 20, // Tamaño grande pero sin ser exagerado
    fontWeight: "bold", // Fuente en negrita para destacar
    letterSpacing: 1, // Espaciado entre letras para mejor legibilidad
    textTransform: "uppercase", // Convertir a mayúsculas para un diseño más limpio
    textShadowColor: "rgba(0, 0, 0, 0.2)", // Ligero sombreado
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
};
