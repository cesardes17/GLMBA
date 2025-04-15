import { authService } from './authService';
import { databaseService } from './databaseService';
import { Usuario } from '../types/usuario';
import { SignUpCredentials } from '../types/auth';


export const usuarioService = {
  // Create a new user (registers in auth and adds to usuarios table)
  createUsuario: async (userData: SignUpCredentials) => {
    try {
      // Check if user already exists
      const existingUser = await usuarioService.getUsuarioById(userData.email);

      if (existingUser.data && Array.isArray(existingUser.data) && existingUser.data.length > 0) {
        return { data: null, error: 'User already exists' };
      }
      // First register the user with authentication
      const authResult = await authService.register(userData);
      
      if (authResult.error) {
        return { data: null, error: authResult.error };
      }
      
      // User was successfully created in auth
      // The user data should already be in the usuarios table from the auth service
      // But we can fetch it to confirm and return it
      if (authResult.data?.user?.id) {
        const userResult = await databaseService.fetchData(
          'usuarios',
          '*',
          { eq: { id: authResult.data.user.id } }
        );
        
        return userResult;
      }
      
      return { data: authResult.data, error: null };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },
  
  // Get a user by ID
  getUsuarioById: async (id: string) => {
    try {
      const result = await databaseService.fetchData(
        'usuarios',
        '*',
        { eq: { id } }
      );
      
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },
  
  // Get current logged-in user
  getCurrentUsuario: async () => {
    try {
      // Get the current authenticated user
      const authUser = await authService.getCurrentUser();
      
      if (authUser.error || !authUser.data?.user) {
        return { data: null, error: authUser.error || 'No authenticated user' };
      }
      
      // Fetch the user data from the usuarios table
      const result = await databaseService.fetchData(
        'usuarios',
        '*',
        { eq: { id: authUser.data.user.id } }
      );
      
      if (result.error) {
        return { data: null, error: result.error };
      }
      
      // Return the first user found (should be only one)
      return { data: result.data?.[0] || null, error: null };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },
  
  // Update a user
  updateUsuario: async (id: string, updates: Partial<Usuario>) => {
    try {
      // Don't allow updating certain fields
      const { id: _, creado_en, ...safeUpdates } = updates as any;
      
      const result = await databaseService.updateData(
        'usuarios',
        safeUpdates,
        { id }
      );
      
      return result;
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },
  
  // Delete/Deactivate a user
  deactivateUsuario: async (id: string) => {
    try {
      // Instead of deleting, we set the user as inactive
      const result = await databaseService.updateData(
        'usuarios',
        { activo: false },
        { id }
      );
      
      return result;
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  },
  
  // List users with optional filtering
  listUsuarios: async (filters: any = {}) => {
    try {
      const result = await databaseService.fetchData(
        'usuarios',
        '*',
        filters
      );
      
      return result;
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  }
};