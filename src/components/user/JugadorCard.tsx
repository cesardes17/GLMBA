// src/components/player/PlayerCard.tsx

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import StyledText from '../common/StyledText';
import { Jugador } from '@/src/interfaces/Jugador';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { AlturaIcon, PesoIcon, PosicionIcon, RolIcon } from '../Icons';
import { useResponsiveLayout } from '@/src/hooks/useResponsiveLayout';
import { getRolesArray } from '@/src/constants/roles';
import { JugadorConEquipo } from '@/src/interfaces/vistas/JugadorConEquipo';

interface PlayerCardProps {
  jugador: JugadorConEquipo;
}

export default function JugadorCard({ jugador }: PlayerCardProps) {
  const { theme } = useThemeContext();
  const { isDesktop } = useResponsiveLayout();
  const roles = getRolesArray();

  const rol = roles.find((rol) => rol.id === jugador.rol_id)?.nombre || '';

  return isDesktop ? (
    <View style={styles.cardWeb}>
      <Image
        source={{ uri: jugador.foto_url! }}
        style={styles.imageWeb}
        resizeMode='cover'
      />
      <View style={styles.contentWeb}>
        <StyledText style={styles.nombre}>
          {jugador.nombre + ' ' + jugador.apellidos}
        </StyledText>
        <StyledText style={styles.apellidos}>{rol}</StyledText>
        <View style={{ flexDirection: 'row' }}>
          <PosicionIcon color={theme.textPrimary} size={20} />
          <StyledText style={styles.text}>
            {jugador.posicion_preferida}
          </StyledText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <AlturaIcon color={theme.textPrimary} size={20} />
          <StyledText style={styles.text}>{jugador.altura_cm} cm</StyledText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <PesoIcon color={theme.textPrimary} size={20} />
          <StyledText style={styles.text}>{jugador.peso_kg} kg</StyledText>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.cardMobile}>
      <Image
        source={{ uri: jugador.foto_url! }}
        style={styles.imageMobile}
        resizeMode='cover'
      />
      <View style={styles.dorsalContainer}>
        <StyledText style={styles.dorsal}>
          {jugador.dorsal_preferido}
        </StyledText>
      </View>
      <View style={styles.contentMobile}>
        <StyledText style={styles.nombre}>
          {jugador.nombre + ' ' + jugador.apellidos}
        </StyledText>
        <View style={{ flexDirection: 'row' }}>
          <RolIcon color={theme.textPrimary} size={20} />
          <StyledText size='large'>{rol}</StyledText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <PosicionIcon color={theme.textPrimary} size={20} />
          <StyledText style={styles.text}>
            {jugador.posicion_preferida}
          </StyledText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <AlturaIcon color={theme.textPrimary} size={20} />
          <StyledText style={styles.text}>{jugador.altura_cm} cm</StyledText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <PesoIcon color={theme.textPrimary} size={20} />
          <StyledText style={styles.text}>{jugador.peso_kg} kg</StyledText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWeb: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageWeb: {
    width: '30%',
    minWidth: 250,
    aspectRatio: 3 / 4,
  },
  cardMobile: {
    minWidth: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    alignSelf: 'center',
  },
  imageMobile: {
    width: '100%',
    aspectRatio: 1, // Hacemos la imagen cuadrada
  },
  contentMobile: {
    padding: 16,
    gap: 12,
  },
  contentWeb: {
    padding: 12,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  apellidos: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
  },
  dorsalContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'red',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dorsal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
