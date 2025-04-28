import { useThemeContext } from '@/src/contexts/ThemeContext';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Option {
  id: string;
  titulo: string;
  descripcion?: string;
}

interface CustomPickerProps {
  options: Option[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  options,
  selectedValue,
  setSelectedValue,
}) => {
  const { theme } = useThemeContext();

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            { borderColor: theme.border },
            selectedValue === option.id && {
              backgroundColor: theme.primary,
              borderColor: theme.primaryDark,
            },
          ]}
          onPress={() => handleSelect(option.id)}
        >
          <Text
            style={[
              styles.optionText,
              { color: theme.textPrimary },
              selectedValue === option.id && {
                color: theme.textInverted,
                fontWeight: 'bold',
              },
            ]}
          >
            {option.titulo}
          </Text>
          {option.descripcion && (
            <Text style={{ color: theme.textSecondary }}>
              {option.descripcion}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 8,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  option: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 4,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomPicker;
