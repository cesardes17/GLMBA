import { useTheme } from "../../../hooks/theme/useTheme";
import { View, StyleSheet } from "react-native";
import UniversalPicker from "./UniversalPicker";
import StyledText from "../../common/StyledText";
const themeOptions = [
  { key: 'system', label: 'Preferencias del Sistema' },
  { key: 'light', label: 'Modo Claro' },
  { key: 'dark', label: 'Modo Oscuro' },
];

export default function ThemePicker() {
  const { theme, userPreference, setUserPreference } = useTheme();
  return (
    <View style={[styles.container]}>
      <StyledText style={[styles.title, { color: theme.textColor }]}>
        Selecciona el tema:
      </StyledText>
      <UniversalPicker
        data={themeOptions}
        selectedValue={userPreference}
        onValueChange={setUserPreference}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '75%',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  info: {
    marginTop: 20,
    fontSize: 16,
    alignSelf: 'center',
  },
});
