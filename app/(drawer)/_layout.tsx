import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "../../src/context/ThemeContext";
import React, { useEffect, useState } from "react";
import { useUser } from "../../src/context/UserContext";
import { isUsuario } from "../../src/types/usuario";
export default function DrawerLayout() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [isUser, setIsUser] = useState<null | boolean>(null);

  useEffect(() => {
    if (user === null) {
      setIsUser(null);
    } else {
      setIsUser(isUsuario(user));
    }
  }, [user]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.backgroundNavigation,
            borderWidth: 0,
          },
          headerTitleStyle: {
            color: theme.textPrimary,
          },
          headerTintColor: theme.activeElement,
          drawerActiveTintColor: theme.textPrimary,
          drawerInactiveTintColor: theme.textPrimary,
          drawerLabelStyle: {
            fontSize: 16,
            textAlign: "center",
            fontWeight: "600",
          },
          drawerStyle: {
            backgroundColor: theme.backgroundNavigation,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Inicio",
          }}
        />
        <Drawer.Screen
          name={
            isUser === null
              ? "/(auth)/login"
              : isUser
                ? "/profile"
                : "/(auth)/setup-profile"
          }
          options={{
            title:
              isUser === null
                ? "login"
                : isUser
                  ? "/profile"
                  : "/(auth)/setup-profile",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
