import { SolicitudExpandida, Solicitud } from '@/src/interfaces/Solicitudes';
import { DatabaseService } from '../../core/databaseService';
import { storageService } from '../../core/storageService';
import { equipoService } from '../../equipoService';
import { RequestWithId, RequestData } from '@/src/types/requests';
import { v4 as uuidv4 } from 'uuid';

// 🔧 Función auxiliar para decidir qué string mostrar en campos de usuario
function getUserIdentifier(usuario: any): string {
  if (!usuario || typeof usuario !== 'object') return '';
  return usuario.email || usuario.nombre || usuario.id || '';
}

// 🔄 Parsear SolicitudExpandida a RequestWithId
function parseSolicitudToRequestWithId(s: SolicitudExpandida): RequestWithId {
  switch (s.tipo) {
    case 'crear_equipo':
      return {
        id: s.id,
        data: {
          tipo: 'crear_equipo',
          nombre_equipo: s.nombre_equipo ?? '',
          escudo_url: s.escudo_url ?? '',
          iniciada_por: {
            id: s.iniciada_por_id?.id || '',
            email: s.iniciada_por_id?.email || '',
            nombre: s.iniciada_por_id?.nombre || '',
          },
          fecha_creacion: s.fecha_creacion,
          estado: s.estado,
          motivo: s.motivo ?? '',
          respuesta_admin: s.respuesta_admin,
          fecha_respuesta: s.fecha_respuesta,
          admin_aprobador: s.admin_aprobador_id
            ? {
                id: s.admin_aprobador_id?.id || '',
                email: s.admin_aprobador_id?.email || '',
                nombre: s.admin_aprobador_id?.nombre || '',
              }
            : undefined,
        },
      };
    case 'unirse_equipo':
      return {
        id: s.id,
        data: {
          tipo: 'unirse_equipo',
          jugador_objetivo: {
            id: s.jugador_objetivo_id?.id || '',
            email: s.jugador_objetivo_id?.email || '',
            nombre: s.jugador_objetivo_id?.nombre || '',
          },
          equipo: {
            id: s.equipo_id?.id || '',
            nombre: s.equipo_id?.nombre || '',
            escudo_url: s.equipo_id?.escudo_url || '',
          },
          capitan_objetivo: getUserIdentifier(s.capitan_objetivo_id),
          fecha_creacion: s.fecha_creacion,
          aprobado_jugador: s.aprobado_jugador ?? false,
          aprobado_capitan: s.aprobado_capitan ?? false,
          estado: s.estado,
          iniciada_por: {
            id: s.iniciada_por_id?.id || '',
            email: s.iniciada_por_id?.email || '',
            nombre: s.iniciada_por_id?.nombre || '',
          },
        },
      };

    case 'baja_equipo':
      return {
        id: s.id,
        data: {
          tipo: 'baja_equipo',
          jugador_objetivo: getUserIdentifier(s.jugador_objetivo_id),
          equipo: getUserIdentifier(s.equipo_id),
          fecha_creacion: s.fecha_creacion,
          estado: s.estado,
          motivo: s.motivo ?? '',
        },
      };

    case 'disolver_equipo':
      return {
        id: s.id,
        data: {
          tipo: 'disolver_equipo',
          capitan_objetivo: getUserIdentifier(s.capitan_objetivo_id),
          equipo: getUserIdentifier(s.equipo_id),
          fecha_creacion: s.fecha_creacion,
          estado: s.estado,
          motivo: s.motivo ?? '',
        },
      };

    default:
      throw new Error(`Tipo de solicitud no soportado: ${s.tipo}`);
  }
}

