import { BolsaJugador } from '../interfaces/bolsaJugador';
import { Solicitud } from '../interfaces/Solicitudes';
import { VistaBolsaJugador } from '../interfaces/vistas/VistaBolsaJugador';
import { DatabaseService } from './core/databaseService';
import { v4 as uuidv4 } from 'uuid';
import { storageService } from './core/storageService';
import { baseSolicitudService } from './solicitudService/core/baseSolicitudService';
import { rechazarSolicitudUnirseEquipo } from './solicitudService/unirseEquipo/rechazar';

export type BolsaJugadorServiceResponse<T> = {
  data: T | null;
  error: boolean;
  mensaje: string | null;
};

class BolsaJugadoresService {
  private static instance: BolsaJugadoresService;
  private dbService = DatabaseService;
  private tabla = 'bolsa_jugadores';
  private storageService = storageService;

  private constructor() {}

  public static getInstance(): BolsaJugadoresService {
    if (!BolsaJugadoresService.instance) {
      BolsaJugadoresService.instance = new BolsaJugadoresService();
    }
    return BolsaJugadoresService.instance;
  }

  async getJugadoresEnBolsaConEstadoSolicitud(
    capitanId: string,
    page = 1,
    limit = 20
  ): Promise<BolsaJugadorServiceResponse<VistaBolsaJugador[]>> {
    try {
      const { data, error } =
        await this.dbService.getPaginatedData<VistaBolsaJugador>(
          'vista_bolsa_jugadores',
          {
            page,
            limit,
            select: '*',
          }
        );

      if (error || !data) {
        throw new Error('Error al obtener jugadores en bolsa');
      }

      // Añadir información sobre si ya hay una solicitud pendiente con el capitán actual
      const jugadoresConEstado = await Promise.all(
        data.map(async (jugador) => {
          // Obtener la URL pública de la imagen
          const { data: urlData } = await this.storageService.getPublicUrl(
            'fotojugadores',
            jugador.foto_url
          );

          const url = urlData?.publicUrl || '';
          const { data: solicitudes, error: err } =
            await this.dbService.getByField<Solicitud>(
              'solicitudes',
              'jugador_objetivo_id',
              jugador.jugador_id
            );

          console.log('solicitudes', solicitudes);
          const yaTieneSolicitud = solicitudes?.some(
            (s) =>
              s.iniciada_por_id === capitanId &&
              s.estado === 'pendiente' &&
              s.tipo === 'unirse_equipo'
          );

          return {
            ...jugador,
            foto_url: url,
            solicitudPendiente: yaTieneSolicitud ?? false,
          };
        })
      );

      return {
        data: jugadoresConEstado,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        data: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al obtener jugadores en bolsa',
      };
    }
  }

  async inscribirseEnBolsa(
    jugador_id: string
  ): Promise<BolsaJugadorServiceResponse<BolsaJugador>> {
    try {
      const payload = {
        id: uuidv4(),
        jugador_id,
      };
      const { data, error } = await this.dbService.insert<
        typeof payload,
        BolsaJugador
      >(this.tabla, payload);
      if (error || !data || data.length === 0)
        throw new Error(error || 'No se pudo inscribir en la bolsa');

      return { data: data[0], error: false, mensaje: null };
    } catch (error) {
      return {
        data: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al inscribirse en la bolsa',
      };
    }
  }

  async cancelarInscripcion(
    jugador_id: string
  ): Promise<BolsaJugadorServiceResponse<null>> {
    try {
      const { data, error } = await this.dbService.getByField<BolsaJugador>(
        this.tabla,
        'jugador_id',
        jugador_id
      );

      const { solicitudes, error: errorSolcitud } =
        await baseSolicitudService.getSolicitudesUsuario(jugador_id);
      if (!errorSolcitud && solicitudes) {
        console.log('solicitudes pendientes usuario: ', solicitudes);
        const crearEquipoSolicitudes = solicitudes.filter(
          (s) =>
            s.data.tipo === 'unirse_equipo' && s.data.estado === 'pendiente'
        );
        console.log('solicitudes pendientes', crearEquipoSolicitudes);

        for (const solicitud of crearEquipoSolicitudes) {
          await rechazarSolicitudUnirseEquipo(solicitud.id, jugador_id, false);
        }
      }

      if (error || !data || data.length === 0)
        throw new Error('Jugador no encontrado en la bolsa');

      const { error: deleteError } = await this.dbService.deleteById(
        this.tabla,
        data[0].id
      );
      if (deleteError) throw new Error(deleteError);

      return { data: null, error: false, mensaje: null };
    } catch (error) {
      return {
        data: null,
        error: true,
        mensaje:
          error instanceof Error ? error.message : 'Error al salir de la bolsa',
      };
    }
  }

  async getJugadorEnBolsaById(
    jugador_id: string
  ): Promise<BolsaJugadorServiceResponse<BolsaJugador>> {
    try {
      const { data, error } = await this.dbService.getByField<BolsaJugador>(
        this.tabla,
        'jugador_id',
        jugador_id
      );
      if (error || !data || data.length === 0)
        throw new Error('Jugador no encontrado en la bolsa');

      return { data: data[0], error: false, mensaje: null };
    } catch (error) {
      return {
        data: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al obtener jugador en bolsa',
      };
    }
  }
}

export const bolsaJugadoresService = BolsaJugadoresService.getInstance();
