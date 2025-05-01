import { Solicitud } from '@/src/interfaces/Solicitudes';
import { DatabaseService } from '../../core/databaseService';
import { storageService } from '../../core/storageService';

// FUNCIONES DEFINIDAS FUERA DEL OBJETO
async function getSolicitudesUsuario(
  userId: string,
  page = 1,
  limit = 20
): Promise<{
  solicitudes: Solicitud[];
  error: boolean;
  mensaje: string | null;
}> {
  try {
    const query = `
      *,
      equipo_id ( id, nombre, escudo_url ),
      jugador_objetivo_id ( id, nombre, email ),
      capitan_objetivo_id ( id, nombre, email ),
      iniciada_por_id ( id, nombre, email ),
      admin_aprobador_id ( id, nombre, email )
    `;

    const orFilter = `iniciada_por_id.eq.${userId},jugador_objetivo_id.eq.${userId},capitan_objetivo_id.eq.${userId}`;

    const { data, error } = await DatabaseService.getPaginatedData<Solicitud>(
      'solicitudes',
      {
        orFilterString: orFilter,
        page,
        limit,
        select: query,
      }
    );

    if (error || !data) {
      return {
        solicitudes: [],
        error: true,
        mensaje: 'Error al obtener solicitudes',
      };
    }

    const solicitudesConImagen = await Promise.all(
      data.map(async (solicitud) => {
        if (
          solicitud.tipo === 'crear_equipo' &&
          solicitud.escudo_url &&
          !solicitud.escudo_url.startsWith('http')
        ) {
          const { data: publicURLData, error: publicURLError } =
            await storageService.getPublicUrl(
              'escudosequipos',
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

async function getSolicitudesAdministrador(
  page = 1,
  limit = 20
): Promise<{
  solicitudes: Solicitud[];
  error: boolean;
  mensaje: string | null;
}> {
  try {
    const query = `
      *,
      equipo_id ( id, nombre, escudo_url ),
      jugador_objetivo_id ( id, nombre, email ),
      capitan_objetivo_id ( id, nombre, email ),
      iniciada_por_id ( id, nombre, email ),
      admin_aprobador_id ( id, nombre, email )
    `;

    const { data, error } = await DatabaseService.getPaginatedData<Solicitud>(
      'solicitudes',
      {
        page,
        limit,
        select: query,
      }
    );

    if (error || !data) {
      return {
        solicitudes: [],
        error: true,
        mensaje: error ?? 'Error al obtener solicitudes',
      };
    }

    const solicitudesConImagen = await Promise.all(
      data.map(async (solicitud) => {
        if (
          solicitud.tipo === 'crear_equipo' &&
          solicitud.escudo_url &&
          !solicitud.escudo_url.startsWith('http')
        ) {
          const { data: publicURLData, error: publicURLError } =
            await storageService.getPublicUrl(
              'escudosequipos',
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

async function crearSolicitud(
  solicitudData: Omit<Solicitud, 'id' | 'fecha_creacion'>
): Promise<{
  solicitud: Solicitud | null;
  error: boolean;
  mensaje: string | null;
}> {
  try {
    // Validar que el tipo 'crear_equipo' tenga escudo obligatoriamente
    if (
      solicitudData.tipo === 'crear_equipo' &&
      (!solicitudData.escudo_url || solicitudData.escudo_url.trim() === '')
    ) {
      return {
        solicitud: null,
        error: true,
        mensaje: 'El escudo es obligatorio para crear un equipo.',
      };
    }

    // Subir escudo si existe
    if (solicitudData.escudo_url) {
      const {
        data: dataStorage,
        error: errorStorage,
        mensaje,
      } = await storageService.uploadImage(
        'escudosequipos',
        solicitudData.escudo_url
      );

      if (!dataStorage || errorStorage) {
        throw new Error(mensaje || 'Error al subir la imagen del escudo');
      }

      solicitudData = {
        ...solicitudData,
        escudo_url: dataStorage.path,
      };
    }

    const { data, error } = await DatabaseService.insert<
      typeof solicitudData,
      Solicitud
    >('solicitudes', solicitudData);

    if (error || !data) {
      throw new Error(error || 'No se pudo crear la solicitud');
    }

    return {
      solicitud: data[0],
      error: false,
      mensaje: null,
    };
  } catch (error) {
    return {
      solicitud: null,
      error: true,
      mensaje:
        error instanceof Error ? error.message : 'Error al crear la solicitud',
    };
  }
}
// OBJETO DE EXPORTACIÓN
export const baseSolicitudService = {
  getById: (id: string) =>
    DatabaseService.getById<Solicitud>('solicitudes', 'id', id),

  update: (id: string, data: Partial<Solicitud>) =>
    DatabaseService.updateById('solicitudes', id, data),

  delete: (id: string) => DatabaseService.deleteById('solicitudes', id),

  uploadEscudo: async (path: string) =>
    storageService.uploadImage('escudosequipos', path),

  deleteEscudo: async (path: string) =>
    storageService.deleteFile('escudosequipos', path),

  getSolicitudesUsuario,
  getSolicitudesAdministrador,
  crearSolicitud,
};
