import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import StyledText from '../../common/StyledText';
import StyledButton from '../../common/StyledButton';
import { useTheme } from '../../../hooks/theme/useTheme';

export default function UserCard({ user }) {
  const router = useRouter();
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.background,
          borderWidth: 1,
          borderColor: theme.borderColor,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          isSmallScreen && styles.containerSmallScreen,
        ]}
      >
        <View style={[styles.column, isSmallScreen && styles.columnSmallScreen]}>
          <StyledText style={[styles.name, { color: theme.textColor }]}>
            {user.fullName}
          </StyledText>
          <StyledText style={{ color: theme.color }}>{user.email}</StyledText>
        </View>

        <View style={[styles.column, isSmallScreen && styles.columnSmallScreen]}>
          <StyledText style={{ color: theme.color }}>
            Rol: {user.role}
          </StyledText>
          {user.role === 'jugador' && (
            <View style={styles.playerInfo}>
              <StyledText style={{ color: theme.color }}>
                Número: #{user.jerseyNumber}
              </StyledText>
              <StyledText style={{ color: theme.color }}>
                Altura: {user.height}cm
              </StyledText>
              <StyledText style={{ color: theme.color }}>
                Posición Favorita: {user.favPosition}
              </StyledText>
            </View>
          )}
        </View>

        <View style={[styles.column, isSmallScreen && styles.columnSmallScreen]}>
          <StyledButton
            title={'Edit User'}
            onPress={() => router.push(`/admin/edit-user/${user.uid}`)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  containerSmallScreen: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  columnSmallScreen: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  playerInfo: {
    marginTop: 8,
  },
});
