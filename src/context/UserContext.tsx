import { createContext, useContext, useState, ReactNode } from "react";
import { Usuario } from "../types/usuario";
import { authService } from "../api/authSupabase";
import { usuarioService } from "../services/usuarioService";

interface UserContextType {
  user: Usuario | null;
  login: (
    email: string,
    password: string
  ) => Promise<{
    error: Error | null;
    info: boolean;
  }>;
  register: (email: string, password: string) => Promise<Error | null>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await authService.signIn({
        email,
        password,
      });
      if (error) {
        throw new Error(error);
      }
      if (!data || !data.user) {
        throw new Error("No data returned");
      }
      if (!data.user.email) {
        throw new Error("No email returned");
      }
      const { data: userData, error: userError } =
        await usuarioService.getUserByEmail(data.user.email);
      if (userError) {
        throw new Error(userError.message);
      }
      if (!userData) {
        return { error: null, info: true };
      }

      setUser(userData);
      return { error: null, info: false }; // Added info: false here
    } catch (error) {
      await logout();
      return { error: error as Error, info: false };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { data, error } = await authService.signUp({ email, password });

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
      await authService.signOut();
      return { data: null, error: null };
    } catch (error) {
      return { data: null, error: error };
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
