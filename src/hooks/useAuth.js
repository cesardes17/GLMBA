// /src/hooks/useAuth.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getUserData } from "../servicies/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    userData: null,
    loading: true,
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const fetchUserData = async (uid) => {
      try {
        // 🔹 Obtener datos desde AsyncStorage primero
        const cachedUserData = await AsyncStorage.getItem("user");
        let userData = cachedUserData ? JSON.parse(cachedUserData) : null;

        // 🔹 Hacer la consulta a Firestore solo si no hay datos en caché
        if (!userData) {
          userData = await getUserData(uid);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
        }

        if (isMountedRef.current) {
          setAuthState((prev) => ({ ...prev, userData }));
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMountedRef.current) return;

      if (currentUser) {
        setAuthState({ user: currentUser, userData: null, loading: true });
        await fetchUserData(currentUser.uid);
      } else {
        setAuthState({ user: null, userData: null, loading: false });
        await AsyncStorage.removeItem("user");
      }
    });

    return () => {
      isMountedRef.current = false;
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthState({ user: null, userData: null, loading: false });
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setUserData: (data) =>
          setAuthState((prev) => ({ ...prev, userData: data })),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
