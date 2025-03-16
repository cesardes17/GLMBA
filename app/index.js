// components/SomeComponent.js
import React from "react";
import { View, Text, Platform } from "react-native";
import { useTheme } from "../src/hooks/useTheme";
import { Redirect } from "expo-router";

export default function SomeComponent() {
  if (Platform.OS === "web") {
    return <Redirect href={"/(drawer)"} />;
  }
  return <Redirect href={"/(tabs)"} />;
}
