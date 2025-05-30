// src/api/StorageSupabase.ts
import { decode } from 'base64-arraybuffer';
import { supabase } from './supabase/supabaseClient';

interface StorageServiceResponse {
  data: any;
  error: boolean;
  mensaje: string | null;
}

class StorageSupabase {
  async uploadFile(
    bucket: string,
    path: string, // 👈 ahora recibimos el path ya generado
    file: File | { base64: string; contentType: string }
  ): Promise<StorageServiceResponse> {
    try {
      if (file instanceof File) {
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(path, file, {
            cacheControl: '3600',
            upsert: true,
            contentType: file.type,
          });
        if (error || !data) {
          return {
            data: null,
            error: true,
            mensaje: error?.message || 'Error subiendo el archivo',
          };
        }
        return {
          data: { path: data.path }, // 🔵 ahora el path es el que devuelve Supabase (sin tocarlo)
          error: false,
          mensaje: null,
        };
      } else {
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(path, decode(file.base64), {
            cacheControl: '3600',
            upsert: true,
            contentType: file.contentType,
          });
        if (error || !data) {
          return {
            data: null,
            error: true,
            mensaje: error?.message || 'Error subiendo el archivo',
          };
        }
        return {
          data: { path: data.path }, // 🔵 ahora el path es el que devuelve Supabase (sin tocarlo)
          error: false,
          mensaje: null,
        };
      }
    } catch (err: any) {
      return {
        data: null,
        error: true,
        mensaje: err.message || 'Error subiendo el archivo',
      };
    }
  }

  async getPublicUrl(
    bucket: string,
    fileName: string
  ): Promise<StorageServiceResponse> {
    try {
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

      if (!data) {
        return {
          data: null,
          error: true,
          mensaje: 'No se pudo obtener la URL pública',
        };
      }

      return {
        data: { publicUrl: data.publicUrl },
        error: false,
        mensaje: null,
      };
    } catch (err: any) {
      return {
        data: null,
        error: true,
        mensaje: err.message || 'Error obteniendo la URL pública',
      };
    }
  }
  async deleteFileByUrl(publicUrl: string): Promise<StorageServiceResponse> {
    try {
      console.log('publicUrl', publicUrl);
      const parsedPath = this.parseFilePathSupabase(publicUrl);
      if (!parsedPath) {
        throw new Error('URL de archivo inválida');
      }
      const { data, error } = await supabase.storage
        .from(parsedPath.bucket)
        .remove([parsedPath.fileName]);
      if (error || !data) {
        throw new Error(error?.message || 'Error eliminando el archivo');
      }
      return {
        data: null,
        error: false,
        mensaje: null,
      };
    } catch (err: any) {
      return {
        data: null,
        error: true,
        mensaje: err.message || 'Error eliminando el archivo',
      };
    }
  }

  private parseFilePathSupabase(publicUrl: string): {
    bucket: string;
    fileName: string;
  } | null {
    try {
      const url = new URL(publicUrl);
      const parts = url.pathname.split('/'); // e.g., ["", "storage", "v1", "object", "public", "bucket", "file.png"]
      const bucketIndex = parts.findIndex((part) => part === 'public') + 1;
      const bucket = parts[bucketIndex];
      const fileName = parts[bucketIndex + 1];
      if (!bucket || !fileName) return null;
      return { bucket, fileName };
    } catch (e) {
      console.error('URL inválida:', publicUrl);
      return null;
    }
  }

  async deleteFile(
    bucket: string,
    fileName: string
  ): Promise<StorageServiceResponse> {
    try {
      console.log('fileName', fileName);
      console.log('bucket', bucket);
      const { error } = await supabase.storage.from(bucket).remove([fileName]);
      if (error) {
        throw new Error(error.message);
      }
      return {
        data: null,
        error: false,
        mensaje: null,
      };
    } catch (err: any) {
      return {
        data: null,
        error: true,
        mensaje: err.message || 'Error eliminando el archivo',
      };
    }
  }
}

export const storageSupabase = new StorageSupabase();
