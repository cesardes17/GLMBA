import React from 'react';
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
interface IconProps {
  size?: number;
  color: string;
}

export const HomeIcon = ({ size = 24, color }: IconProps) => {
  return <Entypo name='home' size={size} color={color} />;
};

export const PerfilIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome name='user-circle' size={size} color={color} />;
};

export const CompletarPerfilIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='user-edit' size={size} color={color} />;
};

export const LoginIcon = ({ size = 24, color }: IconProps) => {
  return <SimpleLineIcons name='login' size={size} color={color} />;
};

export const CalendarioIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='calendar-alt' size={size} color={color} />;
};

export const ClasificacionIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='trophy' size={size} color={color} />;
};

export const NavegacionIcon = ({ size = 24, color }: IconProps) => {
  return <Entypo name='menu' size={size} color={color} />;
};

export const SubirImagenIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='image' size={size} color={color} />;
};

export const AlturaIcon = ({ size = 24, color }: IconProps) => {
  return <Entypo name='ruler' size={size} color={color} />;
};

export const PesoIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='weight-hanging' size={size} color={color} />;
};

export const PosicionIcon = ({ size = 24, color }: IconProps) => {
  return <Ionicons name='basketball-outline' size={size} color={color} />;
};

export const ShieldIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='shield-alt' size={size} color={color} />;
};

export const UserPlusIcon = ({ size = 24, color }: IconProps) => {
  return <Feather name='user-plus' size={size} color={color} />;
};

export const UserIcon = ({ size = 24, color }: IconProps) => {
  return <Feather name='user' size={size} color={color} />;
};

export const UsersIcon = ({ size = 24, color }: IconProps) => {
  return <Feather name='users' size={size} color={color} />;
};

export const RibbonOutlineIcon = ({ size = 24, color }: IconProps) => {
  return <Ionicons name='ribbon-outline' size={size} color={color} />;
};

export const CalendarIcon = ({ size = 24, color }: IconProps) => {
  return <Feather name='calendar' size={size} color={color} />;
};

export const ChevronDownIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome name='chevron-down' size={size} color={color} />;
};

export const EditIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome name='edit' size={size} color={color} />;
};

export const BanIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome name='ban' size={size} color={color} />;
};

export const CheckCircleIcon = ({ size = 24, color }: IconProps) => {
  return <Feather name='check-circle' size={size} color={color} />;
};

export const XCircleIcon = ({ size = 24, color }: IconProps) => {
  return <Feather name='x-circle' size={size} color={color} />;
};

export const CloseIcon = ({ size = 24, color }: IconProps) => {
  return <AntDesign name='close' size={size} color={color} />;
};

export const ArrowBackIosIcon = ({ size = 24, color }: IconProps) => {
  return <MaterialIcons name='arrow-back-ios-new' size={size} color={color} />;
};

export const ArrowBackIcon = ({ size = 24, color }: IconProps) => {
  return <Ionicons name='arrow-back' size={size} color={color} />;
};

export const RolIcon = ({ size = 24, color }: IconProps) => {
  return (
    <MaterialCommunityIcons name='badge-account' size={size} color={color} />
  );
};

export const DownIcon = ({ size = 24, color }: IconProps) => {
  return <Entypo name='chevron-down' size={size} color={color} />;
};

export const UpIcon = ({ size = 24, color }: IconProps) => {
  return <Entypo name='chevron-up' size={size} color={color} />;
};

export const InfoIcon = ({ size = 24, color }: IconProps) => {
  return <AntDesign name='infocirlceo' size={size} color={color} />;
};

export const PlusIcon = ({ size = 24, color }: IconProps) => {
  return <AntDesign name='plus' size={size} color={color} />;
};

export const LogOutIcon = ({ size = 24, color }: IconProps) => {
  return <MaterialIcons name='logout' size={size} color={color} />;
};

export const TrashIcon = ({ size = 24, color }: IconProps) => {
  return <Feather name='trash-2' size={size} color={color} />;
};

export const AwardIcon = ({ size = 24, color }: IconProps) => {
  return <Feather name='award' size={size} color={color} />;
};

export const WarningIcon = ({ size = 24, color }: IconProps) => {
  return <AntDesign name='warning' size={size} color={color} />;
};

export const PaperAirplaneIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='paper-plane' size={size} color={color} />;
};

export const EmailIcon = ({ size = 24, color }: IconProps) => {
  return <Feather name='at-sign' size={size} color={color} />;
};
