import { Tabs, Redirect } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../../src/context/ThemeContext";
import { useUser } from "../../src/context/UserContext";
import { useEffect, useState } from "react";
import { isUsuario } from "../../src/types/usuario";
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
  const [hasProfile, setHasProfile] = useState<boolean | null | undefined>(
    undefined
  );

  useEffect(() => {
    async function checkUserProfile() {
      if (user === undefined) {
      }
      if (!user) {
        setHasProfile(null);
        return;
      }
      setHasProfile(isUsuario(user));
    }

    checkUserProfile();
  }, [user]);

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
  if (hasProfile === false) {
    return <Redirect href="/(auth)/setup-profile" />;
  }

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
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name={hasProfile ? "user" : "user-plus"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
