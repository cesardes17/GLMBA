export interface Solicitud {
  id: number;
  estado: string;
  tipo: 'crear_equipo' | 'disolver_equipo' | 'unirse_equipo' | 'salirse_equipo'; // Puedes extender más tipos si quieres
  nombre_equipo?: string;
  escudo_url?: string;
  equipo_id?: string;
  motivo?: string;
  respuesta_admin?: string;
  usuario_id: string;
  fecha_creacion: string;
  fecha_respuesta?: string;
}
