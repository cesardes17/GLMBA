// components/HeaderRight.js
import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HeaderRight() {
  const isAuthenticated = false;
  const navigation = useNavigation();

  const handlePress = () => {
    if (isAuthenticated) {
      // Navega a la pantalla de perfil o abre un menú de opciones
      navigation.navigate("Profile");
    } else {
      // Navega a la pantalla de inicio de sesión
      navigation.navigate("Login");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginRight: 10 }}>
      {isAuthenticated ? (
        <Ionicons name="person-circle-outline" size={24} color="#fff" />
      ) : (
        <Text style={{ color: "#fff" }}>Iniciar Sesión</Text>
      )}
    </TouchableOpacity>
  );
}
