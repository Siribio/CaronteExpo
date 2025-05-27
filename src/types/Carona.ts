export interface Coords {
  lat: string;
  lon: string;
}

export interface CaronaProps {
  id: number;
  status: boolean;
  local_destino_passageiro: string;
  local_partida_passageiro: string;
  valor_oferta: number;
  dias: number | null;
  horario_carona: string;
  id_passageiro: number;
  data_criacao: string | null;
  ultima_atualizacao: string | null;
  id_motorista: number | null;
  local_destino_motorista: string | null;
  local_partida_motorista: string | null;
  coords_destino: Coords;
  coords_partida: Coords;
}
