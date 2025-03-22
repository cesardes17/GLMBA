import LoginScreen from "../../../src/screens/LoginScreen";
import WebBackHeader from "../../../src/components/navigation/WebBackHeader";
import {  View } from "react-native";
import { useTheme } from "../../../src/hooks/useTheme";

export default function Login() {
    const {theme} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <WebBackHeader title="Iniciar Sesión" />
      <LoginScreen />
    </View>
  );
  
}