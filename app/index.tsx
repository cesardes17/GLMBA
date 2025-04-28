import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

export default function IndexRoot() {
  const ruta = Platform.OS === 'web' ? '/(drawer)/' : '/(tabs)/';

  return <Redirect href={ruta} />;
}
