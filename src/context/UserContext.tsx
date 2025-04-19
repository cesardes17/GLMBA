import { createContext, useContext, useState, ReactNode } from "react";
import { Usuario } from "../types/usuario";
import { usuarioService } from "../services/usuarioService";
import { authService } from "../services/authService";
import { User } from "@supabase/supabase-js";

interface UserContextType {
  user: Usuario | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null; info: boolean }>;
  register: (email: string, password: string) => Promise<Error | null>;
  logout: () => void;
  getCurrentUserAuth: () => Promise<{
    data: { email: string; id: string } | null;
    error: Error | null;
  }>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await authService.login({
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
      return { error: error as Error, info: false };
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
      return { data: null, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  };

  const getCurrentUserAuth = async () => {
    try {
      const { data: authData, error } = await authService.getCurrentUser();
      if (error) {
        throw new Error(error);
      }
      if (!authData?.user?.email) {
        return { data: null, error: null };
      }
      console.log("Auth Data:", authData);

      // Ensure both email and id exist before returning
      const email = authData.user.email;
      const id = authData.user.id;

      if (!email || !id) {
        return { data: null, error: new Error("Invalid user data") };
      }

      return {
        data: { email, id },
        error: null,
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return { data: null, error: error as Error };
    }
  };

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, getCurrentUserAuth }}
    >
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
