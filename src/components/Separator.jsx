import React from 'react';
import { View } from 'react-native';

const Separator = ({ color = '#E0E0E0', width = '80%', height = 1, marginVertical = 10 }) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: color,
        marginVertical: marginVertical,
      }}
    />
  );
};

export default Separator;