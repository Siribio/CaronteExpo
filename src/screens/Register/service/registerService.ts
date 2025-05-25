import api from "../../../services/api";

type dataUser = {
    nome: string
    sobrenome: string
    cpf: string
    telefone: string
    email: string 
    emailValidation: string 
    data_nascimento: string 
    cep: string 
    tipoUsuario: string 
    tipoLimitacao: string 
    tipoVeiculo: string 
}
export async function registerUser(data: dataUser){
  const response = await api.post<any>('/usuarios', data);
  console.log(response)
  return response
}

