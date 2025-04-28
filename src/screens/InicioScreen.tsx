import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import CustomPicker from '@/src/components/common/CustomPicker';
import PageContainer from '@/src/components/PageContainer';

// Ensure ThemePreference type is correctly defined and imported
type ThemePreference = 'light' | 'system' | 'dark';

const ThemePicker: React.FC = () => {
  const { themePreference, setThemePreference, theme } = useThemeContext();

  const themeOptions = [
    { id: 'light', titulo: 'Claro' },
    { id: 'system', titulo: 'Sistema' },
    { id: 'dark', titulo: 'Oscuro' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Selecciona el tema
      </Text>
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

const InicioScreen: React.FC = () => {
  return (
    <PageContainer>
      <ThemePicker />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default InicioScreen;
