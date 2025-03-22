import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/theme/useTheme';

export default function WebBackHeader({ title, onBack = '/' }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Stack.Screen
      options={{
        title: title,
        headerTitleAlign: 'center',
        headerLeft:
          Platform.OS === 'web'
            ? () => (
                <AntDesign
                  name="arrowleft"
                  size={24}
                  onPress={() => router.replace(onBack)}
                  style={{ marginLeft: 16, color: theme.textColor }}
                />
              )
            : undefined,
      }}
    />
  );
}
