import { baseSolicitudService } from '../core/baseSolicitudService';
import { SolicitudServiceResponse } from '../types';

export async function rechazarSolicitudCrearEquipo(
  solicitudId: string,
  adminId: string,
  respuestaAdmin: string
): Promise<SolicitudServiceResponse> {
  const fecha_respuesta = new Date().toISOString();

  try {
    // Paso 1: Actualizar la solicitud a rechazada
    const { data, error } = await baseSolicitudService.update(solicitudId, {
      estado: 'rechazada',
      respuesta_admin: respuestaAdmin,
      fecha_respuesta,
      admin_aprobador_id: adminId,
    });

    if (error || !data) {
      return {
        solicitud: null,
        error: true,
        mensaje: error || 'Error al actualizar la solicitud',
      };
    }

    // Paso 2: Eliminar el escudo del almacenamiento (si existe)
    if (data.escudo_url) {
      const { error: deleteError, mensaje: deleteMsg } =
        await baseSolicitudService.deleteEscudo(data.escudo_url);

      if (deleteError) {
        return {
          solicitud: null,
          error: true,
          mensaje: deleteMsg || 'Error al eliminar el escudo del equipo',
        };
      }
    }

    return {
      solicitud: data,
      error: false,
      mensaje: null,
    };
  } catch (err) {
    return {
      solicitud: null,
      error: true,
      mensaje:
        err instanceof Error
          ? err.message
          : 'Error inesperado al rechazar la solicitud',
    };
  }
}
