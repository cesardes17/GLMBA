import { SafeAreaView, Text, View } from "react-native";

export default function About() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>About this app!</Text>
    </SafeAreaView>
  );
}
