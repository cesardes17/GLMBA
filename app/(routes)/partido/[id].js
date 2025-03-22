import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useTheme } from '../../../src/hooks/theme/useTheme';
import { partidos } from '../../../src/data/partidos';
import { useEffect } from 'react';

export default function PartidoDetalle() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const partido = partidos.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (partido) {
      navigation.setOptions({
        title: `${partido.local} vs ${partido.visitante}`,
        headerBackTitle: 'Partidos',
      });
    }
  }, [partido, navigation]);

  if (!partido) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.text, { color: theme.textColor }]}>
          Partido no encontrado
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.estado, { color: theme.primary }]}>
        {partido.estado}
      </Text>
      <View style={styles.equiposContainer}>
        <Text style={[styles.equipo, { color: theme.textColor }]}>
          {partido.local}
        </Text>
        <Text style={[styles.vs, { color: theme.textColor }]}>VS</Text>
        <Text style={[styles.equipo, { color: theme.textColor }]}>
          {partido.visitante}
        </Text>
      </View>
      <Text style={[styles.resultado, { color: theme.textColor }]}>
        {partido.resultado}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, { color: theme.textColor }]}>
          Fecha: {partido.fecha}
        </Text>
        <Text style={[styles.info, { color: theme.textColor }]}>
          Hora: {partido.hora}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  estado: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  equiposContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  equipo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  vs: {
    fontSize: 18,
    marginVertical: 5,
  },
  resultado: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  infoContainer: {
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
});
