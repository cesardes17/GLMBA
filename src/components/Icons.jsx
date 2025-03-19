import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";

export const HomeIcon = (props) => {
  return <FontAwesome name="home" {...props} />;
};

export const ProfileIcon = (props) => {
  return <FontAwesome name="user-circle" {...props} />;
};

export const CalendarCheckIcon = (props) => {
  return <FontAwesome6 name="calendar-check" {...props} />;
};

export const ClasificationIcon = (props) => {
  return <AntDesign name="barchart" {...props} />;
};

export const EllipsisIcon = (props) => {
  return <FontAwesome6 name="ellipsis" {...props} />;
};

export const SettingsIcon = (props) => {
  return <FontAwesome name="rog" {...props} />;
};
