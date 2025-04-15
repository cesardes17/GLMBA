import { Formik } from "formik";
import { Text, View } from "react-native";

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = (values: typeof initialValues) => {
  console.log("values: ", values);
};

export default function LoginScreen() {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, handleBlur, handleReset, values }) => {
        return (
          <View>
            <Text>RegistroScreen</Text>
          </View>
        );
      }}
    </Formik>
  );
}
