// src/components/picker/WebPicker.jsx
import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function WebPicker({ data, selectedValue, onValueChange }) {
  const { theme } = useTheme();

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
        minWidth: 250,
        padding: 10,
        fontSize: 14,
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
