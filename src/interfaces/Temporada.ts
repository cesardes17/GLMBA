export interface Temporada {
  id: string;
  nombre: string;
  fecha_inicio: string; // ISO
  fecha_fin: string | null; // ISO
  estado: 'activa' | 'finalizada';
}
