import { Formik } from 'formik';
import { StyleSheet, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
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
import * as Yup from 'yup';
import { isJugador } from '@/src/interfaces/Jugador';
import { baseSolicitudService } from '@/src/service/solicitudService';
import { inscripcionService } from '@/src/service/inscripcionJugadorService';
import { v4 as uuidv4 } from 'uuid'; // si estás usando uuid
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
    id: 'baja_equipo',
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
  const [opciones, setOpciones] = useState<typeof TIPOS_SOLICITUD>([]);

  useEffect(() => {
    const getOpcionesDisponibles = async () => {
      if (!usuario || !isJugador(usuario)) {
        return [];
      }

      const tieneEquipo = await inscripcionService.userHasTeam(
        usuario.usuario_id
      );
      const esJugador = usuario.rol_id === 5;
      const esCapitan = usuario.rol_id === 4;
      console.log('tieneEquipo', tieneEquipo);
      console.log('esJugador', esJugador);
      console.log('esCapitan', esCapitan);

      if (!tieneEquipo && esJugador) {
        return [TIPOS_SOLICITUD.find((opt) => opt.id === 'crear_equipo')!];
      }

      if (tieneEquipo && esJugador) {
        return [TIPOS_SOLICITUD.find((opt) => opt.id === 'baja_equipo')!];
      }

      if (tieneEquipo && esCapitan) {
        return [TIPOS_SOLICITUD.find((opt) => opt.id === 'disolver_equipo')!];
      }

      return [];
    };

    const loadOpciones = async () => {
      const opcionesDisponibles = await getOpcionesDisponibles();
      setOpciones(opcionesDisponibles);
    };

    loadOpciones();
  }, [usuario]);

  if (!usuario || !isJugador(usuario)) {
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
      let solicitudData: Omit<Solicitud, 'fecha_creacion'> = {
        id: uuidv4(),
        estado: 'pendiente',
        tipo: values.tipo as Solicitud['tipo'],
        equipo_id: undefined,
        nombre_equipo: undefined,
        escudo_url: undefined,
        motivo: undefined,
        respuesta_admin: undefined,
        iniciada_por_id: usuario.usuario_id,
        fecha_respuesta: undefined,
        jugador_objetivo_id: undefined,
        capitan_objetivo_id: undefined,
        admin_aprobador_id: undefined,
        aprobado_jugador: undefined,
        aprobado_capitan: undefined,
        aprobado_admin: undefined,
      };

      if (values.tipo === 'crear_equipo') {
        if (!selectedImage) {
          throw new Error('Debe seleccionar un escudo para el equipo');
        }
        solicitudData = {
          ...solicitudData,
          tipo: 'crear_equipo',
          nombre_equipo: values.nombre_equipo,
          escudo_url: selectedImage,
          motivo: values.motivo,
        };
      } else if (
        values.tipo === 'disolver_equipo' ||
        values.tipo === 'baja_equipo'
      ) {
        if (!usuario.equipo_id) {
          throw new Error('No perteneces a ningún equipo actualmente');
        }
        solicitudData = {
          ...solicitudData,
          tipo: values.tipo,
          equipo_id: usuario.equipo_id,
          motivo: values.motivo,
        };
      }
      const { solicitud, error, mensaje } =
        await baseSolicitudService.crearSolicitud(solicitudData);
      if (error || !solicitud) {
        throw new Error(mensaje || 'Error al crear la solicitud');
      }

      setLoading(false);
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

  interface FormContentProps {
    setFieldValue: (field: string, value: any) => void;
    values: typeof initialValues;
  }

  const renderFormContent = ({ setFieldValue, values }: FormContentProps) => {
    switch (step) {
      case 1:
        return (
          <View style={styles.formContent}>
            <StyledText style={styles.stepTitle}>Tipo de solicitud</StyledText>
            <SelectableCardGroup
              options={opciones}
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
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

const validationSchema = Yup.object().shape({
  tipo: Yup.string()
    .required('Debe seleccionar un tipo de solicitud')
    .oneOf(
      ['crear_equipo', 'disolver_equipo', 'salir_equipo'],
      'Tipo de solicitud no válido'
    ),
  nombre_equipo: Yup.string().when('tipo', {
    is: 'crear_equipo',
    then: (schema) =>
      schema
        .required('El nombre del equipo es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(50, 'El nombre no puede exceder los 50 caracteres'),
  }),
  motivo: Yup.string()
    .optional()
    .max(500, 'El motivo no puede exceder los 500 caracteres'),
  escudo_url: Yup.string().when('tipo', {
    is: 'crear_equipo',
    then: (schema) =>
      schema.required('Debe seleccionar un escudo para el equipo'),
  }),
});
