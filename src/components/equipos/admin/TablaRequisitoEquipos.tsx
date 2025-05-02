import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { CheckCircleIcon, XCircleIcon } from '../../Icons';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import StyledText from '@/src/components/common/StyledText';
import StyledAlert from '@/src/components/common/StyledAlert';
import StyledActivityIndicator from '@/src/components/common/StyledActivitiIndicator';
import { equipoService } from '@/src/service/equipoService';
import { Equipo } from '@/src/interfaces/Equipo';
import { temporadaService } from '@/src/service/temporadaService';

interface EquipoConRequisito extends Equipo {
  cumpleRequisito: boolean;
  numeroJugadores: number;
}

export default function TablaRequisitoEquipos() {
  const { theme } = useThemeContext();
  const [equipos, setEquipos] = useState<EquipoConRequisito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    try {
      const { error: errorT, temporada } =
        await temporadaService.getTemporadaActiva();

      if (errorT || !temporada) {
        throw new Error('Error al cargar la temporada');
      }
      const {
        equipos: equiposData,
        error,
        mensaje,
      } = await equipoService.getEquiposFromTemporada(temporada.id);

      if (error) {
        throw new Error(mensaje || 'Error al cargar los equipos');
      }

      // Procesar los equipos para agregar el campo cumpleRequisito
      const equiposConRequisito = await Promise.all(
        equiposData.map(async (equipo) => {
          console.log('Equipo id: ', equipo.id);
          const cantidad = await equipoService.getNumeroJugadoresPorEquipo(
            equipo.id
          );
          console.log('Cantidad de jugadores:', cantidad);
          return {
            ...equipo,
            numeroJugadores: cantidad ?? 0,
            cumpleRequisito: (cantidad ?? 0) >= 8,
          };
        })
      );

      setEquipos(equiposConRequisito);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando equipos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <StyledActivityIndicator message='Cargando equipos...' />;
  }

  if (error) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.cardBackground }]}
      >
        <StyledAlert variant='error'>{error}</StyledAlert>
      </View>
    );
  }

  if (equipos.length === 0) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.cardBackground }]}
      >
        <StyledText
          variant='primary'
          size='large'
          weight='bold'
          style={styles.title}
        >
          Equipos inscritos
        </StyledText>
        <StyledAlert variant='info'>
          No hay equipos inscritos en la temporada actual
        </StyledAlert>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <View style={[styles.header, { borderColor: theme.divider }]}>
        <StyledText style={[styles.cell, styles.flex2]} variant='secondary'>
          Equipo
        </StyledText>
        <StyledText style={styles.cell} variant='secondary'>
          Jugadores
        </StyledText>
        <StyledText style={styles.cell} variant='secondary'>
          Requisito
        </StyledText>
      </View>

      <FlatList
        data={equipos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.row, { borderColor: theme.divider }]}>
            <View style={[styles.cell, styles.flex2, styles.equipoContainer]}>
              <Image source={{ uri: item.escudo_url }} style={styles.escudo} />
              <StyledText style={styles.equipoNombre} variant='primary'>
                {item.nombre}
              </StyledText>
            </View>
            <StyledText style={styles.cell} variant='primary'>
              {item.numeroJugadores}
            </StyledText>
            <View style={styles.cell}>
              {item.cumpleRequisito ? (
                <CheckCircleIcon size={20} color={theme.success} />
              ) : (
                <XCircleIcon size={20} color={theme.error} />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  title: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
  },
  cell: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  equipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  escudo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  equipoNombre: {
    fontSize: 14,
  },
});
