import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useThemeContext } from '@/src/contexts/ThemeContext';

interface Props {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel: string;
}

export default function StyledModal({
  visible,
  value,
  onChangeText,
  onClose,
  onConfirm,
  confirmLabel,
}: Props) {
  const { theme } = useThemeContext();

  return (
    <Modal visible={visible} transparent animationType='fade'>
      <View style={[styles.overlay, { backgroundColor: theme.backdrop }]}>
        <View
          style={[
            styles.modal,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Motivo del administrador
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.surfaceColor,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
            placeholder='Introduce el motivo de la decisión'
            placeholderTextColor={theme.textSecondary}
            value={value}
            onChangeText={onChangeText}
            multiline
          />
          <View style={styles.buttons}>
            <Button title='Cancelar' onPress={onClose} color={theme.error} />
            <Button
              title={confirmLabel}
              onPress={onConfirm}
              color={theme.success}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  modal: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});
