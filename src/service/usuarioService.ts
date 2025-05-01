import { Jugador } from '../interfaces/Jugador';
import { Usuario } from '../interfaces/Usuario';
import { CompletarPerfilJugador, CompletarPerfilUsuario } from '../types/auth';
import { DatabaseService } from './core/databaseService';
import { jugadorService } from './jugadorService';

export type UsuarioServiceResponse = {
  usuario: Usuario | Jugador | null;
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

      // Si el usuario es un jugador (rol_id === 5), obtener la información adicional
      if (data.rol_id === 5) {
        const {
          jugador,
          error: jugadorError,
          mensaje,
        } = await this.jugadorService.getJugadorByUserId(userId);

        if (jugadorError || !jugador) {
          console.error('Error fetching player:', mensaje);
          return {
            usuario: null,
            error: true,
            mensaje:
              mensaje ||
              'No se encontró el jugador con el ID de usuario proporcionado',
          };
        }

        // Combinar la información del usuario con la del jugador
        const jugadorCompleto: Jugador = {
          ...data,
          ...jugador,
        };

        return {
          usuario: jugadorCompleto,
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
      const { data: usuarioCreado, error: errorUsuario } =
        await this.dbService.insert(this.tabla, userData);

      if (errorUsuario || !usuarioCreado) {
        throw new Error(errorUsuario || 'No se pudo crear el usuario');
      }

      let createdUser: Usuario | Jugador | null = usuarioCreado[0] as Usuario;

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
          await this.dbService.deleteById(this.tabla, createdUser.id);
          throw new Error(mensaje || 'Error al crear el jugador');
        }

        createdUser = jugador;
      }

      return {
        usuario: createdUser,
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
