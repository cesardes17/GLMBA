import { setupPlayerInfo } from "../types/auth";
import { databaseService } from "./databaseService";

const tabla = "jugadores";

export const playerService = {
  async createPlayer(data: setupPlayerInfo, uuid: string) {
    try {
      const { data: dataPlayer, error: errorPlayer } =
        await databaseService.createData(tabla, {
          ...data,
          usuario_id: uuid,
        });

      if (errorPlayer) {
        throw new Error(errorPlayer);
      }
      if (!dataPlayer) {
        throw new Error("No se pudo crear el jugador");
      }

      console.log(data);
      return { data: dataPlayer, error: null };

      return { data, error: null };
    } catch (e) {
      return { data: null, error: e as Error };
    }
  },
};
