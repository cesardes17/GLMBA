import { ScrollView } from 'react-native';
import { navigationItems } from '@/src/constants/navigationItems';
import { useUserContext } from '@/src/contexts/UserContext';
import { router } from 'expo-router';
import { ROLES, RolKey } from '../constants/roles';
import NavigationCard from '@/src/components/navigation/NavigationCard';

export default function MasScreen() {
  const { usuario } = useUserContext();
  const userRol = usuario?.rol_id
    ? (Object.keys(ROLES).find(
        (key) => ROLES[key as RolKey].id === usuario.rol_id
      ) as RolKey)
    : null;

  const filteredItems = navigationItems.filter(
    (item) =>
      item.allowedRoles.includes('*') ||
      (item.allowedRoles.includes('auth') && usuario) ||
      (userRol && item.allowedRoles.includes(userRol))
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 10, alignItems: 'center' }}>
      {filteredItems.map((item) => (
        <NavigationCard
          key={item.id}
          item={item}
          onPress={() => router.push(item.path)}
        />
      ))}
    </ScrollView>
  );
}
