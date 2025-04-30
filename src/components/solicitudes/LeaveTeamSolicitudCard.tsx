import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { UserIcon, UsersIcon, CalendarIcon, LogOutIcon } from '../Icons';

interface LeaveTeamRequestProps {
  request: {
    tipo: 'baja_equipo';
    jugador_objetivo: string;
    equipo: string;
    fecha_creacion: string;
    estado: 'pendiente' | 'aceptada' | 'rechazada';
    motivo: string;
  };
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  id: string;
}

export function LeaveTeamSolicitudCard({
  request,
  onAccept,
  onReject,
  id,
}: LeaveTeamRequestProps) {
  const { theme } = useThemeContext();
  const { jugador_objetivo, equipo, fecha_creacion, estado, motivo } = request;

  const formattedDate = new Date(fecha_creacion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.requestCard.card.background,
          borderColor: theme.requestCard.card.border,
          borderLeftColor: theme.requestCard.card.leftBorder,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LogOutIcon size={20} color={theme.requestCard.text.title} />
          <Text
            style={[
              styles.headerTitle,
              { color: theme.requestCard.text.title },
            ]}
          >
            Baja de Equipo
          </Text>
        </View>
        <StatusBadge status={estado} />
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
          Jugador:
        </Text>
        <View style={styles.row}>
          <UserIcon size={14} color={theme.requestCard.text.info} />
          <Text
            style={[styles.text, { color: theme.requestCard.text.content }]}
          >
            {jugador_objetivo}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
          Equipo actual:
        </Text>
        <View style={styles.row}>
          <UsersIcon size={14} color={theme.requestCard.text.info} />
          <Text
            style={[styles.text, { color: theme.requestCard.text.content }]}
          >
            {equipo}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
          Fecha de solicitud:
        </Text>
        <View style={styles.row}>
          <CalendarIcon size={14} color={theme.requestCard.text.info} />
          <Text
            style={[styles.text, { color: theme.requestCard.text.content }]}
          >
            {formattedDate}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
          Motivo:
        </Text>
        <Text
          style={[
            styles.motivo,
            {
              color: theme.requestCard.text.info,
              backgroundColor: theme.requestCard.card.background,
              borderColor: theme.requestCard.card.border,
            },
          ]}
        >
          {motivo}
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          title='Rechazar'
          onPress={() => onReject(id)}
          disabled={estado !== 'pendiente'}
          color={theme.error}
        />
        <Button
          title='Aceptar'
          onPress={() => onAccept(id)}
          disabled={estado !== 'pendiente'}
          color={theme.success}
        />
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
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    fontSize: 14,
  },
  motivo: {
    fontSize: 14,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    gap: 8,
  },
});
