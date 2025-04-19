import { Tabs } from "expo-router";
import {
  HomeIcon,
  LoginIcon,
  ProfileIcon,
  SetupProfileIcon,
} from "../../src/components/Icons";
import { useTheme } from "../../src/context/ThemeContext";
import { useEffect, useState } from "react";
import { useUser } from "../../src/context/UserContext";

export default function TabsLayout() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [ruta, setRuta] = useState("/login");
  function getProfileIcon(color: string) {
    if (ruta.includes("login")) {
      return <LoginIcon color={color} />;
    } else if (ruta.includes("setup-profile")) {
      return <SetupProfileIcon color={color} />;
    } else {
      return <ProfileIcon color={color} />;
    }
  }

  useEffect(() => {
    const getRuta = () => {
      console.log("ruta: ", ruta);
      if (user === null) {
        return "/(auth)/login";
      } else if (ruta.includes("setup-profile")) {
        return "/(auth)/setup-profile";
      } else {
        return "/profile";
      }
    };

    setRuta(getRuta());
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.activeElement,
        tabBarInactiveTintColor: theme.inactiveElement,
        tabBarStyle: {
          backgroundColor: theme.backgroundNavigation,
          borderTopColor: theme.border,
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: theme.backgroundNavigation,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: theme.textPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: ruta.includes("login")
            ? "Inicia Sesión"
            : ruta.includes("setup-profile")
              ? "Completa tu Perfil"
              : "Perfil",
          href: ruta.includes("login")
            ? "/(auth)/login"
            : ruta.includes("setup-profile")
              ? "/(auth)/setup-profile"
              : "/profile",
          tabBarIcon: ({ color }) => getProfileIcon(color),
        }}
      />
    </Tabs>
  );
}
