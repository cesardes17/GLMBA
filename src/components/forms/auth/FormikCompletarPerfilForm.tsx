import { Formik } from 'formik';
import { Image, StyleSheet, View } from 'react-native';
import StyledButton from '../../common/StyledButton';
import ImagePicker from '../../common/ImagePicker';
import StyledText from '../../common/StyledText';
import { SelectableCardGroup } from '../../common/SelectableCardGroup';
import FormikTextInput from '../inputs/FomrikTextInput';
import { useState } from 'react';
import { ROLES_DISPONIBLES_EN_REGISTRO } from '@/src/constants/roles';
import { CompletarPerfilSchema } from '@/src/schemas/auth';
import { PosicionPreferida } from '@/src/types/enums/Posicion';
import {
  CompletarPerfilJugador,
  CompletarPerfilUsuario,
} from '@/src/types/auth';
import { useAuth } from '@/src/contexts/AuthContext';
import { usuarioService } from '@/src/service/usuarioService';
import { router } from 'expo-router';
import { useUserContext } from '@/src/contexts/UserContext';
import StyledAlert from '../../common/StyledAlert';

const POSICIONES_OPCIONES = [
  {
    id: PosicionPreferida.BASE,
    title: 'Base',
    description: 'Director del juego',
  },
  {
    id: PosicionPreferida.ESCOLTA,
    title: 'Escolta',
    description: 'Tirador exterior',
  },
  {
    id: PosicionPreferida.ALERO,
    title: 'Alero',
    description: 'Jugador versátil',
  },
  {
    id: PosicionPreferida.ALA_PIVOT,
    title: 'Ala-Pívot',
    description: 'Interior con movilidad',
  },
  {
    id: PosicionPreferida.PIVOT,
    title: 'Pívot',
    description: 'Jugador interior',
  },
];

interface FormikSetupProfileFormProps {
  setLoading: (loading: boolean) => void;
}

export default function FormikCompletarPerfilForm({
  setLoading,
}: FormikSetupProfileFormProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isError, setIsError] = useState<string>('');

  const { authUser } = useAuth();
  const { fetchUserData } = useUserContext();
  const rolesOptions = ROLES_DISPONIBLES_EN_REGISTRO.map((rol) => ({
    id: rol.id.toString(),
    title: rol.nombre,
    description: rol.descripcion,
  }));

  // Update initialValues to match the database fields
  const initialValues = {
    rol_id: '',
    nombre: '',
    apellidos: '',
    posicion_preferida: '',
    altura_cm: '',
    peso_kg: '',
    descripcion: '',
    dorsal_preferido: '',
    imagen_perfil: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const userData: CompletarPerfilUsuario = {
        id: authUser.id,
        nombre: values.nombre,
        apellidos: values.apellidos,
        email: authUser.email,
        rol_id: Number(values.rol_id),
      };
      let jugadorData: CompletarPerfilJugador | null = null;
      if (userData.rol_id === 5) {
        jugadorData = {
          altura_cm: Number(values.altura_cm),
          descripcion: values.descripcion,
          dorsal_preferido: Number(values.dorsal_preferido),
          foto_name: '',
          peso_kg: Number(values.peso_kg),
          posicion_preferida: values.posicion_preferida,
          usuario_id: authUser.id,
        };
        if (!selectedImage) throw new Error('Debe elegir una foto de perfil!');
      }
      const { error, mensaje, usuario } = await usuarioService.createUser(
        userData,
        jugadorData,
        selectedImage
      );
      if (error || !usuario) {
        throw new Error(mensaje || 'Error al completar el perfil');
      }

      console.log('usuarioDevulto', usuario);
    } catch (e) {
      setIsError((e as Error).message);
    } finally {
      await fetchUserData();
      setLoading(false);
      router.replace('/');
    }
  };

  const renderProgressIndicator = () => {
    const totalSteps = selectedRole === '5' ? 5 : 2;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressStep,
                {
                  backgroundColor: index + 1 <= step ? '#4CAF50' : '#E0E0E0',
                },
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

  const renderFormContent = ({
    setFieldValue,
  }: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
  }) => {
    switch (step) {
      case 1:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>Selecciona tu rol</StyledText>
            <SelectableCardGroup
              options={rolesOptions}
              selectedId={selectedRole}
              onSelect={(id) => {
                setSelectedRole(id);
                setFieldValue('rol_id', parseInt(id));
              }}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>
              Información personal
            </StyledText>
            <FormikTextInput name='nombre' placeholder='Nombre' />
            <FormikTextInput name='apellidos' placeholder='Apellidos' />
          </View>
        );
      case 3:
        return selectedRole === '5' ? (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>
              Información del jugador
            </StyledText>
            <FormikTextInput
              name='altura_cm'
              placeholder='Altura (cm)'
              keyboardType='numeric'
            />
            <FormikTextInput
              name='peso_kg'
              placeholder='Peso (kg)'
              keyboardType='numeric'
            />
            <FormikTextInput
              name='dorsal_preferido'
              placeholder='Dorsal preferido'
              keyboardType='numeric'
            />
            <FormikTextInput
              name='descripcion'
              placeholder='Descripción (opcional)'
              multiline
            />
          </View>
        ) : null;
      case 4:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>
              ¿Cuál es tu posición preferida?
            </StyledText>
            <SelectableCardGroup
              options={POSICIONES_OPCIONES}
              selectedId={selectedPosition}
              onSelect={(id) => {
                setSelectedPosition(id);
                setFieldValue('posicion_preferida', id as PosicionPreferida);
              }}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>
              Selecciona tu imagen de perfil
            </StyledText>
            <View style={styles.imagePickerContainer}>
              {selectedImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.imagePreview}
                    resizeMode='cover'
                  />
                  <ImagePicker
                    onImageSelected={(uri) => {
                      setSelectedImage(uri);
                      setFieldValue('imagen_perfil', uri);
                    }}
                    size='small'
                    variant='outline'
                  />
                </View>
              ) : (
                <ImagePicker
                  onImageSelected={(uri) => {
                    setSelectedImage(uri);
                    setFieldValue('imagen_perfil', uri);
                  }}
                  size='large'
                  variant='outline'
                />
              )}
              {selectedImage && (
                <StyledText style={styles.successText}>
                  Imagen seleccionada correctamente
                </StyledText>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const renderNavigationButtons = ({
    handleSubmit,
  }: {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  }) => {
    const isLastStep = step === (selectedRole === '5' ? 5 : 2);

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
          title={isLastStep ? 'Finalizar' : 'Siguiente'}
          onPress={() => {
            if (isLastStep) {
              handleSubmit();
            } else {
              setStep(step + 1);
            }
          }}
          disabled={
            (step === 1 && !selectedRole) ||
            (step === 4 && !selectedPosition) ||
            (step === 5 && !selectedImage)
          }
        />
      </View>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={CompletarPerfilSchema}
    >
      {(formikProps) => (
        <View style={styles.container}>
          {renderProgressIndicator()}
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
  },
  progressStep: {
    flex: 1,
    height: 4,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formContent: {
    flex: 1,

    marginVertical: 24,
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  successText: {
    marginTop: 8,
    color: '#4CAF50',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
    marginTop: 'auto',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    gap: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
});
