export type CreateTeamRequest = {
  tipo: 'crear_equipo';
  nombre_equipo: string;
  escudo_url: string;
  iniciada_por: string;
  fecha_creacion: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  motivo: string;
};

export type JoinTeamRequest = {
  tipo: 'unirse_equipo';
  jugador_objetivo: string;
  equipo: string;
  capitan_objetivo: string;
  fecha_creacion: string;
  aprobado_jugador: boolean;
  aprobado_capitan: boolean;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
};

export type LeaveTeamRequest = {
  tipo: 'baja_equipo';
  jugador_objetivo: string;
  equipo: string;
  fecha_creacion: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  motivo: string;
};

export type DissolveTeamRequest = {
  tipo: 'disolver_equipo';
  capitan_objetivo: string;
  equipo: string;
  fecha_creacion: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
  motivo: string;
};

export type Request =
  | CreateTeamRequest
  | JoinTeamRequest
  | LeaveTeamRequest
  | DissolveTeamRequest;

export interface RequestWithId {
  id: string;
  data: Request;
}
