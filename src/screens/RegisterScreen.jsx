// /src/screens/RegistrationScreen.jsx
import React from "react";
import { ScrollView, StyleSheet, Platform } from "react-native";
import RegistrationForm from "../components/forms/RegistartionFrom";
import Screen from "../components/layout/Screen";

export default function RegisterScreen() {
  return (
    <Screen>
      <ScrollView
        style={[styles.scrollView, Platform.OS === "web" && styles.webWidth]}
        contentContainerStyle={styles.scrollContainer}
      >
        <RegistrationForm />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  webWidth: {
    width: "50%",
    alignSelf: "center",
  },
  scrollContainer: {
    padding: 16,
  },
});
