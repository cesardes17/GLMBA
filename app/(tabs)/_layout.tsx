import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../../src/context/ThemeContext";
import { useUser } from "../../src/context/UserContext";
import { useEffect, useState } from "react";

function TabBarIcon({
  name,
  color,
}: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} name={name} color={color} />;
}

export default function TabsLayout() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkUserProfile() {
      if (!user) {
        setHasProfile(null);
        return;
      }
    }

    checkUserProfile();
  }, [user]);

  const getProfileScreenConfig = () => {
    if (!user) {
      return {
        title: "Iniciar Sesión",
        href: "/(auth)/login",
        icon: "user-circle", // Changed from "sign-in" to "user-circle"
      };
    }

    if (!hasProfile) {
      return {
        title: "Completar Perfil",
        href: "/(auth)/setup-profile",
        icon: "user-plus", // This one is valid
      };
    }

    return {
      title: "Perfil",
      href: "/(tabs)/profile",
      icon: "user", // This one is valid
    };
  };

  const profileConfig = getProfileScreenConfig();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.activeElement,
        tabBarInactiveTintColor: theme.inactiveElement,
        headerTitleStyle: {
          color: theme.textPrimary,
        },
        headerStyle: {
          borderColor: theme.border,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          backgroundColor: theme.backgroundNavigation,
          borderTopColor: theme.border,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: profileConfig.title,
          href: profileConfig.href,
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name={
                hasProfile === null
                  ? "user-circle"
                  : hasProfile
                    ? "user"
                    : "user-plus"
              }
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Sobre Nosotros",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="info-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
