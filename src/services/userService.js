// /src/services/userService.js
import {
  getData,
  setData,
  updateData,
  deleteData,
} from './firebase/realtimeDatabaseService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const USERS_PATH = 'usuarios';

/**
 * Obtiene todos los usuarios del sistema
 * @returns {Promise<Object>} Object containing all users
 */
export const getAllUsers = async () => {
  return await getData(USERS_PATH);
};

/**
 * Obtiene los datos de un usuario por su UID.
 * @param {string} uid - UID del usuario.
 */
export const getUserData = async (uid) => {
  return await getData(`${USERS_PATH}/${uid}`);
};

/**
 * Crea un nuevo usuario en Firebase.
 * @param {Object} userData - Datos del usuario.
 */
export const registerUser = async (userData) => {
  try {
    // Crear usuario en Firebase Auth
    const { user } = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    // Construir datos para la base de datos
    const userToSave = {
      uid: user.uid,
      fullName: userData.fullName,
      email: userData.email,
      role: userData.role,
      ...(userData.role === 'jugador' && {
        jerseyNumber: userData.jerseyNumber,
        height: userData.height,
        favPosition: userData.favPosition,
      }),
    };

    // Guardar en Realtime Database
    return await setData(`${USERS_PATH}/${user.uid}`, userToSave);
  } catch (error) {
    console.error('Error registrando usuario:', error);
    throw error;
  }
};

/**
 * Actualiza los datos de un usuario en Firebase.
 * @param {string} uid - UID del usuario.
 * @param {Object} updatedData - Datos actualizados del usuario.
 */
export const updateUser = async (uid, updatedData) => {
  return await updateData(`${USERS_PATH}/${uid}`, updatedData);
};

/**
 * Elimina un usuario de Firebase.
 * @param {string} uid - UID del usuario.
 */
export const deleteUser = async (uid) => {
  return await deleteData(`${USERS_PATH}/${uid}`);
};

const ROLE_HIERARCHY = {
  organizador: ['co-organizador', 'jugador', 'capitan', 'espectador'],
  'co-organizador': ['jugador', 'capitan', 'espectador'],
};

/**
 * Gets all users that the logged-in user can manage based on role hierarchy
 * @param {string} currentUserRole - Role of the logged-in user
 * @returns {Promise<Array>} Filtered users array
 */
export const getManageableUsers = async (currentUserRole) => {
  try {
    const allUsers = await getAllUsers();
    if (!allUsers || !ROLE_HIERARCHY[currentUserRole]) {
      return [];
    }

    const managableRoles = ROLE_HIERARCHY[currentUserRole];
    return Object.values(allUsers).filter(user => 
      managableRoles.includes(user.role)
    );
  } catch (error) {
    console.error('Error getting manageable users:', error);
    throw error;
  }
};
