import React from "react";
import { View, StyleSheet } from "react-native";

export default function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1, // Grosor del separador
    width: "100%", // Ocupar todo el ancho disponible
    backgroundColor: "#ccc", // Color gris por defecto
    marginVertical: 10, // Espaciado arriba y abajo
  },
});
