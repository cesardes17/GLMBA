import { router, useNavigation } from "expo-router";
import { Pressable, SafeAreaView, Text } from "react-native";
import { HeaderConfig } from "../../components/HeaderConfig";
import { useEffect, useState } from "react";

export default function Registro() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderConfig title="Registro" backTitle="Inicio" />
      <Text>Login!</Text>

      <Pressable
        onPress={() => router.replace("/login")}
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
