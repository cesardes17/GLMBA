import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Dimensions,
} from 'react-native';
import { useAuth } from '../hooks/auth/useAuth';
import ThemePicker from '../components/forms/pickers/ThemePicker';
import Separator from '../components/common/Separator';
import Screen from '../components/layout/Screen';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const ProfileScreen = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.contentWrapper}>
        <ThemePicker />
        <Separator marginVertical={30} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  contentWrapper: {
    width: isWeb ? '50%' : '100%',
    maxWidth: isWeb ? 600 : '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
