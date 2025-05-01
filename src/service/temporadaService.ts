import { Temporada } from '../interfaces/Temporada';
import { DatabaseService } from './core/databaseService';
// Cambiar la importación de uuid
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export type TemporadaServiceResponse = {
  temporada: Temporada | null;
  error: boolean;
  mensaje: string | null;
};

export type TemporadasServiceResponse = {
  temporadas: Temporada[];
  error: boolean;
  mensaje: string | null;
};

export class TemporadaService {
  private static instance: TemporadaService;
  private dbService: typeof DatabaseService;
  private tabla: string;

  private constructor() {
    this.dbService = DatabaseService;
    this.tabla = 'temporadas';
  }

  public static getInstance(): TemporadaService {
    if (!TemporadaService.instance) {
      TemporadaService.instance = new TemporadaService();
    }
    return TemporadaService.instance;
  }

  async crearTemporada(): Promise<TemporadaServiceResponse> {
    try {
      // Validar que no exista ya una temporada activa
      const { data: activas, error: errorActiva } =
        await this.dbService.getByField<Temporada>(
          this.tabla,
          'estado',
          'activa'
        );

      if (errorActiva) {
        throw new Error('errorActiva');
      }

      if (activas && activas.length > 0) {
        return {
          temporada: null,
          error: true,
          mensaje: 'Ya existe una temporada activa.',
        };
      }

      const fechaInicio = new Date().toISOString();
      const nuevaTemporada: Temporada = {
        id: uuidv4(),
        nombre: `Temporada ${new Date().getFullYear()}`,
        fecha_inicio: fechaInicio,
        fecha_fin: null,
        estado: 'activa',
      };

      const { data, error } = await this.dbService.insert<
        typeof nuevaTemporada,
        Temporada
      >(this.tabla, nuevaTemporada);

      if (error || !data || data.length === 0) {
        throw new Error(error || 'Error al crear la temporada');
      }

      return {
        temporada: data[0],
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        temporada: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al crear la temporada',
      };
    }
  }

  async getTemporadaActiva(): Promise<TemporadaServiceResponse> {
    try {
      const { data, error } = await this.dbService.getByField<Temporada>(
        this.tabla,
        'estado',
        'activa'
      );

      if (error) {
        throw new Error(error);
      }

      return {
        temporada: data && data.length > 0 ? data[0] : null,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        temporada: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al obtener la temporada activa',
      };
    }
  }

  async getTodasTemporadas(): Promise<TemporadasServiceResponse> {
    try {
      const { data, error } = await this.dbService.getAll<Temporada>(
        this.tabla
      );

      if (error || !data) {
        throw new Error(error || 'No se pudieron obtener las temporadas');
      }

      return {
        temporadas: data,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        temporadas: [],
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al obtener las temporadas',
      };
    }
  }

  async finalizarTemporada(id: string): Promise<TemporadaServiceResponse> {
    try {
      const { data, error } = await this.dbService.updateById<Temporada>(
        this.tabla,
        id,
        { estado: 'finalizada' }
      );

      if (error || !data) {
        throw new Error(error || 'No se pudo finalizar la temporada');
      }

      return {
        temporada: data,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        temporada: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al finalizar la temporada',
      };
    }
  }
}

// Exportar instancia única
export const temporadaService = TemporadaService.getInstance();
