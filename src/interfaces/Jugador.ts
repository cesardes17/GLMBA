import { Usuario } from './Usuario';

export interface JugadorBasic {
  usuario_id: string;
  altura_cm: number;
  peso_kg: number;
  posicion_preferida: string;
  dorsal_preferido: number;
  descripcion: string;
  foto_url: string;
  sancionado: boolean;
  equipo_id?: string;
}

export interface Jugador extends JugadorBasic {
  nombre: string;
  apellidos: string;
  email: string;
  rol_id: number;
  creado_en: string;
  activo: boolean;
}

export function isJugador(usuario: Usuario | Jugador): usuario is Jugador {
  return (
    (usuario.rol_id === 5 || usuario.rol_id === 4) &&
    'foto_url' in usuario && // <== actualizado
    'posicion_preferida' in usuario
  );
}
