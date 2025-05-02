import React from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { useThemeContext } from '@/src/contexts/ThemeContext';

interface Props {
  visible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  onConfirm: (event: GestureResponderEvent) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  title?: string;
  children?: React.ReactNode;
}

export default function StyledModal({
  visible,
  onClose,
  onConfirm,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  title,
  children,
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
          {title && (
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              {title}
            </Text>
          )}

          {children}

          <View style={styles.buttons}>
            <Button title={cancelLabel} onPress={onClose} color={theme.error} />
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 16,
  },
});
