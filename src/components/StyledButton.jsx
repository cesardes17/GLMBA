import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { colors } from "../theme/colors";

export default function StyledButton({
  title,
  onPress,
  disabled = false,
  danger = false, // Para acciones peligrosas (ej. eliminar)
  style = {},
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        disabled && styles.disabledButton,
        danger ? styles.dangerButton : styles.defaultButton,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          disabled && styles.disabledText,
          danger && styles.dangerText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10, // 🔹 Fijo según tu preferencia
    alignItems: "center",
    justifyContent: "center",
    minWidth: 150,
    borderWidth: 2, // 🔹 Bordes visibles
    borderColor: "#000", // 🔹 De momento fijo en negro
    elevation: 3, // 🔹 Sombras en Android
    shadowColor: "#000", // 🔹 Sombras en iOS
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  defaultButton: {
    backgroundColor: colors.color200, // 🔹 Default
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  disabledButton: {
    backgroundColor: colors.color100, // 🔹 Color más claro para deshabilitado
    borderColor: colors.color300, // 🔹 Borde más suave
  },
  disabledText: {
    color: colors.color400, // 🔹 Más claro que el fondo para contraste
  },
  dangerButton: {
    backgroundColor: "red", // 🔹 Ajustable según preferencia
    borderColor: "#000",
  },
  dangerText: {
    color: "#fff",
  },
});
