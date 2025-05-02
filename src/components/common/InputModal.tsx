import React from 'react';
import { TextInput } from 'react-native';
import StyledModal from './StyledModal';
import { useThemeContext } from '@/src/contexts/ThemeContext';

interface Props {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function InputModal({
  visible,
  value,
  onChangeText,
  onClose,
  onConfirm,
  title = 'Motivo del administrador',
  confirmLabel,
  cancelLabel,
}: Props) {
  const { theme } = useThemeContext();

  return (
    <StyledModal
      visible={visible}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline
        placeholder='Introduce el motivo'
        placeholderTextColor={theme.textSecondary}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 8,
          minHeight: 80,
          borderColor: theme.border,
          color: theme.textPrimary,
          backgroundColor: theme.surfaceColor,
        }}
      />
    </StyledModal>
  );
}
