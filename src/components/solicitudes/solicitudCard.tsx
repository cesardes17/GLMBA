import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  CalendarioIcon,
  DownIcon,
  InfoIcon,
  ShieldIcon,
  UpIcon,
  UserIcon,
} from '../Icons';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { Solicitud } from '@/src/interfaces/Solicitudes';
import StyledText from '../common/StyledText';

interface SolicitudCardProps {
  solicitud: Solicitud;
}

export default function SolicitudCard({ solicitud }: SolicitudCardProps) {
  const [isMotivoOpen, setIsMotivoOpen] = useState(false);
  const [isRespuestaOpen, setIsRespuestaOpen] = useState(false);
  const { theme } = useThemeContext();
  const estadoColors: Record<string, string> = {
    pendiente: theme.textDisabled,
    aceptado: theme.success,
    rechazado: theme.error,
  };

  const fechaCreacionFormateada = new Date(
    solicitud.fecha_creacion
  ).toLocaleDateString();
  const fechaRespuestaFormateada = solicitud.fecha_respuesta
    ? new Date(solicitud.fecha_respuesta).toLocaleDateString()
    : null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
          shadowColor: theme.shadow,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <StyledText variant='primary' weight='bold' size='medium'>
          {solicitud.tipo === 'crear_equipo'
            ? 'Crear equipo'
            : 'Unirse a equipo'}
        </StyledText>
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                estadoColors[solicitud.estado.toLowerCase()] ||
                theme.textDisabled,
            },
          ]}
        >
          <StyledText style={styles.badgeText} variant='primary'>
            {solicitud.estado}
          </StyledText>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {solicitud.tipo === 'crear_equipo' && solicitud.nombre_equipo ? (
          <View style={styles.row}>
            {solicitud.escudo_url && (
              <Image
                source={{ uri: solicitud.escudo_url }}
                style={[styles.avatar, { borderColor: theme.border }]}
                resizeMode='cover'
              />
            )}
            <View style={styles.textContainer}>
              <StyledText variant='secondary' size='small'>
                Nombre propuesto:
              </StyledText>
              <StyledText variant='primary' weight='medium'>
                {solicitud.nombre_equipo}
              </StyledText>
            </View>
          </View>
        ) : solicitud.equipo_id ? (
          <View style={styles.row}>
            <ShieldIcon size={16} color={theme.textSecondary} />
            <View style={styles.textContainer}>
              <StyledText variant='secondary' size='small'>
                ID equipo:
              </StyledText>
              <StyledText
                style={[
                  styles.monoText,
                  { backgroundColor: theme.surfaceColor },
                ]}
              >
                {solicitud.equipo_id}
              </StyledText>
            </View>
          </View>
        ) : null}

        {/* Fecha de creación */}
        <View style={styles.row}>
          <CalendarioIcon size={16} color={theme.textSecondary} />
          <View style={styles.textContainer}>
            <StyledText variant='secondary' size='small'>
              Creada:
            </StyledText>
            <StyledText variant='primary'>{fechaCreacionFormateada}</StyledText>
          </View>
        </View>

        {/* Motivo */}
        {solicitud.motivo && (
          <View style={[styles.section, { borderColor: theme.divider }]}>
            <TouchableOpacity
              onPress={() => setIsMotivoOpen(!isMotivoOpen)}
              style={styles.sectionHeader}
            >
              <View style={styles.row}>
                <InfoIcon size={16} color={theme.textSecondary} />
                <StyledText variant='secondary' size='small'>
                  Motivo
                </StyledText>
              </View>
              {isMotivoOpen ? (
                <UpIcon color={theme.textPrimary} size={16} />
              ) : (
                <DownIcon color={theme.textPrimary} size={16} />
              )}
            </TouchableOpacity>
            {isMotivoOpen && (
              <View style={styles.sectionContent}>
                <StyledText variant='secondary'>{solicitud.motivo}</StyledText>
              </View>
            )}
          </View>
        )}

        {/* Respuesta del admin */}
        {solicitud.respuesta_admin && (
          <View style={[styles.section, { borderColor: theme.divider }]}>
            <TouchableOpacity
              onPress={() => setIsRespuestaOpen(!isRespuestaOpen)}
              style={styles.sectionHeader}
            >
              <StyledText variant='secondary' size='small'>
                Respuesta admin
              </StyledText>
              {isRespuestaOpen ? (
                <UpIcon color={theme.textPrimary} size={16} />
              ) : (
                <DownIcon color={theme.textPrimary} size={16} />
              )}
            </TouchableOpacity>
            {isRespuestaOpen && (
              <View style={styles.sectionContent}>
                <StyledText variant='secondary'>
                  {solicitud.respuesta_admin}
                </StyledText>
                {fechaRespuestaFormateada && (
                  <StyledText variant='secondary' style={{ marginTop: 4 }}>
                    Respondido: {fechaRespuestaFormateada}
                  </StyledText>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={[styles.footer, { borderColor: theme.divider }]}>
        <UserIcon size={16} color={theme.textSecondary} />
        <StyledText variant='secondary'>ID: {solicitud.usuario_id}</StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    textTransform: 'capitalize',
  },
  content: {
    marginVertical: 8,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textContainer: {
    flex: 1,
  },
  monoText: {
    fontSize: 12,
    fontFamily: 'monospace',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
  },
  section: {
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  sectionContent: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    marginTop: 8,
  },
});
