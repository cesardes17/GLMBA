import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React, { useState, useEffect } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("Login Successful");
      })
      .catch((error) => {
        let errorMessage = "Login Failed";
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address";
            break;
          case "auth/user-disabled":
            errorMessage = "User account is disabled";
            break;
          case "auth/user-not-found":
          case "auth/wrong-password":
            errorMessage = "Invalid email or password";
            break;
          default:
            errorMessage = error.message;
        }
        Alert.alert("Error", errorMessage);
      });
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logged out successfully");
      })
      .catch((error) => {
        Alert.alert("Logout Failed", error.message);
      });
  };

  // Pantalla de carga
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Pantalla de bienvenida si el usuario está autenticado
  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, {user.email}</Text>
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#FF3B30" // Color personalizado para el botón de logout
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Pantalla de inicio de sesión
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      <Button
        title="Login"
        onPress={handleLogin}
        color="#007AFF" // Color personalizado para el botón de login
      />
      <StatusBar style="auto" />
    </View>
  );
}

// Estilos personalizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5", // Fondo claro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Color de texto oscuro
  },
  input: {
    height: 50,
    borderColor: "#CCC", // Borde gris claro
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FFF", // Fondo blanco para los inputs
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
});
