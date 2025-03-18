import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getUserData } from "../servicies/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // 🔹 Variable para verificar si el componente está montado

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return; // Evita la actualización si el componente está desmontado

      if (currentUser) {
        setUser(currentUser);

        try {
          const userInfo = await getUserData(currentUser.uid);
          if (isMounted) {
            setUserData(userInfo);
            await AsyncStorage.setItem("user", JSON.stringify(userInfo));
          }
        } catch (error) {
          console.error("Error obteniendo datos del usuario:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
        await AsyncStorage.removeItem("user");
      }

      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false; // 🔹 Marcamos el componente como desmontado al limpiar el efecto
      unsubscribe();
    };
  }, []);

  // 🔹 Función de logout protegida contra actualizaciones en componentes desmontados
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userData, setUserData, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
