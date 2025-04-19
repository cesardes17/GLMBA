import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { usuarioService } from "../services/usuarioService";
import { authService } from "../services/authService";
import { Usuario } from "../types/usuario";

interface UserContextType {
  user: { email: string; id: string } | null | Usuario;
  login: (email: string, password: string) => Promise<Error | null>;
  register: (email: string, password: string) => Promise<Error | null>;
  logout: () => Promise<Error | null>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<
    { email: string; id: string } | null | Usuario
  >(null);

  useEffect(() => {
    const { data: subscription } = authService.initializeAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          if (session?.user) {
            const { data: userData, error: userError } =
              await usuarioService.getUserByEmail(session.user.email);

            if (userError || !userData) {
              setUser({
                email: session.user.email,
                id: session.user.id,
              });
            } else {
              setUser(userData);
            }
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await authService.login({ email, password });

      if (error || !data || !data.user || !data.user.email || !data.user.id) {
        setUser(null);
        throw new Error(error || "error en el inicio de sesión");
      }

      const { data: userData, error: userError } =
        await usuarioService.getUserByEmail(data.user.email);

      if (userError || !userData) {
        setUser({ email: data.user.email, id: data.user.id });
        return null;
      }

      setUser(userData);
      return null;
    } catch (error) {
      return error as Error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { data, error } = await authService.register({ email, password });

      if (error) {
        throw new Error(error);
      }

      if (!data) {
        throw new Error("No data returned");
      }
      await logout();
      return null;
    } catch (error) {
      return error as Error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await authService.logout();
      return null;
    } catch (error) {
      return error as Error;
    }
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
