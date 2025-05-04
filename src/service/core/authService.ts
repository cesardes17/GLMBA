import { AuthSupabase } from '@/src/api/authSupabase';
import { usuarioService } from '../usuarioService';

export type AuthResponse<T> = {
  data: T | null;
  error: string | null;
};

interface RegisterParams {
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export const AuthService = {
  async register({
    email,
    password,
  }: RegisterParams): Promise<AuthResponse<any>> {
    try {
      const { data, error } = await AuthSupabase.signUp(email, password);
      if (error) throw new Error(error.message);

      return {
        data: data.user,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message,
      };
    }
  },

  async login({ email, password }: LoginParams): Promise<AuthResponse<any>> {
    try {
      const { data, error } = await AuthSupabase.signIn(email, password);
      if (error) throw new Error(error.message);
      if (!data || !data.user) throw new Error('No data returned');
      const { usuario } = await usuarioService.getUser(data.user.id);
      if (!usuario) throw new Error('No user returned');
      if (usuario.activo) {
        return {
          data: data.user,
          error: null,
        };
      }
      this.logout();
      return {
        data: null,
        error: 'Usuario baneado',
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message,
      };
    }
  },

  async logout(): Promise<AuthResponse<null>> {
    try {
      const { error } = await AuthSupabase.signOut();
      if (error) throw new Error(error.message);

      return {
        data: null,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message,
      };
    }
  },

  async getSession(): Promise<AuthResponse<any>> {
    try {
      const { data, error } = await AuthSupabase.getSession();
      if (error) throw new Error(error.message);

      return {
        data: data.session,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message,
      };
    }
  },

  async getCurrentUser(): Promise<AuthResponse<any>> {
    try {
      const { data, error } = await AuthSupabase.getUser();
      if (error) throw new Error(error.message);

      return {
        data: data.user,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message,
      };
    }
  },
  onAuthStateChange(
    callback: Parameters<typeof AuthSupabase.onAuthStateChange>[0]
  ) {
    return AuthSupabase.onAuthStateChange(callback);
  },
};
