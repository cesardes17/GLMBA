import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

type CustomIconsProps = {
  color: string;
  size?: number;
};

export const HomeIcon = ({ color, size = 24 }: CustomIconsProps) => {
  return <Feather name="home" size={size} color={color} />;
};

export const ProfileIcon = ({ color, size = 24 }: CustomIconsProps) => {
  return <FontAwesome name="user-circle" size={size} color={color} />;
};

export const SetupProfileIcon = ({ color, size = 24 }: CustomIconsProps) => {
  return <FontAwesome5 name="addres-card" size={size} color={color} />;
};

export const LoginIcon = ({ color, size = 24 }: CustomIconsProps) => {
  return <MaterialIcons name="login" size={size} color={color} />;
};
