import React from 'react';
import { Platform } from 'react-native';
import MobilePicker from './MobilePicker';
import WebPicker from './WebPicker';

export default function UniversalPicker({
  data,
  selectedValue,
  onValueChange,
}) {
  return Platform.OS === 'web' ? (
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
