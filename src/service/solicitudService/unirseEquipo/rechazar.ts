import { baseSolicitudService } from '../core/baseSolicitudService';
import { SolicitudServiceResponse } from '../types';

export async function rechazarSolicitudUnirseEquipo(
  solicitudId: string,
  userId: string,
  esAdmin: boolean,
  respuestaAdmin?: string
): Promise<SolicitudServiceResponse> {
  const fecha_respuesta = new Date().toISOString();

  try {
    const { data, error } = esAdmin
      ? await baseSolicitudService.update(solicitudId, {
          estado: 'rechazada',
          respuesta_admin: respuestaAdmin,
          fecha_respuesta,
          admin_aprobador_id: userId,
        })
      : await baseSolicitudService.update(solicitudId, {
          estado: 'rechazada',
          fecha_respuesta,
          aprobado_jugador: false,
        });

    if (error || !data) {
      throw new Error('Error al rechazar la solicitud.');
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
          : 'Error al rechazar la solicitud.',
    };
  }
}
