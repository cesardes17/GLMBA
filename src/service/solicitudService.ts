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
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<SolicitudesServiceResponse> {
    try {
      const select = `
        *,
        equipo_id (
          id,
          nombre,
          escudo_url
        ),
        jugador_objetivo_id (
          id,
          nombre,
          email
        ),
        capitan_objetivo_id (
          id,
          nombre,
          email
        ),
        iniciada_por_id (
          id,
          nombre,
          email
        )
      `;

      const solicitudes = await this.dbService.getPaginatedData<Solicitud>(
        'solicitudes',
        {
          filters: [
            { field: 'iniciada_por_id', operator: 'eq', value: userId },
          ],
          page,
          limit,
          select,
        }
      );

      if (!solicitudes.data) {
        return {
          solicitudes: [],
          error: true,
          mensaje: solicitudes.error ?? 'Error al obtener solicitudes',
        };
      }

      // Obtener las public URL de los escudos si es tipo "crear_equipo"
      const solicitudesConImagen = await Promise.all(
        solicitudes.data.map(async (solicitud) => {
          if (
            solicitud.tipo === 'crear_equipo' &&
            solicitud.escudo_url &&
            !solicitud.escudo_url.startsWith('http')
          ) {
            const { data: publicURLData, error: publicURLError } =
              await this.storageService.getPublicUrl(
                this.bucket,
                solicitud.escudo_url
              );

            return {
              ...solicitud,
              escudo_url: publicURLError
                ? solicitud.escudo_url
                : publicURLData.publicUrl,
            };
          }

          return solicitud;
        })
      );

      return {
        solicitudes: solicitudesConImagen,
        error: false,
        mensaje: 'Solicitudes obtenidas correctamente',
      };
    } catch (error) {
      return {
        solicitudes: [],
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error inesperado al obtener las solicitudes',
      };
    }
  }
  async getSolicitudesAdministrador(): Promise<SolicitudesServiceResponse> {
    try {
      const query = `
        *,
        equipo_id ( id, nombre, escudo_url ),
        jugador_objetivo_id ( id, nombre, email ),
        capitan_objetivo_id ( id, nombre, email ),
        iniciada_por_id ( id, nombre, email ),
        admin_aprobador_id ( id, nombre, email )
      `;

      const { data, error } = await this.dbService.getWithRelations<Solicitud>(
        'solicitudes',
        query
      );
      console.log('Data:', data);
      if (error || !data) {
        throw new Error(error || 'Error al obtener solicitudes');
      }
      // Obtener las public URL de los escudos si es tipo "crear_equipo"
      const solicitudesConImagen = await Promise.all(
        data.map(async (solicitud) => {
          if (
            solicitud.tipo === 'crear_equipo' &&
            solicitud.escudo_url &&
            !solicitud.escudo_url.startsWith('http')
          ) {
            const { data: publicURLData, error: publicURLError } =
              await this.storageService.getPublicUrl(
                this.bucket,
                solicitud.escudo_url
              );

            return {
              ...solicitud,
              escudo_url: publicURLError
                ? solicitud.escudo_url
                : publicURLData.publicUrl,
            };
          }

          return solicitud;
        })
      );
      return {
        solicitudes: solicitudesConImagen || [],
        error: false,
        mensaje: 'Solicitudes obtenidas correctamente',
      };
    } catch (error) {
      return {
        solicitudes: [],
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error inesperado al obtener las solicitudes',
      };
    }
  }
}
// Exportar una instancia única
export const solicitudService = SolicitudService.getInstance();
