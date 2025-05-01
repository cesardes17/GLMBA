import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { temporadaService } from '@/src/service/temporadaService';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import StyledAlert from '@/src/components/common/StyledAlert';
import StyledText from '@/src/components/common/StyledText';
import StyledButton from '@/src/components/common/StyledButton';

export default function TemporadaManager() {
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

  const handleCrearLiga = async () => {
    // TODO: Implementar la lógica de creación de liga
    console.log('Crear liga');
  };

  const handleCrearCopa = async () => {
    // TODO: Implementar la lógica de creación de copa
    console.log('Crear copa');
  };

  const handleCrearPlayoff = async () => {
    // TODO: Implementar la lógica de creación de playoff
    console.log('Crear playoff');
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

      <View style={styles.buttonContainer}>
        <StyledText style={styles.message}>
          Temporada activa - Seleccione una opción:
        </StyledText>
        <StyledButton title='Crear Liga' onPress={handleCrearLiga} />
        <StyledButton title='Crear Copa' onPress={handleCrearCopa} />
        <StyledButton title='Crear Playoff' onPress={handleCrearPlayoff} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
});
