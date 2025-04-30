import StyledText from '@/src/components/common/StyledText';
import StyledTextInput from '@/src/components/common/StyledTextInput';
import { PlusIcon } from '@/src/components/Icons';
import { CreateTeamSolicitudCard } from '@/src/components/solicitudes/CreateTeamSolicitudCard';
import { DissolveTeamSolicitudCard } from '@/src/components/solicitudes/DissolveTeamSolicitudCard';
import { JoinTeamSolicitudCard } from '@/src/components/solicitudes/JoinTeamSolicitudCard';
import { LeaveTeamSolicitudCard } from '@/src/components/solicitudes/LeaveTeamSolicitudCard';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useResponsiveLayout } from '@/src/hooks/useResponsiveLayout';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';

import { RequestWithId } from '@/src/types/requests';

export default function SolicitudesScreen() {
  const { theme } = useThemeContext();
  const { isMobile } = useResponsiveLayout();
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<RequestWithId[]>([
    {
      id: '1',
      data: {
        tipo: 'crear_equipo',
        nombre_equipo: 'Los Halcones',
        escudo_url: 'https://via.placeholder.com/100',
        iniciada_por: 'Carlos Gómez',
        fecha_creacion: '2024-04-28',
        estado: 'pendiente',
        motivo: 'Queremos formar un nuevo equipo con jugadores sin club.',
      },
    },
    {
      id: '2',
      data: {
        tipo: 'unirse_equipo',
        jugador_objetivo: 'Lucas Ortega',
        equipo: 'Tiburones',
        capitan_objetivo: 'Manuel Díaz',
        fecha_creacion: '2024-04-27',
        aprobado_jugador: false,
        aprobado_capitan: true,
        estado: 'pendiente',
      },
    },
    {
      id: '3',
      data: {
        tipo: 'baja_equipo',
        jugador_objetivo: 'Javier Pérez',
        equipo: 'Lobos',
        fecha_creacion: '2024-04-25',
        estado: 'pendiente',
        motivo: 'No podré continuar la temporada.',
      },
    },
    {
      id: '4',
      data: {
        tipo: 'disolver_equipo',
        capitan_objetivo: 'Sandra Martín',
        equipo: 'Cóndores',
        fecha_creacion: '2024-04-22',
        estado: 'pendiente',
        motivo: 'Muchos jugadores se han dado de baja, no podemos continuar.',
      },
    },
  ]);

  const handleAccept = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, data: { ...req.data, estado: 'aceptada' } }
          : req
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, data: { ...req.data, estado: 'rechazada' } }
          : req
      )
    );
  };

  return (
    <>
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <View
          style={[
            styles.searchContainer,
            isMobile && styles.searchContainerMobile,
          ]}
        >
          <StyledTextInput
            style={styles.searchInput}
            placeholder='Buscar solicitudes...'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.createButton,
            { backgroundColor: theme.requestCard.card.background },
            isMobile && styles.createButtonMobile,
          ]}
          onPress={() => router.push('nuevaSolicitud')}
        >
          <View style={styles.buttonContent}>
            <PlusIcon size={20} color={theme.textPrimary} />
            <StyledText
              style={[styles.buttonText, { color: theme.textPrimary }]}
            >
              Crear Solicitud
            </StyledText>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {requests.map((request) => {
          switch (request.data.tipo) {
            case 'crear_equipo':
              return (
                <CreateTeamSolicitudCard
                  key={request.id}
                  request={request.data}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  id={request.id}
                />
              );
            case 'unirse_equipo':
              return (
                <JoinTeamSolicitudCard
                  key={request.id}
                  request={request.data}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  id={request.id}
                />
              );
            case 'baja_equipo':
              return (
                <LeaveTeamSolicitudCard
                  key={request.id}
                  request={request.data}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  id={request.id}
                />
              );
            case 'disolver_equipo':
              return (
                <DissolveTeamSolicitudCard
                  key={request.id}
                  request={request.data}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  id={request.id}
                />
              );
            default:
              return null;
          }
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'center', // Añadimos esta propiedad para centrar verticalmente
  },
  headerMobile: {
    flexDirection: 'column',
    paddingBottom: 0,
  },
  searchContainer: {
    flex: 3,
    justifyContent: 'center', // Centramos el contenido del contenedor de búsqueda
  },
  searchContainerMobile: {
    flex: undefined,
    width: '100%',
    marginBottom: 12,
  },
  searchInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    height: 48, // Altura fija para el input
  },
  createButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    height: 48, // Altura fija para mantener consistencia
    alignItems: 'center', // Centramos verticalmente el contenido
  },
  createButtonMobile: {
    flex: undefined,
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
