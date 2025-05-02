// src/utils/navigation.ts
import { Platform } from 'react-native';
import { Redirect } from 'expo-router';

export const redirectIfWeb = (webRoute: string) => {
  if (Platform.OS === 'web') {
    return <Redirect href={webRoute} />;
  }
  return null;
};
