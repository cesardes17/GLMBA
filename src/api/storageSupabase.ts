import { supabase, handleSupabaseError } from './supabase';

// Storage operations using Supabase
export const storageService = {
  // Upload a file to a bucket
  uploadFile: async (bucket: string, path: string, file: File) => {
    try {
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // Update an existing file
  updateFile: async (bucket: string, path: string, file: File) => {
    try {
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // Download a file
  downloadFile: async (bucket: string, path: string) => {
    try {
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .download(path);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // Get a public URL for a file
  getPublicUrl: async (bucket: string, path: string) => {
    try {
      const { data } = supabase
        .storage
        .from(bucket)
        .getPublicUrl(path);
      
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // List all files in a bucket/folder
  listFiles: async (bucket: string, path: string = '') => {
    try {
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .list(path);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // Delete a file
  deleteFile: async (bucket: string, paths: string[]) => {
    try {
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .remove(paths);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },
  
  // Create a signed URL (for temporary access)
  createSignedUrl: async (bucket: string, path: string, expiresIn: number = 60) => {
    try {
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  }
};