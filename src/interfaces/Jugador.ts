import { Usuario } from './Usuario';

export interface Jugador extends Usuario {
  id: string;
  usuario_id: string;
  altura_cm: number;
  peso_kg: number;
  posicion_preferida: string;
  dorsal_preferido: number;
  descripcion: string;
  foto_name: string;
  sancionado: boolean; // Cambiado de 'sancion' a 'sancionado' para coincidir con la base de datos
  equipo_id?: string;
}

export function isJugador(usuario: Usuario | Jugador): usuario is Jugador {
  return (
    (usuario.rol_id === 5 || usuario.rol_id === 4) &&
    'foto_name' in usuario &&
    'posicion_preferida' in usuario
  );
}
