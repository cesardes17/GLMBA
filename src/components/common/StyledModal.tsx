import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
  return (
    <Modal visible={visible} transparent animationType='slide'>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Motivo del administrador</Text>
          <TextInput
            style={styles.input}
            placeholder='Introduce el motivo de la decisión'
            value={value}
            onChangeText={onChangeText}
            multiline
          />
          <View style={styles.buttons}>
            <Button title='Cancelar' onPress={onClose} color='#999' />
            <Button title={confirmLabel} onPress={onConfirm} color='#28a745' />
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
