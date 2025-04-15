import { supabase, handleSupabaseError } from './supabase';
import { SignUpCredentials, SignInCredentials } from '../types/auth';

// Authentication services
export const authService = {
  // Sign up a new user
  signUp: async ({ email, password, nombre, apellidos }: SignUpCredentials) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // If signup successful, create user profile in the usuarios table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('usuarios')
          .insert({
            id: data.user.id,
            email,
            nombre,
            apellidos,
            rol_id: '00000000-0000-0000-0000-000000000000', // Default role ID - update this
            activo: true,
          });

        if (profileError) throw profileError;
      }

      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Sign in an existing user
  signIn: async ({ email, password }: SignInCredentials) => {
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
      const { error } = await supabase.auth.signOut();
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
        redirectTo: 'yourapp://reset-password',
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
};