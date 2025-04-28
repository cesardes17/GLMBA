import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as mime from 'mime';
export default async function createBlobFromUri(
  uri: string
): Promise<Blob | { base64: string; contentType: string }> {
  if (Platform.OS === 'web') {
    const response = await fetch(uri);
    return await response.blob();
  } else {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new Error('El archivo no existe en el dispositivo');
    }
    const mimeType = mime.default.getType(uri);
    if (!mimeType) {
      throw new Error('No se pudo determinar el tipo MIME del archivo');
    }
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return { base64, contentType: mimeType };
  }
}
