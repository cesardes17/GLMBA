// /app/index.js
import React from "react";
import GamesScreen from "../src/screens/GamesScreen";
import { Platform } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {
  if (Platform.OS === "web") {
    return <Redirect href="(drawer)/" />; // 🔹 Redirigir al Drawer
  }
  return <GamesScreen />;
}
