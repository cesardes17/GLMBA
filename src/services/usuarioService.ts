import { Usuario } from "../types/usuario";

export const usuarioService = {
  async getUserByEmail(
    email: string
  ): Promise<{ data: Usuario | null; error: string | null }> {
    try {
      throw new Error("No implementado todavia");
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },
};
