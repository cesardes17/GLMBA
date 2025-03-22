import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { auth } from '../../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserData } from '../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const USER_STORAGE_KEY = 'user';

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    userData: null,
    loading: true,
  });

  const isMountedRef = useRef(true);

  // Optimized fetchUserData with useCallback
  const fetchUserData = useCallback(async (uid) => {
    try {
      const cachedUserData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      let userData = cachedUserData ? JSON.parse(cachedUserData) : null;

      if (!userData || userData.uid !== uid) {
        userData = await getUserData(uid);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      }

      if (isMountedRef.current) {
        setAuthState((prev) => ({ ...prev, userData, loading: false }));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Optimized logout with useCallback
  const logout = useCallback(async () => {
    try {
      await Promise.all([
        signOut(auth),
        AsyncStorage.removeItem(USER_STORAGE_KEY),
      ]);
      setAuthState({ user: null, userData: null, loading: false });
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  }, []);

  // Optimized setUserData with useCallback
  const setUserData = useCallback((data) => {
    setAuthState((prev) => ({ ...prev, userData: data }));
    AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data)).catch(
      (error) => console.error('Error saving user data:', error)
    );
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMountedRef.current) return;

      if (currentUser) {
        setAuthState((prev) => ({ ...prev, user: currentUser, loading: true }));
        await fetchUserData(currentUser.uid);
      } else {
        setAuthState({ user: null, userData: null, loading: false });
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
      }
    });

    return () => {
      isMountedRef.current = false;
      unsubscribe();
    };
  }, [fetchUserData]);

  const value = {
    ...authState,
    setUserData,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
