// /src/services/userService.js
import {
  getData,
  setData,
  updateData,
  deleteData,
} from "./firebase/realtimeDatabaseService";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

/**
 * Obtiene los datos de un usuario por su UID.
 * @param {string} uid - UID del usuario.
 */
export const getUserData = async (uid) => {
  return await getData(`usuarios/${uid}`);
};

/**
 * Crea un nuevo usuario en Firebase.
 * @param {string} uid - UID del usuario.
 * @param {Object} userData - Datos del usuario.
 */
export const registerUser = async (userData) => {
  try {
    console.log("Registrando usuario:", userData);
    // Crear usuario en Firebase Auth
    const { user } = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    console.log("Usuario creado en Auth:", user);
    // Construir datos para la base de datos
    const userToSave = {
      uid: user.uid,
      fullName: userData.fullName,
      email: userData.email,
      role: userData.role,
      jerseyNumber: userData.role === "jugador" ? userData.jerseyNumber : null,
      height: userData.role === "jugador" ? userData.height : null,
      favPosition: userData.role === "jugador" ? userData.favPosition : null,
    };

    // Guardar en Realtime Database
    const saved = await setData(`usuarios/${user.uid}`, userToSave);
    return saved;
  } catch (error) {
    console.error("Error registrando usuario:", error);
    return false;
  }
};

/**
 * Actualiza los datos de un usuario en Firebase.
 * @param {string} uid - UID del usuario.
 * @param {Object} updatedData - Datos actualizados del usuario.
 */
export const updateUser = async (uid, updatedData) => {
  return await updateData(`usuarios/${uid}`, updatedData);
};

/**
 * Elimina un usuario de Firebase.
 * @param {string} uid - UID del usuario.
 */
export const deleteUser = async (uid) => {
  return await deleteData(`usuarios/${uid}`);
};
