// Paso 1: Actualizar los tipos en RequestData (src/types/requests.ts o donde esté definido)

export type CreateTeamRequestData = {
  tipo: 'crear_equipo';
  nombre_equipo: string;
  escudo_url: string;
  iniciada_por: {
    id: string;
    email: string;
    nombre: string;
  };
  fecha_creacion: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  motivo: string;
  respuesta_admin?: string;
  fecha_respuesta?: string;
  admin_aprobador?: {
    id: string;
    email: string;
    nombre: string;
  };
};

export type JoinTeamRequestData = {
  tipo: 'unirse_equipo';
  jugador_objetivo: {
    id: string;
    email: string;
    nombre: string;
  };
  equipo: {
    id: string;
    nombre: string;
    escudo_url: string;
  };
  capitan_objetivo: string;
  fecha_creacion: string;
  aprobado_jugador: boolean;
  aprobado_capitan: boolean;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  iniciada_por: {
    id: string;
    email: string;
    nombre: string;
  };
};

export type LeaveTeamRequestData = {
  tipo: 'baja_equipo';
  jugador_objetivo: string;
  equipo: string;
  fecha_creacion: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  motivo: string;
};

export type DissolveTeamRequestData = {
  tipo: 'disolver_equipo';
  capitan_objetivo: string;
  equipo: string;
  fecha_creacion: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  motivo: string;
};

export type RequestData =
  | CreateTeamRequestData
  | JoinTeamRequestData
  | LeaveTeamRequestData
  | DissolveTeamRequestData;

export interface RequestWithId {
  id: string;
  data: RequestData;
}
