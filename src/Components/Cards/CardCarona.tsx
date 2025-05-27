import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import tw from 'twrnc';

interface Coords {
  lat: string
  lon: string
}

interface CaronaProps {
  id: number
  status: boolean
  local_destino_passageiro: string
  local_partida_passageiro: string
  valor_oferta: number
  dias: number | null
  horario_carona: string
  id_passageiro: number
  data_criacao: string | null
  ultima_atualizacao: string | null
  id_motorista: number | null
  local_destino_motorista: string | null
  local_partida_motorista: string | null
  coords_destino: Coords
  coords_partida: Coords
}

const CardCarona: React.FC<{ carona: CaronaProps }> = ({ carona }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const destino = carona.local_destino_passageiro || 'Não informado';
  const partida = carona.local_partida_passageiro || 'Não informado';
  const agend = carona.dias !== null ? `dia ${carona.dias}` : 'semana';
  const chegada = carona.horario_carona || '--:--';
  const valor = (carona.valor_oferta/100).toFixed(2).replace('.', ',');
  const data = carona.data_criacao ? ' X' : ' 3'; // você pode ajustar a lógica conforme necessário

  return (
      <View style={tw`items-center`}>
        <View style={tw`flex-row mt-5 border-4 w-95 rounded-xl`}>
          <View style={tw`border-r-2 h-full w-6 rounded-l-lg bg-[#2BD45E]`}>

          </View>
          <View style={tw`flex-row  m-1 items-center w-85 justify-between `}>
            <View style={tw`w-52 gap-y-1 `}>
              <View style={tw`mx-1 `}>
                <Text style={tw`text-regular font-semibold `}>
                  Destino:
                  <Text style={tw`text-regular font-normal italic`}>
                    {' '}
                    {destino}
                  </Text>
                </Text>

                <Text style={tw`text-regular  font-semibold `}>
                  Partida:
                  <Text style={tw`text-regular font-normal italic`}>
                    {' '}
                    {partida}
                  </Text>
                </Text>
              </View>
              <View style={tw`  mx-1 `}>
                <Text style={tw`text-regular font-semibold `}>
                  Agendamento:{' '}
                  <Text style={tw`text-regular font-normal italic`}>
                    próxima {agend}
                  </Text>
                </Text>

                <Text style={tw`text-regular font-semibold `}>
                  Chegada:
                  <Text style={tw`text-regular font-normal italic`}>
                    {' '}
                    {chegada}
                  </Text>
                </Text>
              </View>
              <View style={tw`flex-1 w-30 `}>
                <TouchableOpacity onPress={() => navigation.navigate("DetalhesCarona", { carona })}
                  style={tw`items-center justify-center h-8 w-25 bg-[#6E92C0] border-2 border-[#313135] rounded-lg`}>
                  <Text style={tw`font-semibold text-base text-white`}>
                    {' '}
                    Detalhes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw` gap-y-4 items-center `}>
              <View style={tw` justify-center items-center `}>
                <Text style={tw`text-[#14AC00] text-2xl font-900 italic`}>
                  R$ {valor}
                </Text>
              </View>
              <View style={tw` `}>
                <Text style={tw`font-normal`}>encerrada há {data} dias</Text>
              </View>
              </View>
          </View>
        </View>

      </View>
    );
}

export default CardCarona;