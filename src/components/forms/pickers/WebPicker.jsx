// src/components/picker/WebPicker.jsx
import React from "react";
import { useTheme } from "../../../hooks/theme/useTheme";

export default function WebPicker({ data, selectedValue, onValueChange }) {
  const { theme } = useTheme();

  return (
    <select
      value={selectedValue}
      onChange={(e) => onValueChange(e.target.value)}
      style={{
        backgroundColor: theme.background,
        color: theme.textColor,
        padding: '8px',
        borderRadius: '4px',
        border: `1px solid ${theme.borderColor}`,
        fontSize: '16px',
        width: '100%'
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
