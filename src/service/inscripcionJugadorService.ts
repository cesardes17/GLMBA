import { Inscripcion } from '../interfaces/inscripcion';
import { DatabaseService } from './core/databaseService';
import { v4 as uuidv4 } from 'uuid'; // si estás usando uuid

export type InscripcionServiceResponse<T> = {
  data: Inscripcion[] | null;
  error: boolean;
  mensaje: string | null;
};

export class InscripcionService {
  private static instance: InscripcionService;
  private dbService: typeof DatabaseService;
  private tabla: string;

  private constructor() {
    this.dbService = DatabaseService;
    this.tabla = 'inscripciones_jugador';
  }

  public static getInstance(): InscripcionService {
    if (!InscripcionService.instance) {
      InscripcionService.instance = new InscripcionService();
    }
    return InscripcionService.instance;
  }

  async crearInscripcion(
    inscripcion: Omit<Inscripcion, 'id' | 'fecha_inscripcion' | 'activo'>
  ): Promise<InscripcionServiceResponse<Inscripcion>> {
    try {
      // Validación rápida
      if (
        !inscripcion.jugador_id ||
        !inscripcion.equipo_id ||
        inscripcion.numero_camiseta == null
      ) {
        throw new Error('Faltan datos obligatorios para crear la inscripción');
      }

      const payload = {
        ...inscripcion,
        id: uuidv4(),
      };

      const { data, error } = await this.dbService.insert<
        typeof inscripcion,
        Inscripcion
      >(this.tabla, payload);

      if (!data || error) {
        throw new Error(error || 'Error al crear la inscripción');
      }

      return { data: data, error: false, mensaje: null };
    } catch (error) {
      return {
        data: null,
        error: true,
        mensaje:
          error instanceof Error ? error.message : 'Error al crear inscripción',
      };
    }
  }

  async getInscripcionesByEquipoId(
    equipoId: string
  ): Promise<InscripcionServiceResponse<Inscripcion[]>> {
    try {
      const { data, error } = await this.dbService.getByField<Inscripcion>(
        this.tabla,
        'equipo_id',
        equipoId
      );

      if (error || !data) {
        return {
          data: null,
          error: true,
          mensaje: error || 'No se encontraron inscripciones para este equipo',
        };
      }

      return { data, error: false, mensaje: null };
    } catch (error) {
      return {
        data: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al obtener inscripciones',
      };
    }
  }

  async eliminarInscripcion(
    id: string
  ): Promise<InscripcionServiceResponse<null>> {
    try {
      const { data, error } = await this.dbService.deleteById(this.tabla, id);

      if (error) {
        throw new Error(error);
      }

      return { data, error: false, mensaje: null };
    } catch (error) {
      return {
        data: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al eliminar inscripción',
      };
    }
  }
}

// Exportar instancia singleton
export const inscripcionService = InscripcionService.getInstance();
