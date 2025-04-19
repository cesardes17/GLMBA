import { authService as supabaseAuthService } from "../api/authSupabase";
import { authCredentials } from "../types/auth";

// Authentication service that uses the Supabase implementation
export const authService = {
  // Register a new user
  register: async (credentials: authCredentials) => {
    return await supabaseAuthService.signUp(credentials);
  },

  // Login an existing user
  login: async (credentials: authCredentials) => {
    return await supabaseAuthService.signIn(credentials);
  },

  // Logout the current user
  logout: async () => {
    return await supabaseAuthService.signOut();
  },

  // Get the current session
  getCurrentSession: async () => {
    return await supabaseAuthService.getSession();
  },

  // Get the current user
  getCurrentUser: async () => {
    return await supabaseAuthService.getUser();
  },

  // Request password reset
  requestPasswordReset: async (email: string) => {
    return await supabaseAuthService.resetPassword(email);
  },

  // Update user password
  updatePassword: async (newPassword: string) => {
    return await supabaseAuthService.updatePassword(newPassword);
  },
};
