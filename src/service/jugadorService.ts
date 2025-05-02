import { Jugador } from '../interfaces/Jugador';
import { CompletarPerfilJugador } from '../types/auth';
import { DatabaseService } from './core/databaseService';
import { storageService } from './core/storageService';

export type JugadorServiceResponse = {
  jugador: Jugador | null;
  error: boolean;
  mensaje: string | null;
};

export class JugadorService {
  private static instance: JugadorService;
  private dbService: typeof DatabaseService;
  private tabla: string;
  private storageService: typeof storageService;
  private bucket: string;

  private constructor() {
    this.dbService = DatabaseService;
    this.tabla = 'jugadores';
    this.storageService = storageService;
    this.bucket = 'fotojugadores';
  }

  public static getInstance(): JugadorService {
    if (!JugadorService.instance) {
      JugadorService.instance = new JugadorService();
    }
    return JugadorService.instance;
  }

  async crearJugador(
    jugadorData: CompletarPerfilJugador,
    imageUri: string
  ): Promise<JugadorServiceResponse> {
    try {
      const {
        data: dataStorage,
        error: errorStorage,
        mensaje,
      } = await this.storageService.uploadImage(this.bucket, imageUri);
      if (!dataStorage || errorStorage) {
        throw new Error(mensaje || 'Error al subir la imagen');
      }

      // Actualizar el nombre del archivo en los datos del jugador
      const jugadorDataConFoto = {
        ...jugadorData,
        foto_url: dataStorage.path,
      };

      const { data, error } = await this.dbService.insert(
        this.tabla,
        jugadorDataConFoto
      );

      if (error || !data) {
        throw new Error(error || 'Error al crear el jugador');
      }

      return {
        jugador: data as unknown as Jugador,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        jugador: null,
        error: true,
        mensaje:
          error instanceof Error ? error.message : 'Error al crear el jugador',
      };
    }
  }

  async getJugadorByUserId(userId: string): Promise<{
    jugador: Jugador | null;
    error: boolean;
    mensaje: string | null;
  }> {
    try {
      const { data, error } = await this.dbService.getByField<Jugador>(
        this.tabla,
        'usuario_id',
        userId
      );

      if (error || !data || data.length === 0) {
        return {
          jugador: null,
          error: true,
          mensaje:
            error ||
            'No se encontró el jugador con el ID de usuario proporcionado',
        };
      }

      // Obtener la URL pública de la imagen
      const { data: urlData, error: urlError } =
        await this.storageService.getPublicUrl(this.bucket, data[0].foto_url);

      if (urlError || !urlData) {
        console.error(
          'Error obteniendo la URL pública de la imagen:',
          urlError
        );
        // Continuamos aunque no se pueda obtener la URL
      } else {
        // Asignamos la URL pública al mismo campo que contenía el nombre
        data[0].foto_url = urlData.publicUrl;
      }

      return {
        jugador: data[0],
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        jugador: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al obtener el jugador',
      };
    }
  }
  async tieneEquipoEnTemporadaActual(jugadorId: number): Promise<boolean> {
    const { data, error } = await DatabaseService.callRpc<
      boolean,
      { jugador_id_param: number }
    >('tiene_equipo_temporada_actual', { jugador_id_param: jugadorId });

    if (error) {
      console.error('Error al comprobar si el jugador tiene equipo:', error);
      return false;
    }

    return data ?? false;
  }
}

// Exportar una instancia única
export const jugadorService = JugadorService.getInstance();
