// src/components/picker/MobilePicker.jsx
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/theme/useTheme';

export default function MobilePicker({ data, selectedValue, onValueChange }) {
  const { theme } = useTheme();

  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
        style={styles.picker}
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
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    ...Platform.select({
      ios: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 5,
      },
    }),
  },
});
