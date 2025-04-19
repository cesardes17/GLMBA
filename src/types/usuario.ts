export type Usuario = {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  rol_id: string;
  creado_en: string;
  activo: boolean;
};

// Add this type guard function
export function isUsuario(obj: any): obj is Usuario {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.nombre === "string" &&
    typeof obj.apellidos === "string" &&
    typeof obj.email === "string" &&
    typeof obj.rol_id === "string" &&
    typeof obj.creado_en === "string" &&
    typeof obj.activo === "boolean"
  );
}
