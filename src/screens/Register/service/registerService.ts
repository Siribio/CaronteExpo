import api from "../../../services/api";

type dataUser = {
  nome: string;
  sobrenome: string;
  cpf: string;
  telefone: string;
  email: string;
  emailValidation: string;
  data_nascimento: string;
  cep: string;
  tipoUsuario: string;
  tipoLimitacao: string;
  tipoVeiculo: string;
};
export async function registerUser(data: dataUser) {
  try {
    const response = await api.post<any>("/usuarios", data);

    return response;
  } catch (err: any) {
    return err.status
  }
}
