import StyledText from '@/src/components/common/StyledText';
import StyledButton from '@/src/components/common/StyledButton';
import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { temporadaService } from '@/src/service/temporadaService';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledAlert from '@/src/components/common/StyledAlert';

export default function PanelControlScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [temporadaActiva, setTemporadaActiva] = useState(false);

  useEffect(() => {
    verificarTemporadaActiva();
  }, []);

  const verificarTemporadaActiva = async () => {
    try {
      const { temporada, error, mensaje } =
        await temporadaService.getTemporadaActiva();
      if (error) {
        throw new Error(mensaje || 'Error al verificar la temporada activa');
      }
      setTemporadaActiva(!!temporada);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al verificar la temporada activa'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCrearTemporada = async () => {
    setLoading(true);
    try {
      const { error, mensaje } = await temporadaService.crearTemporada();

      if (error) {
        throw new Error(mensaje || 'Error al crear la temporada');
      }

      await verificarTemporadaActiva();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al crear la temporada'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <StyledActivityIndicator message='Cargando...' />;
  }

  return (
    <View style={styles.container}>
      {error && (
        <StyledAlert variant='error'>
          <StyledText>{error}</StyledText>
        </StyledAlert>
      )}

      {!temporadaActiva ? (
        <View style={styles.buttonContainer}>
          <StyledText style={styles.message}>
            No hay una temporada activa actualmente
          </StyledText>
          <StyledButton
            title='Crear Nueva Temporada'
            onPress={handleCrearTemporada}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <StyledText style={styles.message}>
            Temporada activa - Seleccione una opción:
          </StyledText>
          <StyledButton
            title='Crear Liga'
            onPress={() => {
              /* Implementar creación de liga */
            }}
          />
          <StyledButton
            title='Crear Copa'
            onPress={() => {
              /* Implementar creación de copa */
            }}
          />
          <StyledButton
            title='Crear Playoff'
            onPress={() => {
              /* Implementar creación de playoff */
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    gap: 16,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
});
