import { Drawer } from 'expo-router/drawer';
import { useTheme } from "../../src/hooks/useTheme";

export default function DrawerLayout() {
  const { theme } = useTheme();

  return (
    <Drawer
      screenOptions={{
        drawerStyle: { backgroundColor: theme.background },
        drawerActiveTintColor: theme.colorIcon,
        drawerInactiveTintColor: theme.inactiveIconColor,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.textColor,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',        
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Inicio",
          drawerLabel: "Inicio",
        }}
      />
      {/* Add more drawer screens as needed */}
    </Drawer>
  );
}