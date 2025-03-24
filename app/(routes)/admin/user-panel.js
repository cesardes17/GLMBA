import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import UserPanelScreen from '../../../src/screens/admin/UserPanelScreen';
import WebBackHeader from '../../../src/components/navigation/WebBackHeader';
import { useAuth } from '../../../src/hooks/auth/useAuth';
import { useTheme } from '../../../src/hooks/theme/useTheme';

export default function UserPanel() {
  const router = useRouter();
  const { user, userData, loading } = useAuth();

  const { theme } = useTheme();
  useEffect(() => {
    if (!loading) {
      // Only check auth after loading is complete
      if (!user) {
        router.replace('/login');
        return;
      }

      if (!['organizador', 'co-organizador'].includes(userData?.role)) {
        router.replace('/unauthorized');
        return;
      }
    }
  }, [user, userData, loading, router]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}
      >
        <WebBackHeader title={'Panel de Usuarios'} />

        <ActivityIndicator size="large" color={theme.colorIcon} />
      </View>
    );
  }

  if (!user || !['organizador', 'co-organizador'].includes(userData?.role)) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebBackHeader title={'Panel de Usuarios'} />
      <UserPanelScreen />
    </View>
  );
}
