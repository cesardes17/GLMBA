import { supabase, handleSupabaseError } from "./supabase";
import { authCredentials } from "../types/auth";

export const authService = {
  // Sign up a new user
  signUp: async ({ email, password }: authCredentials) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error("User not created");

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Sign in an existing user
  signIn: async ({ email, password }: authCredentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Sign out the current user
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut({
        scope: "global", // This ensures all devices/tabs are signed out
      });
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Get the current user session
  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "yourapp://reset-password",
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Update user password
  updatePassword: async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Get current user
  getUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Add this new method
  initializeAuthStateChange: (
    callback: (event: string, session: any) => void
  ) => {
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
      });
      return { data: subscription, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
};
