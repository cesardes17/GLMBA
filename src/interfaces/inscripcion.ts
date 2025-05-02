export interface Inscripcion {
  id: string;
  jugador_id: string; // UUID
  equipo_id: string;
  numero_camiseta: number;
  fecha_inscripcion: string;
  activo: boolean;
}
