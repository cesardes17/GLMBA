import { equipoService } from '@/src/service/equipoService';
import { baseSolicitudService } from '../core/baseSolicitudService';
import { SolicitudServiceResponse } from '../types';

export async function aceptarSolicitudCrearEquipo(
  solicitudId: string,
  adminId: string,
  respuestaAdmin: string
): Promise<SolicitudServiceResponse> {
  const fecha_respuesta = new Date().toISOString();
  let solicitudModificada = false;

  try {
    // Paso 1: Marcar la solicitud como aceptada
    const { data, error } = await baseSolicitudService.update(solicitudId, {
      estado: 'aceptada',
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

    solicitudModificada = true;

    // Paso 2: Crear equipo
    const {
      equipo,
      error: equipoError,
      mensaje: equipoMsg,
    } = await equipoService.createEquipo({
      nombre: data.nombre_equipo!,
      escudo_url: data.escudo_url!,
      capitan_id: data.iniciada_por_id,
    });

    if (equipoError || !equipo) {
      throw new Error(equipoMsg || 'Error al crear el equipo');
    }

    return {
      solicitud: data,
      error: false,
      mensaje: null,
    };
  } catch (error) {
    // ⚠️ Hacer rollback solo si la solicitud ya fue modificada
    if (solicitudModificada) {
      await baseSolicitudService.update(solicitudId, {
        estado: 'pendiente',
        respuesta_admin: undefined,
        fecha_respuesta: undefined,
        admin_aprobador_id: undefined,
      });
    }

    return {
      solicitud: null,
      error: true,
      mensaje:
        error instanceof Error
          ? error.message
          : 'Error inesperado al procesar la solicitud',
    };
  }
}
