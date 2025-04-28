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
}
