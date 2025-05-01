import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { InfoIcon, ShieldIcon } from '../Icons';
import { CreateTeamRequest } from '@/src/types/requests';
import StyledAlert from '../common/StyledAlert';
import Separator from '../common/Separator';

interface CreateTeamSolicitudCardProps {
  request: CreateTeamRequest;
  onAccept: (id: string, respuesta_admin: string) => void;
  onReject: (id: string, respuesta_admin: string) => void;
  id: string;
  currentUserEmail: string;
}

export function CreateTeamSolicitudCard({
  request,
  onAccept,
  onReject,
  id,
  currentUserEmail,
}: CreateTeamSolicitudCardProps) {
  const { theme } = useThemeContext();

  const {
    nombre_equipo,
    escudo_url,
    iniciada_por,
    fecha_creacion,
    estado,
    motivo,
    respuesta_admin,
    admin_aprobador,
    fecha_respuesta,
  } = request;

  const formattedDateCreacion = new Date(fecha_creacion).toLocaleDateString(
    'es-ES',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );
  const formattedDateRespuesta = new Date(fecha_respuesta!).toLocaleDateString(
    'es-ES',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  const isSolicitante = request.iniciada_por === currentUserEmail;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.requestCard.card.background,
          borderColor: theme.requestCard.card.border,
          borderLeftColor: theme.requestCard.card.leftBorder,
          borderLeftWidth: 4,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <ShieldIcon size={20} color={theme.requestCard.text.title} />
          <Text style={[styles.title, { color: theme.requestCard.text.title }]}>
            Creación de Equipo
          </Text>
        </View>
        <StatusBadge status={estado} />
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: escudo_url || 'https://via.placeholder.com/100' }}
          style={[styles.image, { borderColor: theme.requestCard.card.border }]}
        />
        <View style={styles.info}>
          <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
            Nombre del Equipo
          </Text>
          <Text
            style={[styles.name, { color: theme.requestCard.text.content }]}
          >
            {nombre_equipo}
          </Text>

          <View style={styles.inlineRow}>
            <Text
              style={[
                styles.inlineText,
                { color: theme.requestCard.text.info },
              ]}
            >
              Solicitado por{' '}
              <Text
                style={[styles.bold, { color: theme.requestCard.text.content }]}
              >
                {iniciada_por}
              </Text>
            </Text>
          </View>

          <View style={styles.inlineRow}>
            <Text
              style={[
                styles.inlineText,
                { color: theme.requestCard.text.info },
              ]}
            >
              {formattedDateCreacion}
            </Text>
          </View>

          <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
            Motivo
          </Text>
          <Text style={[styles.motivo, { color: theme.requestCard.text.info }]}>
            {motivo}
          </Text>
        </View>
      </View>
      <Separator />
      <View style={styles.footer}>
        {estado !== 'pendiente' ? (
          <StyledAlert variant={estado === 'aceptada' ? 'success' : 'error'}>
            <View style={{ gap: 6 }}>
              {respuesta_admin?.trim() !== '' && (
                <Text style={{ color: theme.requestCard.text.content }}>
                  <Text style={{ fontWeight: 'bold' }}>
                    Mensaje del administrador:
                  </Text>{' '}
                  {respuesta_admin}
                </Text>
              )}
              <Text style={{ color: theme.requestCard.text.content }}>
                <Text style={{ fontWeight: 'bold' }}>
                  Administrador que gestionó:
                </Text>{' '}
                {admin_aprobador}
              </Text>
              <Text style={{ color: theme.requestCard.text.content }}>
                <Text style={{ fontWeight: 'bold' }}>Fecha de respuesta:</Text>{' '}
                {formattedDateRespuesta}
              </Text>
            </View>
          </StyledAlert>
        ) : isSolicitante ? (
          <StyledAlert variant='info'>
            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            >
              <InfoIcon color={theme.info} size={16} />
              Pendiente de confirmación por parte de la administración.
            </View>
          </StyledAlert>
        ) : (
          <>
            <Button
              title='Rechazar'
              onPress={() => onReject(id, '')}
              disabled={estado !== 'pendiente'}
              color={theme.error}
            />
            <Button
              title='Aceptar'
              onPress={() => onAccept(id, '')}
              disabled={estado !== 'pendiente'}
              color={theme.success}
            />
          </>
        )}
      </View>
    </View>
  );
}

function StatusBadge({ status }: { status: string }) {
  const { theme } = useThemeContext();
  let badgeStyles;

  switch (status) {
    case 'pendiente':
      badgeStyles = theme.requestCard.status.pending;
      break;
    case 'aceptada':
      badgeStyles = theme.requestCard.status.accepted;
      break;
    case 'rechazada':
      badgeStyles = theme.requestCard.status.rejected;
      break;
    default:
      badgeStyles = theme.requestCard.status.pending;
  }

  return (
    <View style={[styles.badge, { backgroundColor: badgeStyles.background }]}>
      <Text style={[styles.badgeText, { color: badgeStyles.text }]}>
        {status.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  leftBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981', // emerald-500
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 16,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    marginTop: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  inlineIcon: {
    fontSize: 14,
  },
  inlineText: {
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  motivo: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});
