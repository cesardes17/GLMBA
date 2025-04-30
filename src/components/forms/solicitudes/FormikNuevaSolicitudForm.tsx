import { Formik } from 'formik';
import { StyleSheet, View, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import StyledButton from '../../common/StyledButton';
import StyledText from '../../common/StyledText';
import { SelectableCardGroup } from '../../common/SelectableCardGroup';
import FormikTextInput from '../inputs/FomrikTextInput';
import ImagePicker from '../../common/ImagePicker';
import StyledAlert from '../../common/StyledAlert';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { Solicitud } from '@/src/interfaces/Solicitudes';
import { useUserContext } from '@/src/contexts/UserContext';

/**
 * Funcionamiento:
 * Hay 4 tipos de solicitudes:
 * 1. Crear un equipo
 * 2. Disolver/Eliminar un equipo
 * 3. Unirse a un equipo
 * 4. Salir de un equipo
 *
 * Pasos para crear un equipo:
 * 1º elegir el tipo de solicitud "Crear un equipo" -> 'crear_equipo'
 * 2º Rellenar el formulario
 *  - Nombre del equipo (Obligatorio)
 *  - Motivo (Opcional)
 *  - Añadir Escudo de equipo(Obligatorio) - si es necesario se puede crear un paso adicional para añadir el escudo
 *
 * Pasos para crear un equipo:
 * 1º elegir el tipo de solicitud "Eliminar equipo" -> 'disolver_equipo'
 * 2º Rellenar el formulario:
 *  - Motivo (Opcional)
 *
 * Pasos para darse de baja de un equipo(lo inicia el jugador):
 * 1º elegir el tipo de solicitud "Salir de un equipo" -> 'salir_equipo'
 * 2º Rellenar el formulario:
 *  - Motivo (Opcional)
 *
 * Para unirse a un equipo(lo inicia el capitan desde la pagina de bolsa de jugadores):
 *
 */

const TIPOS_SOLICITUD = [
  {
    id: 'crear_equipo',
    title: 'Crear un equipo',
    description: 'Solicita la creación de un nuevo equipo',
  },
  {
    id: 'disolver_equipo',
    title: 'Disolver equipo',
    description: 'Solicita la disolución de tu equipo actual',
  },
  {
    id: 'salir_equipo',
    title: 'Salir del equipo',
    description: 'Solicita darte de baja de tu equipo actual',
  },
];

interface FormikNuevaSolicitudFormProps {
  setLoading?: (loading: boolean) => void;
}

export default function FormikNuevaSolicitudForm({
  setLoading = () => {},
}: FormikNuevaSolicitudFormProps) {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isError, setIsError] = useState<string>('');
  const { theme } = useThemeContext();
  const { usuario } = useUserContext();

  if (!usuario) {
    return null;
  }

  const initialValues = {
    tipo: '',
    nombre_equipo: '',
    motivo: '',
    escudo_url: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      if (values.tipo === 'crear_equipo') {
        if (!selectedImage) {
          throw new Error('Debe seleccionar un escudo para el equipo');
        }
      }

      console.log('Valores del formulario:', values);
      router.back();
    } catch (e) {
      setIsError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const renderProgressIndicator = (tipo: string) => {
    const totalSteps = tipo === 'crear_equipo' ? 3 : 2;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressStep,
                { backgroundColor: index + 1 <= step ? '#4CAF50' : '#E0E0E0' },
              ]}
            />
          ))}
        </View>
        <StyledText style={styles.progressText}>
          Paso {step} de {totalSteps}
        </StyledText>
      </View>
    );
  };

  const renderFormContent = ({ setFieldValue, values }: any) => {
    switch (step) {
      case 1:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>Tipo de solicitud</StyledText>
            <SelectableCardGroup
              options={TIPOS_SOLICITUD}
              selectedId={values.tipo}
              onSelect={(id) => setFieldValue('tipo', id)}
            />
          </View>
        );
      case 2:
        if (values.tipo === 'crear_equipo') {
          return (
            <View style={styles.formContent}>
              <StyledText style={styles.stepTitle}>
                Información del equipo
              </StyledText>
              <FormikTextInput
                name='nombre_equipo'
                placeholder='Nombre del equipo'
              />
              <FormikTextInput
                name='motivo'
                placeholder='Motivo (opcional)'
                multiline
              />
            </View>
          );
        } else {
          return (
            <View style={styles.formContent}>
              <StyledText style={styles.stepTitle}>
                Motivo de la solicitud
              </StyledText>
              <FormikTextInput
                name='motivo'
                placeholder='Motivo (opcional)'
                multiline
              />
            </View>
          );
        }
      case 3:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>Escudo del equipo</StyledText>
            <View style={styles.imagePickerContainer}>
              <ImagePicker
                onImageSelected={(uri) => {
                  setSelectedImage(uri);
                  setFieldValue('escudo_url', uri);
                }}
                size='large'
                variant='outline'
              />
              {selectedImage && (
                <>
                  <Image
                    source={{ uri: selectedImage }}
                    style={[styles.imagePreview, { borderColor: theme.border }]}
                    resizeMode='contain'
                  />
                  <StyledText style={styles.successText}>
                    Imagen seleccionada correctamente
                  </StyledText>
                </>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const renderNavigationButtons = ({ handleSubmit, values }: any) => {
    const isLastStep = step === (values.tipo === 'crear_equipo' ? 3 : 2);

    return (
      <View style={styles.navigationButtons}>
        {step > 1 && (
          <StyledButton
            title='Atrás'
            onPress={() => setStep(step - 1)}
            variant='outline'
          />
        )}
        <StyledButton
          title={isLastStep ? 'Enviar solicitud' : 'Siguiente'}
          onPress={() => {
            if (isLastStep) {
              if (values.tipo === 'crear_equipo' && !selectedImage) {
                setIsError('Debe seleccionar un escudo para el equipo');
                return;
              }
              handleSubmit();
            } else {
              setStep(step + 1);
            }
          }}
          disabled={step === 1 && !values.tipo}
        />
      </View>
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => (
        <View
          style={[
            styles.container,
            { backgroundColor: theme.backgroundColor, flex: 1, padding: 16 },
          ]}
        >
          {renderProgressIndicator(formikProps.values.tipo)}
          {renderFormContent(formikProps)}
          {renderNavigationButtons(formikProps)}
          {isError && (
            <StyledAlert>
              <StyledText>{isError}</StyledText>
            </StyledAlert>
          )}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
  },
  formContent: {
    flex: 1,
    gap: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
    marginTop: 24,
  },
  imagePickerContainer: {
    alignItems: 'center',
    gap: 16,
  },
  successText: {
    color: '#4CAF50',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
  },
});
