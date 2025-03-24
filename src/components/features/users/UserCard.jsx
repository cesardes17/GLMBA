import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyledText from '../../common/StyledText';
import StyledButton from '../../common/StyledButton';
import { useTheme } from '../../../hooks/theme/useTheme';
import { useRouter } from 'expo-router';

const UserCard = ({ user }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const renderExtraInfo = () => {
    if (user.role === 'jugador') {
      return (
        <>
          <StyledText style={styles.extraInfo}>
            Número: {user.jerseyNumber || 'N/A'}
          </StyledText>
          <StyledText style={styles.extraInfo}>
            Altura: {user.height || 'N/A'} cm
          </StyledText>
          <StyledText style={styles.extraInfo}>
            Posición: {user.favPosition || 'N/A'}
          </StyledText>
        </>
      );
    }
    return null;
  };

  const handleEditUser = () => {
    console.log('Edit user:', user);
  };

  return (
    <View
      style={[
        styles.userCard,
        {
          backgroundColor: theme.background,
          borderColor: theme.borderColor,
          borderWidth: 1,
        },
      ]}
    >
      <View style={styles.mainContent}>
        <StyledText style={styles.email}>{user.email}</StyledText>
        <View style={styles.infoContainer}>
          <View style={styles.roleSection}>
            <StyledText style={styles.name}>{user.fullName}</StyledText>
            <StyledText style={styles.role}>{user.role}</StyledText>
          </View>
          <View style={styles.extraInfoSection}>{renderExtraInfo()}</View>
        </View>
      </View>

      <View style={styles.editSection}>
        <StyledButton
          icon={
            <Ionicons name="pencil" size={24} color={theme.buttonTextColor} />
          }
          onPress={handleEditUser}
          style={styles.editButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainContent: {
    flex: 3,
    paddingRight: 16,
  },
  editSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  roleSection: {
    flex: 1,
    paddingRight: 8,
  },
  extraInfoSection: {
    flex: 1,
    paddingLeft: 8,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  editButton: {
    minWidth: 50,
    height: 50,
    padding: 8,
  },
  extraInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default UserCard;
