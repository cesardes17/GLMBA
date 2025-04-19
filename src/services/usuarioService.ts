import { Usuario } from "../types/usuario";
import { databaseService } from "./databaseService";

const tabla = "usuarios";

export const usuarioService = {
  async getUserByEmail(
    email: string
  ): Promise<{ data: Usuario | null; error: Error | null }> {
    try {
      const { data, error } = await databaseService.fetchData(tabla, "*", {
        email,
      });

      if (error) {
        return { data: null, error: new Error(error) };
      }

      if (!data || data.length === 0) {
        return { data: null, error: null };
      }

      return { data: data[0] as unknown as Usuario, error: null };
    } catch (e) {
      return { data: null, error: e as Error };
    }
  },
};
