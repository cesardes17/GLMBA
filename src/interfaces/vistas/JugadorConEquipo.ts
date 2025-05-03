export interface JugadorConEquipo {
  usuario_id: string;
  nombre: string;
  apellidos: string;
  email: string;
  rol_id: number;

  altura_cm: number;
  peso_kg: number | null;
  posicion_preferida: string;
  dorsal_preferido: number;
  foto_url: string | null;
  descripcion: string | null;
  sancionado: boolean;

  equipo_id: string | null;
  equipo_nombre: string | null;
  escudo_url: string | null;
  capitan_id: string | null;

  numero_camiseta: number | null;
  fecha_inscripcion: string | null;

  temporada_id: string | null;
  temporada_nombre: string | null;

  esta_en_bolsa: boolean;
}
