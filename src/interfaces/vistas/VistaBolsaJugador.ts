export interface VistaBolsaJugador {
  id: string; // ID de la fila en la tabla bolsa_jugadores
  fecha_inscripcion: string;
  jugador_id: string; // este es el usuario_id del jugador
  nombre: string;
  apellidos: string;
  correo: string;
  posicion_preferida: string;
  dorsal_preferido: number;
  foto_url: string;
  solicitudPendiente?: boolean; // se añade manualmente desde el frontend
}
