import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from "../../services/api";
import { useEffect } from "react";

// let data = "18/04/2025";
// let valor = "10,00";
// let origem = "Bairro do Limão";
// let origemTempo = "10:09";
// let destino = "Bairro da Liba";
// let destinoTempo = "10:44";

let motorista = "Memphis Depay";
// let carro = "Fiat Uno";
// let placaCarro = "COR1910";

interface Coords {
  lat: string;
  lon: string;
}

interface CaronaProps {
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

type Props = NativeStackScreenProps<RootStackParamList, "DetalhesCarona">;

const DetalhesCarona: React.FC<Props> = ({ route }) => {
  const { carona } = route.params;
  console.log(carona)
  const destino = carona.local_destino_passageiro || "Não informado";
  const partida = carona.local_partida_passageiro || "Não informado";
  const agend = carona.dias !== null ? `dia ${carona.dias}` : "semana";
  const chegada = carona.horario_carona || "--:--";
  const valor = (carona.valor_oferta / 100).toFixed(2).replace(".", ",");
  const data = carona.data_criacao ? " X" : " aguardando";

  const navigation = useNavigation();
  const id = carona.id || 1;
    const [chat, setChat] = useState<any>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get<any>(`/chat/${id}/messages`);
      console.log(response);
      if (response.data) {
        setChat(response.data);
      }
    };

    fetchUser();
  }, []);

  const chatData = { id: carona.id, id_passageiro: carona.id_passageiro }
  const handleChat = () => {
   navigation.navigate("Chat", {chatData}) 
  }


  return (
    <View style={tw`flex-1 bg-[#F5F5F5]`}>
      <View style={tw``}>
        <View style={tw`justify-start mt-2`}>
          <Text style={tw`mx-5 text-4xl font-bold text-[#313135] `}>
            Detalhes da Carona
          </Text>
        </View>
      </View>
      <View style={tw`flex-1 `}>
        <View style={tw` mt-8 `}>
          <View style={tw`flex-row mx-5 justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`font-semibold text-base`}>Data da Carona: </Text>
              <Text style={tw`text-base`}>{data}</Text>
            </View>
            <View style={tw``}>
              <Text style={tw`text-3xl font-black italic text-[#14AC00]`}>
                R$ {valor}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={tw`border-t border-b mx-5 h-20 justify-center mt-5 gap-y-2 `}
        >
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`font-semibold text-base`}>Origem:</Text>
            <View style={tw`flex-row`}>
              <Text style={tw`font-semibold text-base `}>{partida}</Text>
            </View>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`font-semibold text-base`}>Destino:</Text>
            <View style={tw`flex-row`}>
              <Text style={tw`font-semibold text-base `}>{destino}: </Text>
              <Text style={tw`text-base italic`}>{chegada}</Text>
            </View>
          </View>
        </View>

        <View style={tw`border-b justify-center mx-5 gap-y-2`}>
          <View style={tw` flex-row `}>
            <Text style={tw`font-semibold text-base`}>Nome do motorista:</Text>
            <Text style={tw` text-base italic`}> {motorista}</Text>
          </View>
          {/* <View style={tw`flex-row `}>
            <Text style={tw`font-semibold text-base`}>Modelo do carro:</Text>
            <Text style={tw` text-base italic`}> {carro}</Text>
          </View>
          <View style={tw`flex-row `}>
            <Text style={tw`font-semibold text-base`}>Placa do carro:</Text>
            <Text style={tw` text-base italic`}> {placaCarro}</Text>
          </View> */}
        </View>
        <View style={tw`mx-5 mt-5 items-start`}>
          
          <TouchableOpacity onPress={() => handleChat()}
          style={tw` bg-[#14AC00] border-[#14AC00] border  rounded-xl shadow-md p-3`}>
            <Text style={tw`text-lg font-semibold text-white`}>Abrir chat da carona</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-1 mt-5 justify-end`}>
          <View style={tw`flex-row mx-5 mt-5 h-40 justify-around`}>
            <View style={tw``}>
              <TouchableOpacity
                style={tw`bg-[#F07A7A] border border-[#F07A7A] shadow-md rounded-xl shadow-sm p-3 `}
              >
                <Text style={tw`text-xl text-white font-semibold px-5 `}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw``}>
              <TouchableOpacity 
                style={tw` bg-[#6E92C0] border-[#6E92C0] border rounded-xl shadow-md p-3`}
              >
                <Text style={tw`text-xl text-white font-semibold `}>
                  Nova proposta
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default DetalhesCarona;
