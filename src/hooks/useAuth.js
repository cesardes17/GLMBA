// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Creamos el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Escuchar el estado de autenticación en Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Guardar el estado en AsyncStorage para persistencia
      if (currentUser) {
        await AsyncStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        await AsyncStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("user"); // Eliminar usuario de AsyncStorage
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
