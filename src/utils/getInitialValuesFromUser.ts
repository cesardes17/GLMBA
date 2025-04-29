// src/utils/getInitialValuesFromUser.ts

import { isJugador } from '../interfaces/Jugador';

export function getInitialValuesFromUser(usuario: any) {
  let jugadorData = {
    posicion_preferida: '',
    altura_cm: '',
    peso_kg: '',
    descripcion: '',
    dorsal_preferido: '',
    imagen_perfil: '',
  };

  if (isJugador(usuario)) {
    const jugador = usuario;
    jugadorData = {
      posicion_preferida: jugador.posicion_preferida,
      altura_cm: jugador.altura_cm.toString(),
      peso_kg: jugador.peso_kg.toString(),
      descripcion: jugador.descripcion,
      dorsal_preferido: jugador.dorsal_preferido.toString(),
      imagen_perfil: jugador.foto_name,
    };
  }

  return {
    rol_id: usuario.rol_id.toString(),
    nombre: usuario.nombre || '',
    apellidos: usuario.apellidos || '',
    ...jugadorData,
  };
}
