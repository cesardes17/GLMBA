export interface Solicitud {
  id: string; // UUID
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  tipo:
    | 'crear_equipo'
    | 'unirse_equipo'
    | 'baja_equipo'
    | 'disolver_equipo'
    | 'expulsar_jugador';
  equipo_id?: string;
  nombre_equipo?: string;
  escudo_url?: string;
  motivo?: string;
  respuesta_admin?: string;
  iniciada_por_id: string;
  fecha_creacion: string;
  fecha_respuesta?: string;
  jugador_objetivo_id?: string;
  capitan_objetivo_id?: string;
  admin_aprobador_id?: string;
  aprobado_jugador?: boolean;
  aprobado_capitan?: boolean;
  aprobado_admin?: boolean;
}
