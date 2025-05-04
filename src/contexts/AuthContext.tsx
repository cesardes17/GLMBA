// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '@coreServices/authService';

interface AuthContextProps {
  authUser: any;
  session: any;
  authloading: boolean;
  logoutInProgress: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [authloading, setAuthLoading] = useState(true);
  const [logoutInProgress, setLogoutInProgress] = useState(false);

  const saveAuthData = async (user: any, sessionData: any) => {
    try {
      await AsyncStorage.setItem('authUser', JSON.stringify(user));
      await AsyncStorage.setItem('session', JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error guardando datos de autenticación:', error);
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.removeItem('authUser');
      await AsyncStorage.removeItem('session');
    } catch (error) {
      console.error('Error limpiando datos de autenticación:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await AuthService.login({ email, password });
      if (res.error) {
        throw new Error(res.error);
      }

      const sessionRes = await AuthService.getSession();
      if (sessionRes.error) {
        throw new Error(sessionRes.error);
      }

      setAuthUser(res.data);
      setSession(sessionRes.data);
      await saveAuthData(res.data, sessionRes.data);
      return res;
    } catch (error) {
      console.error('Error en login:', error);
      return {
        data: null,
        error: (error as Error).message,
      };
    }
  };

  const register = async (email: string, password: string) => {
    const res = await AuthService.register({ email, password });
    if (!res.error) {
      setAuthUser(res.data); // Change from res.user to res.data
      const sessionRes = await AuthService.getSession();
      setSession(sessionRes.data); // Change from sessionRes.session to sessionRes.data
      await saveAuthData(res.data, sessionRes.data); // Change from res.user to res.data
    }
    return res;
  };

  const logout = async () => {
    setLogoutInProgress(true);
    await AuthService.logout();
    setAuthUser(null);
    setSession(null);
    await clearAuthData();
    setLogoutInProgress(false);
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data: sessionRes } = await AuthService.getSession();
        const { data: userRes } = await AuthService.getCurrentUser();

        setSession(sessionRes);
        setAuthUser(userRes);
        if (sessionRes && userRes) {
          await saveAuthData(userRes, sessionRes);
        }
      } catch (error) {
        console.error('Error cargando sesión inicial:', error);
      }
      setAuthLoading(false);
    };

    loadSession();

    // 🔁 Escuchar cambios de sesión
    const { data: listener } = AuthService.onAuthStateChange(
      (event, session) => {
        if (session) {
          setSession(session);
          setAuthUser(session.user);
          saveAuthData(session.user, session);
        } else {
          setSession(null);
          setAuthUser(null);
          clearAuthData();
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        session,
        authloading,
        login,
        register,
        logout,
        logoutInProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
