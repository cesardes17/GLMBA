import { Jugador } from '../interfaces/Jugador';
import { Usuario } from '../interfaces/Usuario';

export type CompletarPerfilUsuario = Omit<Usuario, 'creado_en' | 'activo'>;
export type CompletarPerfilJugador = {
  usuario_id: string;
  altura_cm: number;
  peso_kg: number;
  posicion_preferida: string;
  dorsal_preferido: number;
  descripcion: string;
  foto_url: string;
};
