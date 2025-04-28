// src/api/AuthSupabase.ts
import { supabase } from './supabase/supabaseClient';

export const AuthSupabase = {
  /**
   * Registra un nuevo usuario en Supabase Auth
   */
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  /**
   * Inicia sesión con email y contraseña
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  /**
   * Cierra sesión del usuario actual
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  /**
   * Obtiene la sesión actual del usuario
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  },

  /**
   * Devuelve el usuario actual (si está logueado)
   */
  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  /**
   * Refresca manualmente la sesión (rara vez necesario)
   */
  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession();
    return { data, error };
  },
};
