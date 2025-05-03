import { SolicitudServiceResponse } from '../types';

export async function rechazarSolicitudUnirseEquipo(
  solicitudId: string,
  userId: string,
  respuestaAdmin: string,
  esAdmin: boolean
): Promise<SolicitudServiceResponse> {
  return {
    solicitud: null,
    error: true,
    mensaje: 'Aceptar solicitud de unirse a equipo aún no está implementado',
  };
}
