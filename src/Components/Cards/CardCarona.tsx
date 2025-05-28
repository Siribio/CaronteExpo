import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import tw from 'twrnc';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

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

const CardCarona: React.FC<{ carona: CaronaProps }> = ({ carona }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [tipoUsuario, setTipoUsuario] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

   useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("@App:user");
      if (userData) {
        const parsed = JSON.parse(userData);
        setTipoUsuario(parsed.tipo_usuario);
        setUserId(parsed.id);
      }
    };
    fetchUser();
  }, []);

  const handleAceitar = async () => {
    try {
      await api.post("/carona/aceitar", {
        id_carona: carona.id,
        id_motorista: userId,
      });
      Alert.alert("Carona aceita com sucesso!");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro ao aceitar carona.");
    }
  };

  const destino = carona.local_destino_passageiro || "Não informado";
  const partida = carona.local_partida_passageiro || "Não informado";
  const agend = carona.dias !== null ? `dia ${carona.dias}` : "semana";
  const chegada = carona.horario_carona || "--:--";
  const valor = (carona.valor_oferta / 100).toFixed(2).replace(".", ",");
  const data = carona.data_criacao ? " X" : " 3"; // você pode ajustar a lógica conforme necessário

  return (
    <View style={tw` items-center `}>
      <View style={tw`flex-row mt-5 bg-white border w-95 rounded-xl shadow-md`}>
        <View style={tw` h-full w-3 rounded-l-[2.7] bg-[#2BD45E] `}></View>
        <View style={tw`flex-row  m-1 items-center w-85 justify-between `}>
          <View style={tw`w-52 gap-y-1 `}>
            <View style={tw`mx-1 `}>
              <Text style={tw`text-regular font-semibold `}>
                Destino:
                <Text style={tw`text-regular font-normal italic`}>
                  {" "}
                  {destino}
                </Text>
              </Text>

              <Text style={tw`text-regular  font-semibold `}>
                Partida:
                <Text style={tw`text-regular font-normal italic`}>
                  {" "}
                  {partida}
                </Text>
              </Text>
            </View>
            <View style={tw`  mx-1 `}>
              <Text style={tw`text-regular font-semibold `}>
                Agendamento:{" "}
                <Text style={tw`text-regular font-normal italic`}>
                  próxima {agend}
                </Text>
              </Text>

              <Text style={tw`text-regular font-semibold `}>
                Chegada:
                <Text style={tw`text-regular font-normal italic`}>
                  {" "}
                  {chegada}
                </Text>
              </Text>
            </View>
            <View style={tw`flex-row gap-x-2 w-30 mb-1`}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetalhesCarona", { carona })
                }
                style={tw`items-center justify-center p-2 mt-2 w-25 bg-[#6E92C0] rounded-lg`}
              >
                <Text style={tw`font-semibold text-base text-white`}>
                  {" "}
                  Detalhes
                </Text>
              </TouchableOpacity>
              {tipoUsuario === 2 && carona.id_motorista === null && (
                <TouchableOpacity
                  onPress={handleAceitar}
                  style={tw`items-center justify-center p-2 mt-2 w-25 bg-[#F07A7A] rounded-lg`}>
                  <Text style={tw`font-semibold text-base text-white`}>Aceitar</Text>
                </TouchableOpacity>
              )}
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
};

export default CardCarona;
