import { Equipo } from '../interfaces/Equipo';
import { DatabaseService } from './core/databaseService';
import { storageService } from './core/storageService';
import { v4 as uuidv4 } from 'uuid';

export type EquipoServiceResponse = {
  equipo: Equipo | null;
  error: boolean;
  mensaje: string | null;
};

export type EquiposServiceResponse = {
  equipos: Equipo[];
  error: boolean;
  mensaje: string | null;
};

export class EquipoService {
  private static instance: EquipoService;
  private dbService = DatabaseService;
  private tabla = 'equipos';
  private bucket = 'escudosequipos';

  private constructor() {}

  public static getInstance(): EquipoService {
    if (!EquipoService.instance) {
      EquipoService.instance = new EquipoService();
    }
    return EquipoService.instance;
  }

  async createEquipo(
    payload: Omit<Equipo, 'id' | 'fecha_creacion'>
  ): Promise<EquipoServiceResponse> {
    try {
      let escudo_url = payload.escudo_url;

      if (escudo_url && !escudo_url.startsWith('http')) {
        const { data, error, mensaje } = await storageService.getPublicUrl(
          this.bucket,
          escudo_url
        );
        if (error || !data) throw new Error(mensaje ?? 'Error al subir escudo');
        console.log(data);
        escudo_url = data.publicUrl;
      }

      const equipoData = {
        ...payload,
        escudo_url,
        id: uuidv4(),
      };

      console.log(equipoData);
      const { data: created, error } = await this.dbService.insert<
        typeof equipoData,
        Equipo
      >(this.tabla, equipoData);

      if (error || !created || created.length === 0) {
        throw new Error(error || 'No se pudo crear el equipo');
      }

      return { equipo: created[0], error: false, mensaje: null };
    } catch (error) {
      return {
        equipo: null,
        error: true,
        mensaje:
          error instanceof Error ? error.message : 'Error creando equipo',
      };
    }
  }

  async getEquipo(id: string): Promise<EquipoServiceResponse> {
    try {
      const { data, error } = await this.dbService.getById<Equipo>(
        this.tabla,
        'id',
        id
      );
      if (error || !data) throw new Error(error || 'Equipo no encontrado');
      return { equipo: data, error: false, mensaje: null };
    } catch (error) {
      return {
        equipo: null,
        error: true,
        mensaje:
          error instanceof Error ? error.message : 'Error obteniendo equipo',
      };
    }
  }

  async getEquipos(): Promise<EquiposServiceResponse> {
    try {
      const { data, error } = await this.dbService.getAll<Equipo>(this.tabla);
      if (error || !data) throw new Error(error || 'Error obteniendo equipos');
      return { equipos: data, error: false, mensaje: null };
    } catch (error) {
      return {
        equipos: [],
        error: true,
        mensaje: error instanceof Error ? error.message : 'Error inesperado',
      };
    }
  }

  async updateEquipo(
    id: string,
    updates: Partial<Equipo>
  ): Promise<EquipoServiceResponse> {
    try {
      const { data, error } = await this.dbService.updateById<Equipo>(
        this.tabla,
        id,
        updates
      );
      if (error || !data)
        throw new Error(error || 'Error al actualizar el equipo');
      return { equipo: data, error: false, mensaje: null };
    } catch (error) {
      return {
        equipo: null,
        error: true,
        mensaje: error instanceof Error ? error.message : 'Error inesperado',
      };
    }
  }

  async deleteEquipo(
    id: string
  ): Promise<{ error: boolean; mensaje: string | null }> {
    try {
      const { error } = await this.dbService.deleteById(this.tabla, id);
      if (error) throw new Error(error);
      return { error: false, mensaje: null };
    } catch (error) {
      return {
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error inesperado al borrar el equipo',
      };
    }
  }
  async getNumeroJugadoresPorEquipo(equipoId: string): Promise<number | null> {
    const { data, error } = await this.dbService.callRpc<number>(
      'count_inscripciones_por_equipo',
      { equipo: equipoId }
    );

    console.log(data);
    if (error || data === null) {
      console.error('Error contando jugadores del equipo:', error);
      return null;
    }
    return data;
  }
}

export const equipoService = EquipoService.getInstance();
