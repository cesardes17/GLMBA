import { Role } from "../types/role";
import { databaseService } from "./databaseService";

const tabla = "roles";

export const rolesService = {
  async getRolesForRegistration(): Promise<{
    data: Role[] | null;
    error: Error | null;
  }> {
    try {
      const { data, error } = await databaseService.fetchData(tabla, "*", {
        eq: {
          registro: true,
        },
      });

      if (error) {
        return { data: null, error: new Error(error) };
      }

      const validatedData = Array.isArray(data)
        ? ((data as unknown) as Role[]).map((item) => ({
            id: item.id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            registro: item.registro,
          }))
        : null;

      return { data: validatedData, error: null };
    } catch (e) {
      return { data: null, error: e as Error };
    }
  },
};
