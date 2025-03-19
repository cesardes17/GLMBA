// /src/components/MatchesList.js
import React from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import StyledText from "./StyledText";
import { useTheme } from "../hooks/useTheme";
import { Link } from "expo-router";
// Componente que renderiza una lista de partidos de baloncesto.
// Recibe una prop "matches", que es un array de objetos con la información de cada partido.
const MatchesList = ({ matches }) => {
  const { theme } = useTheme();

  // Función para renderizar cada elemento de la lista
  const renderMatch = ({ item }) => (
    <Link href={`/partido/${item.id}`} asChild>
      <Pressable>
        <View
          // Se usa un array de estilos para combinar el estilo base con las propiedades del tema
          style={[
            styles.matchContainer,
            {
              backgroundColor: theme.background,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <StyledText style={[styles.teamsText]}>
            {item.team1} vs {item.team2}
          </StyledText>
          <StyledText style={[styles.scoreText]}>
            {item.score1} - {item.score2}
          </StyledText>
          <StyledText style={[styles.dateText]}>{item.date}</StyledText>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={matches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    padding: 16,
    alignSelf: "center",
  },
  matchContainer: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1, // Agregamos borde para que se note el color definido en el tema
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 14,
    marginVertical: 4,
  },
  dateText: {
    fontSize: 12,
  },
});

export default MatchesList;
