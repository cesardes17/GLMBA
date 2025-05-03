import { Jugador } from '../interfaces/Jugador';
import { Usuario } from '../interfaces/Usuario';
import { CompletarPerfilJugador, CompletarPerfilUsuario } from '../types/auth';
import { DatabaseService } from './core/databaseService';
import { jugadorService } from './jugadorService';

export type UsuarioServiceResponse = {
  usuario: Usuario | null;
  error: boolean;
  mensaje: string | null;
};

export class UsuarioService {
  private static instance: UsuarioService;
  private dbService: typeof DatabaseService;
  private tabla: string;
  private columnID: string;
  private jugadorService: typeof jugadorService;

  private constructor() {
    this.dbService = DatabaseService;
    this.tabla = 'usuarios';
    this.columnID = 'id';
    this.jugadorService = jugadorService;
  }

  public static getInstance(): UsuarioService {
    if (!UsuarioService.instance) {
      UsuarioService.instance = new UsuarioService();
    }
    return UsuarioService.instance;
  }

  async getUser(userId: string): Promise<UsuarioServiceResponse> {
    try {
      const { data, error } = await this.dbService.getById<Usuario>(
        this.tabla,
        this.columnID,
        userId
      );
      if (error || !data) {
        console.error('Error fetching user:', error);
        return {
          usuario: null,
          error: true,
          mensaje: error || 'No user found with the given ID',
        };
      }
      return {
        usuario: data,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        usuario: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'error al obtener el usuario',
      };
    }
  }

  async updateUser(
    userId: string,
    userData: Partial<Usuario>,
    jugadorData: null | CompletarPerfilJugador = null,
    imageUri: string | null = null
  ): Promise<UsuarioServiceResponse> {
    try {
      const { data, error } = await this.dbService.updateById(
        this.tabla,
        userId,
        userData
      );
      if (error || !data) {
        throw new Error(error || 'No se pudo actualizar el usuario');
      }

      if (userData.rol_id === 5 && jugadorData && imageUri) {
        const {
          error: errorJugador,
          jugador,
          mensaje,
        } = await this.jugadorService.crearJugador(jugadorData, imageUri);
        if (errorJugador || !jugador) {
          // Si falla la creación del jugador, intentar eliminar el usuario creado
          await this.dbService.deleteById(this.tabla, userId);
          throw new Error(mensaje || 'Error al crear el jugador');
        }
        return {
          usuario: { ...data, ...jugador },
          error: false,
          mensaje: null,
        };
      }

      return {
        usuario: data,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        usuario: null,
        error: true,
        mensaje:
          error instanceof Error
            ? error.message
            : 'Error al actualizar el usuario',
      };
    }
  }

  async createUser(
    userData: CompletarPerfilUsuario,
    jugadorData: null | CompletarPerfilJugador,
    imageUri: string | null
  ): Promise<UsuarioServiceResponse> {
    try {
      // Primero crear el usuario
      console.log('userData', userData);
      const { data: usuarioCreado, error: errorUsuario } =
        await this.dbService.insert(this.tabla, userData);

      if (errorUsuario || !usuarioCreado) {
        throw new Error(errorUsuario || 'No se pudo crear el usuario');
      }

      // Si es un jugador, crear el perfil de jugador
      if (jugadorData && imageUri) {
        const jugadorDataConUsuario = {
          ...jugadorData,
        };

        const { jugador, error, mensaje } =
          await this.jugadorService.crearJugador(
            jugadorDataConUsuario,
            imageUri
          );

        if (error || !jugador) {
          // Si falla la creación del jugador, intentar eliminar el usuario creado
          await this.dbService.deleteById(
            this.tabla,
            (usuarioCreado[0] as Usuario).id
          );
          throw new Error(mensaje || 'Error al crear el jugador');
        }
      }

      return {
        usuario: usuarioCreado[0] as Usuario,
        error: false,
        mensaje: null,
      };
    } catch (error) {
      return {
        usuario: null,
        error: true,
        mensaje:
          error instanceof Error ? error.message : 'Error al crear el usuario',
      };
    }
  }
}

// Exportar una instancia única
export const usuarioService = UsuarioService.getInstance();
