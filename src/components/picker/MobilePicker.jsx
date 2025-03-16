// src/components/picker/MobilePicker.jsx
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../hooks/useTheme";
import { colors } from "../../theme/colors";
export default function MobilePicker({ data, selectedValue, onValueChange }) {
  const { theme } = useTheme();
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
    >
      {data.map((item) => (
        <Picker.Item
          key={item.key}
          label={item.label}
          value={item.key}
          color={theme.textColor}
        />
      ))}
    </Picker>
  );
}
