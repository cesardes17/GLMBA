import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PageContainer from '@/src/components/PageContainer';
import SolicitudCard from '@/src/components/solicitudes/solicitudCard';
import { Solicitud } from '../interfaces/Solicitudes';

const solicitudesEjemplo: Solicitud[] = [
  {
    id: 1,
    estado: 'pendiente',
    tipo: 'crear_equipo',
    nombre_equipo: 'Los Tigres',
    escudo_url: 'https://picsum.photos/200',
    motivo:
      'Queremos formar un equipo competitivo para participar en la liga local',
    usuario_id: 'USR123',
    fecha_creacion: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    estado: 'aceptado',
    tipo: 'unirse_equipo',
    equipo_id: 'EQ456',
    motivo:
      'Me gustaría unirme al equipo para aportar mi experiencia como base',
    respuesta_admin:
      'Bienvenido al equipo, tus estadísticas y experiencia serán de gran ayuda',
    usuario_id: 'USR456',
    fecha_creacion: '2024-01-10T15:45:00Z',
    fecha_respuesta: '2024-01-12T09:20:00Z',
  },
  {
    id: 3,
    estado: 'rechazado',
    tipo: 'crear_equipo',
    nombre_equipo: 'Halcones Dorados',
    motivo: 'Nuevo equipo para la liga juvenil',
    respuesta_admin:
      'El nombre del equipo ya está registrado, por favor elige otro nombre',
    usuario_id: 'USR789',
    fecha_creacion: '2024-01-08T18:20:00Z',
    fecha_respuesta: '2024-01-09T11:15:00Z',
  },
];

export default function SolicitudesScreen() {
  return (
    <PageContainer>
      <ScrollView style={styles.container}>
        {solicitudesEjemplo.map((solicitud) => (
          <SolicitudCard key={solicitud.id} solicitud={solicitud} />
        ))}
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
