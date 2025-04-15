import { router } from "expo-router";
import { Pressable, SafeAreaView, Text } from "react-native";
import { HeaderConfig } from "../../components/HeaderConfig";

export default function Login() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderConfig title="Login" backTitle="Inicio" />
      <Text>Login!</Text>
      <Pressable
        onPress={() => router.replace("/registro")}
        style={{
          marginTop: 20,
          backgroundColor: "#007AFF",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Go to Registro
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
