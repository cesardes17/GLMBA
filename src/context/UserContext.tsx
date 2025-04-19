import { createContext, useContext, useState, ReactNode } from "react";
import { Usuario } from "../types/usuario";
import { authService } from "../api/authSupabase";

interface UserContextType {
  user: Usuario | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<Error | null>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  const login = async (email: string, password: string) => {
    try {
      throw new Error("Not implemented");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
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
