import React from 'react';
import { RequestWithId } from '@/src/types/requests';
import { CreateTeamSolicitudCard } from './CreateTeamSolicitudCard';
import { JoinTeamSolicitudCard } from './JoinTeamSolicitudCard';
import { useUserContext } from '@/src/contexts/UserContext';
import { useAuth } from '@/src/contexts/AuthContext';

interface SolicitudItemRendererProps {
  solicitud: RequestWithId;
  onAccept: (id: string, tipo: string) => void;
  onReject: (id: string, tipo: string) => void;
  esAdmin: boolean;
}

export default function SolicitudItemRenderer({
  solicitud,
  onAccept,
  onReject,
  esAdmin,
}: SolicitudItemRendererProps) {
  const { authUser } = useAuth();
  const { usuario } = useUserContext();

  const { id, data } = solicitud;

  switch (data.tipo) {
    case 'crear_equipo':
      return (
        <CreateTeamSolicitudCard
          id={id}
          request={data}
          onAccept={() => onAccept(id, data.tipo)}
          onReject={() => onReject(id, data.tipo)}
          currentUserEmail={authUser?.email ?? ''}
        />
      );
    case 'unirse_equipo':
      return (
        <JoinTeamSolicitudCard
          id={id}
          request={data}
          onAccept={() => onAccept(id, data.tipo)}
          onReject={() => onReject(id, data.tipo)}
          currentUserEmail={authUser?.email ?? ''}
          esAdmin={esAdmin}
        />
      );
    default:
      return null;
  }
}
