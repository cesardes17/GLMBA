import { authService as supabaseAuthService } from "../api/authSupabase";
import { authCredentials } from "../types/auth";

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

  // Add this new method
  initializeAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabaseAuthService.initializeAuthStateChange(callback);
  },
};
