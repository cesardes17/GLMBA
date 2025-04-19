import React, { useEffect } from 'react';
import { Modal, View, StyleSheet, Animated } from 'react-native';
import StyledText from './StyledText';
import { useTheme } from '../../context/ThemeContext';

interface StyledToastProps {
  visible: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function StyledToast({ 
  visible, 
  type, 
  message, 
  onClose,
  duration = 2000 
}: StyledToastProps) {
  const { theme } = useTheme();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  const getToastStyle = () => ({
    success: { backgroundColor: theme.success + '20', borderColor: theme.success },
    error: { backgroundColor: theme.error + '20', borderColor: theme.error },
    warning: { backgroundColor: theme.warning + '20', borderColor: theme.warning },
    info: { backgroundColor: theme.info + '20', borderColor: theme.info },
  }[type]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={[styles.toastContainer, getToastStyle()]}>
          <StyledText style={{ color: getToastStyle().borderColor }}>
            {message}
          </StyledText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toastContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: '90%',
    minWidth: '60%',
    alignItems: 'center',
  },
});