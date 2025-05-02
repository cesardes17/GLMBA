export interface BolsaJugador {
  id: string;
  jugador_id: string; // uuid (ya no es bigint)
  fecha_inscripcion: string; // ISO string o Date
}
