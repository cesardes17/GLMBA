import React from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import StyledButton from '../../common/StyledButton';
import StyledText from '../../common/StyledText';

const ImagePickerInput = ({ onImageSelected, value }) => {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StyledButton
        title="Select Image"
        onPress={pickImage}
        style={styles.button}
      />

      {value && <Image source={{ uri: value }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    minWidth: Platform.OS === 'web' ? 250 : 150,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default ImagePickerInput;
