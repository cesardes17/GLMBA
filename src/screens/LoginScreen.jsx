// /src/screens/LoginScreen.jsx
import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Separator from "../components/Separator";
import StyledButton from "../components/StyledButton";

export default function LoginScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{flex:1, justifyContent:"center", alignItems:"center"}} >
      <LoginForm />
      <Separator color="#CCCCCC" width="90%" marginVertical={20} />
      <StyledButton title="Crea una Cuenta" onPress={() => {
        router.replace("/register")
      }} />
    </SafeAreaView>
  );
}
