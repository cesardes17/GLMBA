// src/components/UniversalPicker.jsx
import React from "react";
import { Platform, StyleSheet } from "react-native";
import MobilePicker from "./picker/MobilePicker";
import { useTheme } from "../hooks/useTheme";
export default function UniversalPicker({
  data,
  selectedValue,
  onValueChange,
}) {
  const { theme } = useTheme();

  if (Platform.OS === "web") {
    return (
      <select
        value={selectedValue}
        onChange={(e) => onValueChange(e.target.value)}
        style={{
          backgroundColor: theme.inputBackgroundColor,
          color: theme.inputTextColor,
          borderColor: theme.inputBorderColor,
          borderWidth: 1, // Necesario para que el borde sea visible
          maxWidth: 300,
          padding: 10,
          fontSize: 16,
          alignSelf: "center",
        }}
      >
        {data.map((item) => (
          <option key={item.key} value={item.key}>
            {item.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <MobilePicker
      data={data}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    />
  );
}
