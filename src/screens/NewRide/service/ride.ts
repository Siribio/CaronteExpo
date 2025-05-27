import api from "../../../services/api";

type Coord = {
  lat: string;
  lon: string;
};

export interface FormData {
  local_destino_passageiro: string;
  local_partida_passageiro: string;
  horario_carona: string;
  oferta: string;
  diaSemana: number;
  coords_partida: Coord;
  coords_destino: Coord;
  status: number;
  id_passageiro: number;
}

export async function createCarona(data: FormData) {
  try {
    const response = await api.post<any>("/carona", data);

    return response;
  } catch (err: any) {
    return err.status;
  }
}

export async function getCaronasPassageiro(){
  try {
    const response = await api.get<any>("/carona_passageiro");

    return response;
  } catch (err: any) {
    return err.status;
  }
}

export async function getCaronasMotorista(){
  try {
    const response = await api.get<any>("/carona_motorista");

    return response;
  } catch (err: any) {
    return err.status;
  }
}
