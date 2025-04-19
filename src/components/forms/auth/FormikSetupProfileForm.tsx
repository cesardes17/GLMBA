import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { View } from "react-native";
import StyledButton from "../../common/StyledButton";
import FormikTextInput from "../inputs/FormikTextInput";
import { setupProfileSchema } from "../../../schemas/auth";
import { useUser } from "../../../context/UserContext";
import { SelectableCardGroup } from "../../SelectableCardGroup";
import StyledText from "../../common/StyledText";
import { rolesService } from "../../../services/rolesService";
import { Option } from "../../SelectableCardGroup";
import { setupPlayerInfo, setupUserInfo } from "../../../types/auth";
import { usuarioService } from "../../../services/usuarioService";
import { router } from "expo-router";

interface FormikSetupProfileFormProps {
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export default function FormikSetupProfileForm({
  setLoading,
  setError,
}: FormikSetupProfileFormProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const { user } = useUser();
  const [roles, setRoles] = useState<Option[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data, error } = await rolesService.getRolesForRegistration();

        if (error) {
          console.error(error);
          setError(error);
          return;
        }
        if (!data) {
          console.error("No data returned");
          setError(new Error("No data returned"));
          return;
        }

        const options: Option[] = data.map((role) => ({
          id: role.id.toString(), // Convert number to string since Option.id is string
          title: role.nombre,
          description: role.descripcion || "",
        }));

        setRoles(options);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, []);

  // Update initialValues to match the database fields
  const initialValues = {
    rol_id: "",
    nombre: "",
    apellidos: "",
    posicion_preferida: "",
    altura_cm: "",
    peso_kg: "",
    descripcion: "",
    dorsal_preferido: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      console.log("Form Values:", values);
      console.log("Selected Role:", selectedRole);

      if (!user) {
        throw new Error("no hay usuario");
      }

      const { data, error } = await usuarioService.getUserByEmail(user.email);

      if (error) {
        throw error;
      }
      if (!data) {
        throw new Error("no hay datos");
      }

      const userData: setupUserInfo = {
        id: data.id,
        email: data.email,
        nombre: values.nombre,
        apellidos: values.apellidos,
        rol_id: parseInt(selectedRole),
      };
      console.log("User Data:", userData);

      let jugadorData: setupPlayerInfo | null = null;
      if (selectedRole === "5") {
        jugadorData = {
          altura_cm: parseInt(values.altura_cm),
          peso_kg: parseInt(values.peso_kg),
          posicion_preferida: values.posicion_preferida,
          dorsal_preferido: parseInt(values.dorsal_preferido),
          descripcion: values.descripcion, // Add the optional description
        };
        console.log("Player Data:", jugadorData);
      }

      const { data: userInfo, error: userError } =
        await usuarioService.createUser(userData, jugadorData);
      setLoading(true);
      setError(null);
      // TODO: Add API call here
    } catch (error) {
      console.error("Submit Error:", error);
      setError(error as Error);
    } finally {
      router.replace("/"); // Redirect to home page
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={setupProfileSchema}
    >
      {({ handleSubmit, setFieldValue }) => (
        <View style={{ paddingHorizontal: 16 }}>
          {user !== null && (
            <StyledText
              variant="primary"
              size="large"
              weight="bold"
              style={{ marginBottom: 16 }}
            >
              {}
            </StyledText>
          )}
          {step === 1 && (
            <>
              <StyledText
                variant="primary"
                size="large"
                weight="bold"
                style={{ marginBottom: 16 }}
              >
                Selecciona tu rol
              </StyledText>
              <SelectableCardGroup
                options={roles}
                selectedId={selectedRole}
                onSelect={(id) => {
                  setSelectedRole(id);
                  setFieldValue("rol_id", parseInt(id));
                }}
              />
              <StyledButton
                title="Siguiente"
                onPress={() => setStep(2)}
                disabled={!selectedRole}
              />
            </>
          )}
          {step === 2 && (
            <>
              <StyledText
                variant="primary"
                size="large"
                weight="bold"
                style={{ marginBottom: 16 }}
              >
                Información personal
              </StyledText>
              <FormikTextInput name="nombre" placeholder="Nombre" />
              <FormikTextInput name="apellidos" placeholder="Apellidos" />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 8,
                  marginTop: 16,
                }}
              >
                <StyledButton
                  title="Atrás"
                  onPress={() => setStep(1)}
                  variant="outline"
                />
                <StyledButton
                  title={selectedRole === "5" ? "Siguiente" : "Finalizar"}
                  onPress={() => {
                    if (selectedRole === "5") {
                      setStep(3);
                    } else {
                      handleSubmit();
                    }
                  }}
                />
              </View>
            </>
          )}
          {step === 3 && (
            <>
              <StyledText
                variant="primary"
                size="large"
                weight="bold"
                style={{ marginBottom: 16 }}
              >
                Información del jugador
              </StyledText>
              <FormikTextInput
                name="posicion_preferida"
                placeholder="Posición preferida"
              />
              <FormikTextInput
                name="altura_cm"
                placeholder="Altura (cm)"
                keyboardType="numeric"
              />
              <FormikTextInput
                name="peso_kg"
                placeholder="Peso (kg)"
                keyboardType="numeric"
              />
              <FormikTextInput
                name="dorsal_preferido"
                placeholder="Dorsal preferido"
                keyboardType="numeric"
              />
              <FormikTextInput
                name="descripcion"
                placeholder="Descripción (opcional)"
                multiline
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 8,
                  marginTop: 16,
                }}
              >
                <StyledButton
                  title="Atrás"
                  onPress={() => setStep(2)}
                  variant="outline"
                />
                <StyledButton title="Finalizar" onPress={handleSubmit} />
              </View>
            </>
          )}
        </View>
      )}
    </Formik>
  );
}
