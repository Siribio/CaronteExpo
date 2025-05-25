export async function buscarEnderecoPorCep(cep: string) {
  try {
    const cepLimpo = cep.replace(/\D/g, '')

    if (cepLimpo.length !== 8) throw new Error('CEP inválido')

    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const dados = await resposta.json()

    if (dados.erro) {
      throw new Error('CEP não encontrado')
    }

    return dados 
  } catch (erro: any) {
    throw erro.message || 'Erro ao buscar CEP'
  }
}
