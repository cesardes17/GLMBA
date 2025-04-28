import React, { useState } from 'react';
import { Pressable, StyleSheet, Platform } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { SubirImagenIcon } from '../Icons';

interface ImagePickerProps {
  onImageSelected: (imageUri: string) => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'danger';
  size?: 'small' | 'default' | 'large';
}

export default function ImagePicker({
  onImageSelected,
  disabled = false,
  variant = 'default',
  size = 'default',
}: ImagePickerProps) {
  const { theme } = useThemeContext();
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    if (disabled) return theme.button.disabled;
    if (variant === 'danger')
      return isPressed ? theme.button.dangerActive : theme.button.danger;
    if (variant === 'outline') return theme.button.outline;
    return isPressed ? theme.button.active : theme.button.default;
  };

  const buttonStyle = getButtonStyle();

  const sizeStyles = {
    small: { paddingVertical: 8, paddingHorizontal: 16, minWidth: 100 },
    default: { paddingVertical: 12, paddingHorizontal: 24, minWidth: 150 },
    large: { paddingVertical: 16, paddingHorizontal: 32, minWidth: 200 },
  };

  const pickImage = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } =
          await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Se necesitan permisos para acceder a la galería.');
          return;
        }
      }

      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: Platform.OS !== 'web',
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const assetUri = result.assets[0].uri;
        onImageSelected(assetUri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
    }
  };

  return (
    <Pressable
      onPress={disabled ? undefined : pickImage}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      style={[
        styles.button,
        sizeStyles[size],
        {
          backgroundColor: buttonStyle.background,
          borderColor: buttonStyle.border,
          borderWidth: variant === 'outline' ? 2 : 1,
        },
        isPressed && !disabled && buttonStyle.shadow
          ? {
              shadowColor: buttonStyle.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }
          : null,
      ]}
    >
      <SubirImagenIcon size={24} color={buttonStyle.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
