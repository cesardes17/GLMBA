// src/service/jugadorExtendidoService.ts
import { JugadorConEquipo } from '../interfaces/vistas/JugadorConEquipo';
import { DatabaseService } from './core/databaseService';
import { storageService } from './core/storageService';

export class JugadorExtendidoService {
  private static instance: JugadorExtendidoService;
  private readonly tabla = 'vista_jugadores_con_equipo';
  private jugadorBucket = 'fotojugadores';
  private constructor() {}

  public static getInstance(): JugadorExtendidoService {
    if (!JugadorExtendidoService.instance) {
      JugadorExtendidoService.instance = new JugadorExtendidoService();
    }
    return JugadorExtendidoService.instance;
  }

  async getJugadorExtendidoPorId(usuarioId: string): Promise<{
    data: JugadorConEquipo | null;
    error: boolean;
    mensaje: string | null;
  }> {
    try {
      const { data, error } =
        await DatabaseService.getByField<JugadorConEquipo>(
          this.tabla,
          'usuario_id',
          usuarioId
        );

      if (error || !data?.length) {
        return {
          data: null,
          error: true,
          mensaje: 'No se encontró el jugador con información extendida',
        };
      }
      const {
        data: dataFoto,
        error: errorFoto,
        mensaje,
      } = await storageService.getPublicUrl(
        this.jugadorBucket,
        data[0].foto_url!
      );
      if (errorFoto || !dataFoto) {
        throw new Error(mensaje || 'Error al obtener la foto del jugador');
      }
      const jugador = {
        ...data[0],
        foto_url: dataFoto.publicUrl,
      };
      return {
        data: jugador,
        error: false,
        mensaje: null,
      };
    } catch (err) {
      return {
        data: null,
        error: true,
        mensaje:
          err instanceof Error
            ? err.message
            : 'Error inesperado al consultar vista extendida',
      };
    }
  }
}

export const jugadorExtendidoService = JugadorExtendidoService.getInstance();
