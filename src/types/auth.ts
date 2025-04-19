export type authCredentials = {
  email: string;
  password: string;
};

export type setupUserInfo = {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  rol_id: number;
  //creado_en: date; // al insertar en la bbdd es now() por defecto
  // activo: boolean; //al insertar en la bbdd es true por defecto
};
export type setupPlayerInfo = {
  altura_cm: number;
  peso_kg: number;
  posicion_preferida: string;
  dorsal_preferido: number;
  // foto_url: string; //no se pueden añadir fotos todavia
  descripcion?: string;
  // sancionado: boolean; //al insertar en la bbdd es false por defecto
};

export type AuthResponse = {
  data: any | null;
  error: string | null;
};
