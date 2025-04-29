import React, { useState } from 'react';
import { Pressable, StyleSheet, Platform, Alert } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { SubirImagenIcon } from '../Icons';

interface ImagePickerProps {
  onImageSelected: (imageUri: string) => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'danger';
  size?: 'small' | 'default' | 'large';
}

const MAX_SIZE_MB = 4;
const RESIZE_WIDTH = 800;
const COMPRESSION = 0.7;

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

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];

        let finalUri = asset.uri;

        if (Platform.OS !== 'web') {
          // 🖼 Redimensiona y comprime
          const manipulated = await ImageManipulator.manipulateAsync(
            asset.uri,
            [{ resize: { width: RESIZE_WIDTH } }],
            { compress: COMPRESSION, format: ImageManipulator.SaveFormat.JPEG }
          );

          const info = await FileSystem.getInfoAsync(manipulated.uri);
          if (!info.exists) {
            Alert.alert(
              'Error',
              'No se pudo acceder a la imagen seleccionada.'
            );
            return;
          }
          const sizeInMB = info.size / (1024 * 1024);

          if (sizeInMB > MAX_SIZE_MB) {
            Alert.alert(
              'Imagen demasiado grande',
              'Por favor selecciona una imagen de menos de 4 MB.'
            );
            return;
          }

          finalUri = manipulated.uri;
        }

        onImageSelected(finalUri);
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
