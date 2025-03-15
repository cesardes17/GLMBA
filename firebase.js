import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  initializeAuth,
  // eslint-disable-next-line import/named
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Configuración de Firebase
import firebaseConfig from "./config/firebaseConfig";
// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar Auth
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Persistencia configurada para web");
    })
    .catch((error) => {
      console.error("Error configurando persistencia para web:", error);
    });
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };
