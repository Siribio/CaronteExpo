type Coordenadas = {
  latitude: number
  longitude: number
}

export async function obterCoordenadasPorCep(cep: string): Promise<Coordenadas> {
  const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`)
  const endereco = await viaCepResponse.json()

  if (endereco.erro) {
    throw new Error('CEP não encontrado no ViaCEP')
  }

  const enderecoCompleto = `${endereco.logradouro}, ${endereco.localidade}`

  const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(enderecoCompleto)}&format=json&limit=1`
  console.log(nominatimUrl)
  const geoResponse = await fetch(nominatimUrl, {
    headers: {
      'User-Agent': 'SeuApp/1.0 (seuemail@exemplo.com)' 
    }
  })

  const geoData = await geoResponse.json()

  if (!geoData.length) {
    throw new Error('Endereço não localizado no Nominatim')
  }
  console.log(geoData)

  return {
    latitude: parseFloat(geoData[0].lat),
    longitude: parseFloat(geoData[0].lon)
  }
}
