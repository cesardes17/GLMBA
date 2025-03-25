import React from 'react';
import { useField } from 'formik';
import ImagePickerInput from './ImagePicker';

const FormikImagePicker = ({ name }) => {
  const [field, meta, helpers] = useField(name);

  const handleImageSelected = (uri) => {
    helpers.setValue(uri);
  };

  return (
    <ImagePickerInput
      onImageSelected={handleImageSelected}
      value={field.value}
    />
  );
};

export default FormikImagePicker;
