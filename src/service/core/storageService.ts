import { storageSupabase } from '@/src/api/storageSupabase';
import createBlobFromUri from '@/src/utils/uriToBlob';

interface StorageServiceResponse {
  data: any;
  error: boolean;
  mensaje: string | null;
}

class StorageService {
  async uploadImage(
    bucket: string,
    fileUri: string
  ): Promise<StorageServiceResponse> {
    try {
      const fileData = await createBlobFromUri(fileUri);

      if (!fileData) {
        throw new Error('No se pudo crear el archivo desde la URI');
      }

      const extension =
        fileData instanceof Blob
          ? fileData.type?.split('/').pop()
          : fileData.contentType.split('/').pop();
      const uniqueFileName = `${Date.now()}_${Math.floor(Math.random() * 10000)}.${extension}`;

      if (fileData instanceof Blob) {
        const file = new File([fileData], uniqueFileName, {
          type: fileData.type,
        });
        return storageSupabase.uploadFile(bucket, uniqueFileName, file);
      } else {
        return storageSupabase.uploadFile(bucket, uniqueFileName, fileData);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return {
        data: null,
        error: true,
        mensaje: (error as Error).message || 'No se pudo subir la imagen',
      };
    }
  }

  async getPublicUrl(
    bucket: string,
    fileName: string
  ): Promise<StorageServiceResponse> {
    try {
      return storageSupabase.getPublicUrl(bucket, fileName);
    } catch (error) {
      console.error('Error getting public URL:', error);
      return {
        data: null,
        error: true,
        mensaje:
          (error as Error).message || 'No se pudo obtener la URL pública',
      };
    }
  }

  async deleteFileByUrl(publicUrl: string): Promise<StorageServiceResponse> {
    try {
      return storageSupabase.deleteFileByUrl(publicUrl);
    } catch (error) {
      console.error('Error deleting file:', error);
      return {
        data: null,
        error: true,
        mensaje: (error as Error).message || 'No se pudo eliminar el archivo',
      };
    }
  }
  async deleteFile(
    bucket: string,
    fileName: string
  ): Promise<StorageServiceResponse> {
    try {
      return storageSupabase.deleteFile(bucket, fileName);
    } catch (error) {
      console.error('Error deleting file:', error);
      return {
        data: null,
        error: true,
        mensaje: (error as Error).message || 'No se pudo eliminar el archivo',
      };
    }
  }
}

export const storageService = new StorageService();
