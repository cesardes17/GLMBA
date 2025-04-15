import { Redirect } from "expo-router";
import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Root() {
  if (Platform.OS === "web") {
    return <Redirect href="/(drawer)" />;
  }
  return <Redirect href={"/(tabs)"} />;
}
