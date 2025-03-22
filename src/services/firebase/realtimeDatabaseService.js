import { database } from '../../../firebase';
import { ref, set, get, update, remove } from 'firebase/database';

/**
 * Obtiene datos de una referencia en Firebase.
 * @param {string} path - Ruta en la base de datos (ej. "usuarios/user_001").
 */
export const getData = async (path) => {
  try {
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error(`Error obteniendo datos de ${path}:`, error);
    return null;
  }
};

/**
 * Guarda datos en Firebase.
 * @param {string} path - Ruta en la base de datos.
 * @param {Object} data - Datos a guardar.
 */
export const setData = async (path, data) => {
  try {
    await set(ref(database, path), data);
    return true;
  } catch (error) {
    console.error(`Error guardando datos en ${path}:`, error);
    return false;
  }
};

/**
 * Actualiza datos en Firebase.
 * @param {string} path - Ruta en la base de datos.
 * @param {Object} data - Datos a actualizar.
 */
export const updateData = async (path, data) => {
  try {
    await update(ref(database, path), data);
    return true;
  } catch (error) {
    console.error(`Error actualizando datos en ${path}:`, error);
    return false;
  }
};

/**
 * Elimina datos de Firebase.
 * @param {string} path - Ruta en la base de datos.
 */
export const deleteData = async (path) => {
  try {
    await remove(ref(database, path));
    return true;
  } catch (error) {
    console.error(`Error eliminando datos en ${path}:`, error);
    return false;
  }
};
