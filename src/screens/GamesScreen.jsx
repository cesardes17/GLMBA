// /src/screens/GamesScreen.js
import React from "react";
import MatchesList from "../components/MatchesList";

const GamesScreen = () => {
  // Ejemplo de datos para partidos de baloncesto
  const partidos = [
    {
      id: 1,
      team1: "Equipo A",
      team2: "Equipo B",
      score1: 95,
      score2: 102,
      date: "2025-03-20",
    },
    {
      id: 2,
      team1: "Equipo C",
      team2: "Equipo D",
      score1: 110,
      score2: 105,
      date: "2025-03-21",
    },
    {
      id: 3,
      team1: "Equipo E",
      team2: "Equipo F",
      score1: 87,
      score2: 90,
      date: "2025-03-22",
    },
    {
      id: 4,
      team1: "Equipo G",
      team2: "Equipo H",
      score1: 100,
      score2: 98,
      date: "2025-03-23",
    },
    {
      id: 5,
      team1: "Equipo I",
      team2: "Equipo J",
      score1: 112,
      score2: 115,
      date: "2025-03-24",
    },
    {
      id: 6,
      team1: "Equipo K",
      team2: "Equipo L",
      score1: 105,
      score2: 99,
      date: "2025-03-25",
    },
    {
      id: 7,
      team1: "Equipo M",
      team2: "Equipo N",
      score1: 89,
      score2: 92,
      date: "2025-03-26",
    },
  ];

  return <MatchesList matches={partidos} />;
};

export default GamesScreen;
