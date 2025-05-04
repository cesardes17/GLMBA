import { Solicitud } from '@/src/interfaces/Solicitudes';
import { baseSolicitudService } from '../core/baseSolicitudService';
import { SolicitudServiceResponse } from '../types';
import { inscripcionService } from '../../inscripcionJugadorService';
// Import only the type and create a function parameter instead
import type { BolsaJugadorServiceResponse } from '../../bolsaJugadoresService';

interface IBolsaJugadoresService {
  cancelarInscripcion(
    jugador_id: string
  ): Promise<BolsaJugadorServiceResponse<null>>;
}

export async function aceptarSolicitudUnirseEquipo(
  solicitudId: string,
  userId: string,
  esAdmin: boolean,
  bolsaJugadoresService: IBolsaJugadoresService,
  respuestaAdmin: string | undefined,
  dorsalJugador?: number
): Promise<SolicitudServiceResponse> {
  try {
    const fecha_respuesta = new Date().toISOString();
    let solicitudData: Partial<Solicitud> = esAdmin
      ? {
          respuesta_admin: respuestaAdmin,
          fecha_respuesta,
          admin_aprobador_id: userId,
        }
      : {
          fecha_respuesta,
          aprobado_jugador: true,
          dorsal_jugador: dorsalJugador,
        };

    const { data, error } = await baseSolicitudService.update(
      solicitudId,
      solicitudData
    );

    if (error || !data) {
      throw new Error('Error al aceptar la solicitud.');
    }

    console.log('solicitud actualizada', data);
    if (data.aprobado_jugador && data.admin_aprobador_id) {
      console.log('solicitud aceptada por ambos');
      const { data, error } = await baseSolicitudService.update(solicitudId, {
        estado: 'aceptada',
      });
      if (error || !data) {
        throw new Error('Error al actualizar la solicitud.');
      }

      const {
        data: dataInscripcion,
        error: errorInscripcion,
        mensaje: mensajeInscripcion,
      } = await inscripcionService.crearInscripcion({
        equipo_id: data.equipo_id!,
        jugador_id: data.jugador_objetivo_id!,
        numero_camiseta: data.dorsal_jugador!,
      });
      if (errorInscripcion || !dataInscripcion) {
        throw new Error(mensajeInscripcion || 'Error al crear la inscripción.');
      }
      console.log('inscripcion creada', dataInscripcion);

      const {
        data: dataBolsa,
        error: errorBolsa,
        mensaje: mensajeBolsa,
      } = await bolsaJugadoresService.cancelarInscripcion(
        data.jugador_objetivo_id!
      );
      if (errorBolsa) {
        throw new Error(mensajeBolsa || 'Error al cancelar la inscripción.');
      }
      console.log('jugador eliminado de la bolsa de jugadores', dataBolsa);
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
      mensaje: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}
