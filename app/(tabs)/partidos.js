import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useTheme } from "../../src/hooks/useTheme";
import { partidos } from "../../src/data/partidos";
import { useRouter } from 'expo-router';

export default function Partidos() {
  const { theme } = useTheme();
  const router = useRouter();

  const renderPartido = ({ item }) => (
    <Pressable
      style={[styles.partidoCard, { backgroundColor: theme.cardBackground }]}
      onPress={() => router.push(`/partido/${item.id}`)}
    >
      <Text style={[styles.estado, { color: theme.primary }]}>{item.estado}</Text>
      <View style={styles.equipos}>
        <Text style={[styles.equipo, { color: theme.textColor }]}>{item.local}</Text>
        <Text style={[styles.vs, { color: theme.textColor }]}>vs</Text>
        <Text style={[styles.equipo, { color: theme.textColor }]}>{item.visitante}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, { color: theme.textColor }]}>{item.fecha}</Text>
        <Text style={[styles.info, { color: theme.textColor }]}>{item.hora}</Text>
      </View>
      <Text style={[styles.resultado, { color: theme.textColor }]}>{item.resultado}</Text>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={partidos}
        renderItem={renderPartido}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  partidoCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  estado: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  equipos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  equipo: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  vs: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    fontSize: 14,
  },
  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  }
});