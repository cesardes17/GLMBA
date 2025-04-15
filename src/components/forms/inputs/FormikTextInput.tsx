import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface FormikTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onBlur: () => void;
}
