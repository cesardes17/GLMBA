import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  UserPlusIcon,
  UserIcon,
  UsersIcon,
  RibbonOutlineIcon,
  CalendarIcon,
} from '../Icons';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { JoinTeamRequest } from '@/src/types/requests';

interface JoinTeamRequestProps {
  request: JoinTeamRequest;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  id: string;
}

export function JoinTeamSolicitudCard({
  request,
  onAccept,
  onReject,
  id,
}: JoinTeamRequestProps) {
  const { theme } = useThemeContext();
  const {
    jugador_objetivo,
    equipo,
    capitan_objetivo,
    fecha_creacion,
    aprobado_jugador,
    aprobado_capitan,
    estado,
  } = request;

  const formattedDate = new Date(fecha_creacion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const isWaiting = !aprobado_jugador || !aprobado_capitan;

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
          <UserPlusIcon size={20} color={theme.requestCard.text.title} />
          <Text style={[styles.title, { color: theme.requestCard.text.title }]}>
            Unión a Equipo
          </Text>
        </View>
        <StatusBadge status={estado} />
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
          Jugador
        </Text>
        <View style={styles.row}>
          <UserIcon size={14} color={theme.requestCard.text.info} />
          <Text
            style={[styles.value, { color: theme.requestCard.text.content }]}
          >
            {jugador_objetivo}
          </Text>
        </View>
        <ApprovalBadge approved={aprobado_jugador} label='Jugador' />
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
          Equipo
        </Text>
        <View style={styles.row}>
          <UsersIcon size={14} color={theme.requestCard.text.info} />
          <Text
            style={[styles.value, { color: theme.requestCard.text.content }]}
          >
            {equipo}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
          Capitán
        </Text>
        <View style={styles.row}>
          <RibbonOutlineIcon size={14} color={theme.requestCard.text.info} />
          <Text
            style={[styles.value, { color: theme.requestCard.text.content }]}
          >
            {capitan_objetivo}
          </Text>
        </View>
        <ApprovalBadge approved={aprobado_capitan} label='Capitán' />
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.requestCard.text.label }]}>
          Fecha de Solicitud
        </Text>
        <View style={styles.row}>
          <CalendarIcon size={14} color={theme.requestCard.text.info} />
          <Text
            style={[styles.value, { color: theme.requestCard.text.content }]}
          >
            {formattedDate}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        {isWaiting ? (
          <Text style={[styles.waiting, { color: theme.warning }]}>
            Esperando confirmación...
          </Text>
        ) : (
          <>
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

function ApprovalBadge({
  approved,
  label,
}: {
  approved: boolean;
  label: string;
}) {
  const { theme } = useThemeContext();
  const badgeStyles = approved
    ? theme.requestCard.status.accepted
    : theme.requestCard.status.pending;
  const text = approved
    ? `${label} aprobado`
    : `Pendiente de ${label.toLowerCase()}`;

  return (
    <View
      style={[
        styles.approvalBadge,
        { backgroundColor: badgeStyles.background },
      ]}
    >
      <Text style={[styles.approvalBadgeText, { color: badgeStyles.text }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
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
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  approvalBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  approvalBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  waiting: {
    fontSize: 14,
    color: '#b45309',
    fontWeight: '500',
  },
});
