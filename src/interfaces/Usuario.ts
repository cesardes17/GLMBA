export interface Usuario {
  id: string; // uuid
  nombre: string;
  apellidos: string;
  email: string;
  rol_id: number; // bigint
  creado_en: string; // timestamp (ISO string)
  activo: boolean;
}
