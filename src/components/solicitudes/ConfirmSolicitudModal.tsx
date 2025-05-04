import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import StyledText from '../common/StyledText';

interface ConfirmSolicitudModalProps {
  visible: boolean;
  tipoSolicitud:
    | 'crear_equipo'
    | 'unirse_equipo'
    | 'baja_equipo'
    | 'disolver_equipo';
  esAdmin: boolean;
  esJugador: boolean;
  esAceptacion: boolean; // ✅ NUEVO
  dorsalesOcupados?: number[];
  onClose: () => void;
  onConfirm: (dorsal?: number, motivo?: string) => void;
}

const ConfirmSolicitudModal: React.FC<ConfirmSolicitudModalProps> = ({
  visible,
  tipoSolicitud,
  esAdmin,
  esJugador,
  dorsalesOcupados = [],
  onClose,
  onConfirm,
  esAceptacion,
}) => {
  const { theme } = useThemeContext();

  const mostrarInputMotivo =
    esAdmin &&
    (tipoSolicitud === 'crear_equipo' ||
      tipoSolicitud === 'disolver_equipo' ||
      tipoSolicitud === 'baja_equipo' ||
      tipoSolicitud === 'unirse_equipo') &&
    !esAceptacion;

  const mostrarInputDorsal =
    tipoSolicitud === 'unirse_equipo' && esJugador && esAceptacion;
  const initialValues = {
    motivo: '',
    dorsal: '',
  };

  const validationSchema = Yup.object({
    ...(mostrarInputMotivo && {
      motivo: Yup.string().required('El motivo es requerido'),
    }),
    ...(mostrarInputDorsal && {
      dorsal: Yup.number()
        .required('El dorsal es requerido')
        .positive('Debe ser positivo')
        .integer('Debe ser entero')
        .test(
          'disponible',
          'Dorsal ocupado',
          (val) => !dorsalesOcupados.includes(val || 0)
        ),
    }),
  });

  const getTitle = (): string => {
    const accion = esAceptacion ? 'Aceptar' : 'Rechazar';

    switch (tipoSolicitud) {
      case 'crear_equipo':
        return `${accion} solicitud de creación de equipo`;
      case 'unirse_equipo':
        return `${accion} solicitud de unión a equipo`;
      case 'baja_equipo':
        return `${accion} solicitud de baja de equipo`;
      case 'disolver_equipo':
        return `${accion} solicitud de disolución de equipo`;
      default:
        return `${accion} solicitud`;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[styles.container, { backgroundColor: theme.backgroundColor }]}
        >
          <StyledText style={styles.title}>{getTitle()}</StyledText>

          {mostrarInputDorsal && dorsalesOcupados.length > 0 && (
            <StyledText
              style={{
                marginBottom: 12,
                textAlign: 'center',
                color: theme.info,
              }}
            >
              Dorsales ocupados: {dorsalesOcupados.join(', ')}
            </StyledText>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const dorsal = mostrarInputDorsal
                ? Number(values.dorsal)
                : undefined;
              const motivo = mostrarInputMotivo ? values.motivo : undefined;
              onConfirm(dorsal, motivo);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                {mostrarInputDorsal && (
                  <View style={styles.inputGroup}>
                    <TextInput
                      placeholder='Ingresa dorsal'
                      keyboardType='numeric'
                      style={[
                        styles.input,
                        {
                          color: theme.textPrimary,
                          borderColor: theme.border,
                          backgroundColor: theme.input.background,
                        },
                      ]}
                      placeholderTextColor={theme.textSecondary}
                      value={values.dorsal}
                      onChangeText={handleChange('dorsal')}
                      onBlur={handleBlur('dorsal')}
                    />
                    {touched.dorsal && errors.dorsal && (
                      <StyledText style={{ color: theme.error }}>
                        {errors.dorsal}
                      </StyledText>
                    )}
                  </View>
                )}

                {mostrarInputMotivo && (
                  <View style={styles.inputGroup}>
                    <TextInput
                      placeholder='Ingresa motivo'
                      multiline
                      numberOfLines={4}
                      style={[
                        styles.input,
                        styles.textArea,
                        {
                          color: theme.textPrimary,
                          borderColor: theme.border,
                          backgroundColor: theme.input.background,
                        },
                      ]}
                      placeholderTextColor={theme.textSecondary}
                      value={values.motivo}
                      onChangeText={handleChange('motivo')}
                      onBlur={handleBlur('motivo')}
                    />
                    {touched.motivo && errors.motivo && (
                      <StyledText style={{ color: theme.error }}>
                        {errors.motivo}
                      </StyledText>
                    )}
                  </View>
                )}

                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.error }]}
                    onPress={onClose}
                  >
                    <StyledText style={styles.buttonText}>Cancelar</StyledText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.primary }]}
                    onPress={() => handleSubmit()}
                  >
                    <StyledText style={styles.buttonText}>Confirmar</StyledText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: { width: '90%', maxWidth: 400, padding: 20, borderRadius: 12 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: { marginBottom: 16 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: '600' },
});

export default ConfirmSolicitudModal;
