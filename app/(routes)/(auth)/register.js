import RegisterScreen from "../../../src/screens/RegisterScreen";
import {  View } from "react-native";
import { useTheme } from "../../../src/hooks/useTheme";
import WebBackHeader from "../../../src/components/navigation/WebBackHeader";

export default function Register() {
  const {theme} = useTheme();

  return(
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <WebBackHeader title="Crea una Cuenta" onBack="/login" />
      <RegisterScreen />
    </View>
  );
}