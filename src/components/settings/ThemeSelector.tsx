import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import CustomPicker from '@/src/components/common/CustomPicker';
import StyledText from '@/src/components/common/StyledText';

type ThemePreference = 'light' | 'system' | 'dark';

const ThemeSelector: React.FC = () => {
  const { themePreference, setThemePreference, theme } = useThemeContext();

  const themeOptions = [
    { id: 'light', titulo: 'Claro' },
    { id: 'system', titulo: 'Sistema' },
    { id: 'dark', titulo: 'Oscuro' },
  ];

  return (
    <View style={styles.section}>
      <StyledText
        style={[styles.title, { color: theme.textPrimary }]}
        weight='bold'
      >
        Selecciona el tema
      </StyledText>
      <CustomPicker
        options={themeOptions}
        selectedValue={themePreference}
        setSelectedValue={(value) =>
          setThemePreference(value as ThemePreference)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default ThemeSelector;
