// /app/index.js
import React from "react";
import { Platform } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {
  if (Platform.OS === "web") {
    return <Redirect href="(drawer)/" />; // 🔹 Redirigir al Drawer
  }
  return <Redirect href="(tabs)/" />; // 🔹 Redirigir al Drawer
}
