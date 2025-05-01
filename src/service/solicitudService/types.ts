import { Solicitud } from '@/src/interfaces/Solicitudes';

export type SolicitudServiceResponse = {
  solicitud: Solicitud | null;
  error: boolean;
  mensaje: string | null;
};

export type SolicitudesServiceResponse = {
  solicitudes: Solicitud[];
  error: boolean;
  mensaje: string | null;
};
