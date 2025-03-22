import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import StyledText from '../../common/StyledText';
import StyledButton from '../../common/StyledButton';
import { useTheme } from '../../../hooks/theme/useTheme';

export default function UserCard({ user }) {
  const router = useRouter();
  const { theme } = useTheme();

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
      <View style={styles.userInfo}>
        <StyledText style={[styles.name, { color: theme.textColor }]}>
          {user.fullName}
        </StyledText>
        <StyledText style={{ color: theme.color }}>{user.email}</StyledText>
        <StyledText style={{ color: theme.color }}>
          Role: {user.role}
        </StyledText>
        {user.role === 'jugador' && (
          <View
            style={[styles.playerInfo, { borderTopColor: theme.borderColor }]}
          >
            <StyledText style={{ color: theme.color }}>
              Jersey: #{user.jerseyNumber} | Height: {user.height}cm | Position:{' '}
              {user.favPosition}
            </StyledText>
          </View>
        )}
      </View>
      <StyledButton
        title={'Edit User'}
        onPress={() => router.push(`/admin/edit-user/${user.uid}`)}
      />
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
  userInfo: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  playerInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
  },
});