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
  dorsal_jugador?: number;
}
export interface UsuarioRelacionado {
  id: string;
  nombre: string;
  email: string;
}

export interface EquipoRelacionado {
  id: string;
  nombre: string;
  escudo_url: string;
}

export interface SolicitudExpandida {
  id: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  tipo:
    | 'crear_equipo'
    | 'unirse_equipo'
    | 'baja_equipo'
    | 'disolver_equipo'
    | 'expulsar_jugador';
  equipo_id?: EquipoRelacionado | null;
  nombre_equipo?: string;
  escudo_url?: string;
  motivo?: string;
  respuesta_admin?: string;
  iniciada_por_id: UsuarioRelacionado;
  fecha_creacion: string;
  fecha_respuesta?: string;
  jugador_objetivo_id?: UsuarioRelacionado;
  capitan_objetivo_id?: UsuarioRelacionado;
  admin_aprobador_id?: UsuarioRelacionado;
  aprobado_jugador?: boolean;
  aprobado_capitan?: boolean;
  aprobado_admin?: boolean;
  dorsal_jugador?: number;
}
