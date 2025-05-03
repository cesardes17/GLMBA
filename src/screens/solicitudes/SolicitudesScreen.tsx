import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { temporadaService } from '@/src/service/temporadaService';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledAlert from '@/src/components/common/StyledAlert';
import StyledText from '@/src/components/common/StyledText';
import { PlusIcon, WarningIcon } from '@/src/components/Icons';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import SolicitudesList from '@/src/components/solicitudes/SolicitudesList';
import { router } from 'expo-router';

export default function SolicitudesScreen() {
  const { theme } = useThemeContext();
  const [loading, setLoading] = useState(true);
  const [hayTemporadaActiva, setHayTemporadaActiva] = useState(false);

  const verificarTemporadaActiva = useCallback(async () => {
    setLoading(true);
    try {
      const { temporada, error } = await temporadaService.getTemporadaActiva();
      if (error) throw new Error('Error al consultar la temporada activa');
      setHayTemporadaActiva(!!temporada);
    } catch (err) {
      console.error('Error verificando temporada:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verificarTemporadaActiva();
  }, [verificarTemporadaActiva]);

  if (loading) {
    return <StyledActivityIndicator message='Cargando solicitudes...' />;
  }

  if (!hayTemporadaActiva) {
    return (
      <StyledAlert variant='warning'>
        <View style={styles.alertContent}>
          <WarningIcon size={24} color={theme.warning} />
          <View style={styles.alertTextContainer}>
            <StyledText
              size='large'
              style={[styles.alertTitle, { color: theme.warning }]}
            >
              No hay ninguna temporada activa
            </StyledText>
            <StyledText
              style={[styles.alertDescription, { color: theme.warning }]}
            >
              No se puede operar con las solicitudes mientras no haya una
              temporada activa. Cuando los organizadores publiquen una nueva
              temporada, podrás gestionar tus solicitudes.
            </StyledText>
          </View>
        </View>
      </StyledAlert>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 8 }}>
      <TouchableOpacity
        style={[
          styles.createButton,
          { backgroundColor: theme.requestCard.card.background },
        ]}
        onPress={() => router.push('/nuevaSolicitud')}
      >
        <View style={styles.buttonContent}>
          <PlusIcon size={20} color={theme.textPrimary} />
          <StyledText style={[styles.buttonText, { color: theme.textPrimary }]}>
            Añadir nueva solicitud
          </StyledText>
        </View>
      </TouchableOpacity>
      <SolicitudesList />
    </View>
  );
}

const styles = StyleSheet.create({
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertTextContainer: {
    flex: 1,
    gap: 4,
  },
  alertTitle: {
    fontWeight: '600',
  },
  alertDescription: {
    opacity: 0.9,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 16,
    marginBottom: 16,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
