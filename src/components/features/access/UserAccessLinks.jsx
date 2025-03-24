import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import StyledText from '../../common/StyledText';
import StyledButton from '../../common/StyledButton';
import { useTheme } from '../../../hooks/theme/useTheme';

export default function UserAccessLinks({ userRole }) {
  const router = useRouter();
  const { theme } = useTheme();

  const getAccessLinks = () => {
    switch (userRole) {
      case 'organizador':
        return [{ title: 'Panel de Usuarios', route: '/admin/user-panel' }];

      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      {getAccessLinks().map((link, index) => (
        <StyledButton
          key={index}
          title={link.title}
          onPress={() => router.push(link.route)}
          style={styles.button}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  button: {
    marginBottom: 12,
  },
});
