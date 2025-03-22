import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import StyledButton from './StyledButton';
import { useTheme } from '../../hooks/theme/useTheme';

export default function SegmentedButtons({
  options,
  selectedValue,
  onValueChange,
  containerStyle,
}) {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.scrollContainer, containerStyle]}
    >
      {options.map((option) => (
        <StyledButton
          key={option.value}
          title={option.label}
          onPress={() => onValueChange(option.value)}
          style={[
            styles.button,
            selectedValue === option.value && {
              backgroundColor: theme.buttonbackgroundColor,
              borderColor: theme.buttonBorderColor,
            },
          ]}
          textStyle={[
            styles.buttonText,
            selectedValue === option.value && {
              color: theme.buttonTextColor,
            },
          ]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    gap: 8,
  },
  button: {
    minWidth: 100,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 14,
  },
});
