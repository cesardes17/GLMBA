// components/CustomSelect.js
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Text } from "react-native";
const CustomSelect = ({
  data, // Array de objetos { key, value }
  selectedKey, // Valor actualmente seleccionado (la key)
  onChange, // Callback para actualizar la selección
  style, // Estilos adicionales para el contenedor (móvil)
  selectStyle, // Estilos adicionales para el <select> (web)
}) => {
  if (Platform.OS === "web") {
    // En la web usamos el select nativo de HTML, aplanando los estilos
    const flattenedStyle = StyleSheet.flatten([styles.select, selectStyle]);
    return (
      <select
        value={selectedKey}
        onChange={(event) => onChange(event.target.value)}
        style={flattenedStyle}
      >
        {data.map((item) => (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        ))}
      </select>
    );
  }

  // En dispositivos móviles, usamos @react-native-picker/picker
  console.log("Estas en movil");
  console.log(data);
  return <Text>Estas en movil</Text>;
};

const styles = StyleSheet.create({
  select: {
    padding: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default CustomSelect;
