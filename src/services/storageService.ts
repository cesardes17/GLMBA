import { storageService as supabaseStorageService } from '../api/storageSupabase';

// Generic storage service that uses the Supabase implementation
export const storageService = {
  // Upload a new file
  uploadFile: async (bucket: string, path: string, file: File) => {
    return await supabaseStorageService.uploadFile(bucket, path, file);
  },
  
  // Update an existing file
  updateFile: async (bucket: string, path: string, file: File) => {
    return await supabaseStorageService.updateFile(bucket, path, file);
  },
  
  // Download a file
  downloadFile: async (bucket: string, path: string) => {
    return await supabaseStorageService.downloadFile(bucket, path);
  },
  
  // Get a public URL for a file
  getPublicUrl: async (bucket: string, path: string) => {
    return await supabaseStorageService.getPublicUrl(bucket, path);
  },
  
  // List all files in a bucket/folder
  listFiles: async (bucket: string, path: string = '') => {
    return await supabaseStorageService.listFiles(bucket, path);
  },
  
  // Delete a file
  deleteFile: async (bucket: string, paths: string[]) => {
    return await supabaseStorageService.deleteFile(bucket, paths);
  },
  
  // Create a signed URL (for temporary access)
  createSignedUrl: async (bucket: string, path: string, expiresIn: number = 60) => {
    return await supabaseStorageService.createSignedUrl(bucket, path, expiresIn);
  }
};