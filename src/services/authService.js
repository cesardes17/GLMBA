import { register as registerFirebase } from './firebase/authService';
export const registerUser = async (email, password) => {
  try {
    const user = await registerFirebase(email, password);
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