// 🔧 Función para crear una solicitud
export async function crearSolicitud(
  solicitudData: RequestData & { iniciada_por_id: string }
): Promise<{
  solicitud: RequestWithId | null;
  error: boolean;
  mensaje: string | null;
}> {
  try {
    const fecha_creacion = new Date().toISOString();
    const base: any = {
      id: uuidv4(),
      tipo: solicitudData.tipo,
      estado: 'pendiente',
      fecha_creacion,
      iniciada_por_id: solicitudData.iniciada_por_id,
    };

    if (solicitudData.tipo === 'crear_equipo') {
      if (!solicitudData.escudo_url) {
        return {
          solicitud: null,
          error: true,
          mensaje: 'El escudo es obligatorio para crear un equipo.',
        };
      }

      const { data, error } = await storageService.uploadImage(
        'escudosequipos',
        solicitudData.escudo_url
      );

      if (error || !data) {
        throw new Error('Error al subir el escudo del equipo.');
      }

      base.nombre_equipo = solicitudData.nombre_equipo;
      base.escudo_url = data.path;
      base.motivo = solicitudData.motivo;
    } else if (solicitudData.tipo === 'unirse_equipo') {
      const { equipo, error } =
        await equipoService.getEquipoDeTemporadaActualByCapitan(
          solicitudData.iniciada_por.id
        );

      if (error || !equipo) {
        return {
          solicitud: null,
          error: true,
          mensaje: 'No se encontró equipo del capitán para esta temporada.',
        };
      }

      base.equipo_id = equipo.id;
      base.jugador_objetivo_id = solicitudData.jugador_objetivo.id;
      base.capitan_objetivo_id = solicitudData.capitan_objetivo;
    } else if (solicitudData.tipo === 'baja_equipo') {
      base.equipo_id = solicitudData.equipo;
      base.jugador_objetivo_id = solicitudData.jugador_objetivo;
      base.motivo = solicitudData.motivo;
    } else if (solicitudData.tipo === 'disolver_equipo') {
      base.equipo_id = solicitudData.equipo;
      base.capitan_objetivo_id = solicitudData.capitan_objetivo;
      base.motivo = solicitudData.motivo;
    }

    const { data: inserted, error: insertError } = await DatabaseService.insert<
      typeof base,
      SolicitudExpandida
    >('solicitudes', base);

    if (insertError || !inserted || inserted.length === 0) {
      throw new Error(insertError || 'No se pudo crear la solicitud');
    }

    const parsed = parseSolicitudToRequestWithId(inserted[0]);
    return { solicitud: parsed, error: false, mensaje: null };
  } catch (error) {
    return {
      solicitud: null,
      error: true,
      mensaje:
        error instanceof Error ? error.message : 'Error al crear la solicitud',
    };
  }
}

// 📄 Obtener solicitudes de usuario
async function getSolicitudesUsuario(
  userId: string,
  page = 1,
  limit = 20
): Promise<{
  solicitudes: RequestWithId[];
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

    const { data, error } =
      await DatabaseService.getPaginatedData<SolicitudExpandida>(
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

    const solicitudes = await Promise.all(
      data.map(async (s) => {
        if (
          s.tipo === 'crear_equipo' &&
          s.escudo_url &&
          !s.escudo_url.startsWith('http')
        ) {
          const { data: urlData, error: err } =
            await storageService.getPublicUrl('escudosequipos', s.escudo_url);
          if (!err && urlData) {
            s.escudo_url = urlData.publicUrl;
          }
        }
        return parseSolicitudToRequestWithId(s);
      })
    );

    return { solicitudes, error: false, mensaje: null };
  } catch (error) {
    return {
      solicitudes: [],
      error: true,
      mensaje: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

// 📄 Obtener solicitudes de administrador
async function getSolicitudesAdministrador(
  page = 1,
  limit = 20
): Promise<{
  solicitudes: RequestWithId[];
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

    const { data, error } =
      await DatabaseService.getPaginatedData<SolicitudExpandida>(
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
        mensaje: 'Error al obtener solicitudes',
      };
    }

    const solicitudes = await Promise.all(
      data.map(async (s) => {
        if (
          s.tipo === 'crear_equipo' &&
          s.escudo_url &&
          !s.escudo_url.startsWith('http')
        ) {
          const { data: urlData, error: err } =
            await storageService.getPublicUrl('escudosequipos', s.escudo_url);
          if (!err && urlData) {
            s.escudo_url = urlData.publicUrl;
          }
        }
        return parseSolicitudToRequestWithId(s);
      })
    );

    return { solicitudes, error: false, mensaje: null };
  } catch (error) {
    return {
      solicitudes: [],
      error: true,
      mensaje: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

// 📦 Exportación principal
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

  crearSolicitud,
  getSolicitudesUsuario,
  getSolicitudesAdministrador,
};
