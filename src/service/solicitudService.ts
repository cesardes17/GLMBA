import { DatabaseService } from './core/databaseService';
import { Solicitud } from '../interfaces/Solicitudes';
import { storageService } from './core/storageService';

export type SolicitudServiceResponse = {
  solicitud: Solicitud | null;
  error: boolean;
  mensaje: string | null;
};

export type SolicitudesServiceResponse = {
  solicitudes: Solicitud[];
  error: boolean;
  mensaje: string | null;
};

export class SolicitudService {
  private static instance: SolicitudService;
  private dbService: typeof DatabaseService;
  private tabla: string;
  private columnID: string;
  private storageService: typeof storageService;
  private bucket: string;

  private constructor() {
    this.dbService = DatabaseService;
    this.tabla = 'solicitudes';
    this.columnID = 'id';
    this.storageService = storageService;
    this.bucket = 'escudosequipos';
  }

  public static getInstance(): SolicitudService {
    if (!SolicitudService.instance) {
      SolicitudService.instance = new SolicitudService();
    }
    return SolicitudService.instance;
  }

  async getSolicitud(solicitudId: string): Promise<SolicitudServiceResponse> {
    try {
      const { data, error } = await this.dbService.getById<Solicitud>(
        this.tabla,
        this.columnID,
        solicitudId
      );

      if (error || !data) {
        console.error('Error obteniendo solicitud:', error);
        return {
          solicitud: null,
          error: true,
          mensaje:
            error || 'No se encontró la solicitud con el ID proporcionado',
        };
      }

      return {
        solicitud: data,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        solicitud: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al obtener la solicitud',
      };
    }
  }

  async createSolicitud(
    solicitudData: Omit<Solicitud, 'id' | 'fecha_creacion'>
  ): Promise<SolicitudServiceResponse> {
    try {
      // Si hay una imagen en la solicitud, subirla primero
      if (solicitudData.escudo_url) {
        const {
          data: dataStorage,
          error: errorStorage,
          mensaje,
        } = await this.storageService.uploadImage(
          this.bucket,
          solicitudData.escudo_url
        );

        if (!dataStorage || errorStorage) {
          throw new Error(mensaje || 'Error al subir la imagen del escudo');
        }

        // Actualizar la URL del escudo con la ruta del almacenamiento
        solicitudData = {
          ...solicitudData,
          escudo_url: dataStorage.path,
        };
      }

      console.log('Datos recibidos en createSolicitud:', solicitudData);
      const { data: solicitudCreada, error } = await this.dbService.insert(
        this.tabla,
        solicitudData
      );

      if (error || !solicitudCreada) {
        throw new Error(error || 'No se pudo crear la solicitud');
      }

      return {
        solicitud: solicitudCreada[0] as Solicitud,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        solicitud: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al crear la solicitud',
      };
    }
  }

  async updateSolicitud(
    solicitudId: string,
    solicitudData: Partial<Solicitud>
  ): Promise<SolicitudServiceResponse> {
    try {
      const { data, error } = await this.dbService.updateById(
        this.tabla,
        solicitudId,
        solicitudData
      );

      if (error || !data) {
        throw new Error(error || 'No se pudo actualizar la solicitud');
      }

      return {
        solicitud: data,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        solicitud: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al actualizar la solicitud',
      };
    }
  }

  async deleteSolicitud(
    solicitudId: string
  ): Promise<{ error: boolean; mensaje: string | null }> {
    try {
      const { error } = await this.dbService.deleteById(
        this.tabla,
        solicitudId
      );

      if (error) {
        throw new Error(error);
      }

      return {
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al eliminar la solicitud',
      };
    }
  }

  async getSolicitudesUsuario(
    usuarioId: string
  ): Promise<SolicitudesServiceResponse> {
    try {
      if (error) {
        console.error('Error obteniendo solicitudes:', error);
        return {
          solicitudes: [],
          error: true,
          mensaje: error,
        };
      }

      return {
        solicitudes: data || [],
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        solicitudes: [],
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al obtener las solicitudes',
      };
    }
  }
}

// Exportar una instancia única
export const solicitudService = SolicitudService.getInstance();
