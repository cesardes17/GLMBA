// src/components/UniversalPicker.jsx
import React from "react";
import { Platform } from "react-native";
import MobilePicker from "./picker/MobilePicker";
import WebPicker from "./picker/WebPicker";

export default function UniversalPicker({
  data,
  selectedValue,
  onValueChange,
}) {
  return Platform.OS === "web" ? (
    <WebPicker
      data={data}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    />
  ) : (
    <MobilePicker
      data={data}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    />
  );
}
