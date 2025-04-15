import { SafeAreaView, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello World</Text>

      <Pressable
        onPress={() => router.push("/login")}
        style={{
          marginTop: 20,
          backgroundColor: "#007AFF",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Go to Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}
