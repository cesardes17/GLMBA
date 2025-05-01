import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RequestWithId } from '@/src/types/requests';
import StyledAlert from '@/src/components/common/StyledAlert';
import { CreateTeamSolicitudCard } from './CreateTeamSolicitudCard';
import { JoinTeamSolicitudCard } from './JoinTeamSolicitudCard';
import { LeaveTeamSolicitudCard } from './LeaveTeamSolicitudCard';
import { DissolveTeamSolicitudCard } from './DissolveTeamSolicitudCard';

interface SolicitudesListProps {
  requests: RequestWithId[];
  onAccept: (id: string, tipo: string) => void;
  onReject: (id: string, tipo: string) => void;
  currentUserEmail?: string;
}

export const SolicitudesList: React.FC<SolicitudesListProps> = ({
  requests,
  onAccept,
  onReject,
  currentUserEmail,
}) => {
  if (requests.length === 0) {
    return (
      <StyledAlert variant='info'>
        No tienes ninguna solicitud asociada a tu cuenta. Para crear una nueva
        solicitud, pulsa el botón "Crear Solicitud".
      </StyledAlert>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {requests.map((request) => {
        const aceptar = () => onAccept(request.id, request.data.tipo);
        const rechazar = () => onReject(request.id, request.data.tipo);

        switch (request.data.tipo) {
          case 'crear_equipo':
            return (
              <CreateTeamSolicitudCard
                key={request.id}
                request={request.data}
                onAccept={aceptar}
                onReject={rechazar}
                id={request.id}
                currentUserEmail={currentUserEmail!}
              />
            );
          case 'unirse_equipo':
            return (
              <JoinTeamSolicitudCard
                key={request.id}
                request={request.data}
                onAccept={aceptar}
                onReject={rechazar}
                id={request.id}
              />
            );
          case 'baja_equipo':
            return (
              <LeaveTeamSolicitudCard
                key={request.id}
                request={request.data}
                onAccept={aceptar}
                onReject={rechazar}
                id={request.id}
              />
            );
          case 'disolver_equipo':
            return (
              <DissolveTeamSolicitudCard
                key={request.id}
                request={request.data}
                onAccept={aceptar}
                onReject={rechazar}
                id={request.id}
              />
            );
          default:
            return null;
        }
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
