export const ROLES = {
  ORGANIZADOR: {
    id: 1,
    nombre: 'Organizador',
    descripcion: 'Usuario que organiza eventos',
    disponibleEnRegistro: false,
    permisos: {
      puedeSerBaneado: false,
      puedeCambiarRol: false,
      puedeSancionar: false,
    },
  },
  COORGANIZADOR: {
    id: 2,
    nombre: 'Coorganizador',
    descripcion: 'Usuario que ayuda en la organización',
    disponibleEnRegistro: false,
    permisos: {
      puedeSerBaneado: true,
      puedeCambiarRol: true,
      puedeSancionar: false,
    },
  },
  ARBITRO: {
    id: 3,
    nombre: 'Árbitro',
    descripcion: 'Usuario que arbitra partidos',
    disponibleEnRegistro: false,
    permisos: {
      puedeSerBaneado: true,
      puedeCambiarRol: true,
      puedeSancionar: false,
    },
  },
  CAPITAN: {
    id: 4,
    nombre: 'Capitán',
    descripcion: 'Jugador líder del equipo',
    disponibleEnRegistro: false,
    permisos: {
      puedeSerBaneado: true,
      puedeCambiarRol: false,
      puedeSancionar: true,
    },
  },
  JUGADOR: {
    id: 5,
    nombre: 'Jugador',
    descripcion: 'Usuario que participa en partidos',
    disponibleEnRegistro: true,
    permisos: {
      puedeSerBaneado: true,
      puedeCambiarRol: false,
      puedeSancionar: true,
    },
  },
  ESPECTADOR: {
    id: 6,
    nombre: 'Espectador',
    descripcion: 'Usuario que observa partidos',
    disponibleEnRegistro: true,
    permisos: {
      puedeSerBaneado: true,
      puedeCambiarRol: true,
      puedeSancionar: false,
    },
  },
} as const;

export type RolKey = keyof typeof ROLES;
export type Rol = (typeof ROLES)[RolKey];

// Filtrar roles disponibles en el registro
export const ROLES_DISPONIBLES_EN_REGISTRO = Object.values(ROLES).filter(
  (rol) => rol.disponibleEnRegistro
);

// Obtener array de roles con id y nombre
export const getRolesArray = () =>
  Object.values(ROLES).map((rol) => ({
    id: rol.id,
    nombre: rol.nombre,
  }));
