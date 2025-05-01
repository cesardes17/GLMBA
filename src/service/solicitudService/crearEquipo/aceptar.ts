import { equipoService } from '@/src/service/equipoService';
import { baseSolicitudService } from '../core/baseSolicitudService';
import { SolicitudServiceResponse } from '../types';
import { temporadaService } from '../../temporadaService';
import { inscripcionService } from '../../inscripcionJugadorService';
import { usuarioService } from '../../usuarioService';
import { jugadorService } from '../../jugadorService';

export async function aceptarSolicitudCrearEquipo(
  solicitudId: string,
  adminId: string,
  respuestaAdmin: string
): Promise<SolicitudServiceResponse> {
  const fecha_respuesta = new Date().toISOString();
  let solicitudModificada = false;
  let usuarioModificado = {
    modificado: false,
    id: '',
  };
  let equipoCreado = {
    creado: false,
    id: '',
  };
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
      error: errorTemporada,
      mensaje,
      temporada,
    } = await temporadaService.getTemporadaActiva();

    if (errorTemporada || !temporada) {
      throw new Error(mensaje || 'Error al obtener la temporada activa');
    }

    const {
      equipo,
      error: equipoError,
      mensaje: equipoMsg,
    } = await equipoService.createEquipo({
      nombre: data.nombre_equipo!,
      escudo_url: data.escudo_url!,
      capitan_id: data.iniciada_por_id,
      temporada_id: temporada.id,
    });

    if (equipoError || !equipo) {
      throw new Error(equipoMsg || 'Error al crear el equipo');
    }
    equipoCreado = {
      creado: true,
      id: equipo.id,
    };

    // Paso 3: Actualizar el perfil del usuario
    const {
      error: eUpdateUser,
      mensaje: mUpdateUser,
      usuario,
    } = await usuarioService.updateUser(data.iniciada_por_id, { rol_id: 4 });

    if (eUpdateUser || !usuario) {
      throw new Error(mUpdateUser || 'Error al actualizar el usuario');
    }

    usuarioModificado = {
      modificado: true,
      id: usuario.id,
    };
    //obtenemos la info del jugador
    const {
      error: eJugador,
      mensaje: mJugador,
      jugador,
    } = await jugadorService.getJugadorByUserId(usuario.id);
    // Paso 4: Crear la inscripcion del capitan en inscripcion_jugador

    if (eJugador || !jugador) {
      throw new Error(mJugador || 'Error al obtener el jugador');
    }

    const {
      data: dataInscripcion,
      error: eInscripcion,
      mensaje: mInscripcion,
    } = await inscripcionService.crearInscripcion({
      equipo_id: equipo.id,
      jugador_id: jugador.id,
      numero_camiseta: jugador.dorsal_preferido,
    });

    if (eInscripcion || !dataInscripcion) {
      throw new Error(mInscripcion || 'Error al crear la inscripcion');
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
    if (usuarioModificado.modificado) {
      await usuarioService.updateUser(usuarioModificado.id, {
        rol_id: 5,
      });
    }
    if (equipoCreado.creado) {
      await equipoService.deleteEquipo(equipoCreado.id);
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
