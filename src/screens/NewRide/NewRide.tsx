import React, { useState,useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import tw from "twrnc";
import { RootStackParamList } from "../../routes";
import Navbar from "../../Components/Navbar";
import { Picker } from "@react-native-picker/picker";
import { AddressAutocomplete } from "./components/addressSearch";
import { maskBRL, maskTime } from "./util/masks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createCarona } from "./service/ride";

type Props = NativeStackScreenProps<RootStackParamList, "NewRide">;

export default function NewRide({ navigation, route }: Props) {

  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const storagedUser = await AsyncStorage.getItem("@App:user");
      if (storagedUser) {
        const parsed = JSON.parse(storagedUser);
        setIdUsuario(parsed.id);
      } else {
        setIdUsuario(1);
      }
    };

    fetchUser();
  }, []);

  const [formData, setFormData] = useState( {
    local_destino_passageiro: "",
    local_partida_passageiro: "",
    horario_carona: "",
    oferta: "",
    dia_semana: 1,
    coords_partida: { lat: "", lon: "" } as { lat: string; lon: string },
    coords_destino: { lat: "", lon: "" } as { lat: string; lon: string },
  });

  const initialFormData = {
  local_destino_passageiro: "",
  local_partida_passageiro: "",
  horario_carona: "",
  oferta: "",
  dia_semana: 1,
  coords_partida: { lat: "", lon: "" },
  coords_destino: { lat: "", lon: "" },
};



  const handleSubmit = async () => {
    if (!formData.local_destino_passageiro || !formData.local_partida_passageiro || !formData.horario_carona) {
      return Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
    }
    const oferta_final = formData.oferta.split("R$ ")[1].split(',')[0] + formData.oferta.split("R$ ")[1].split(',')[1]
    const data = {
      ...formData,
      valor_oferta: Number(oferta_final),
      status: 1,
      id_passageiro: idUsuario as number
    };
    const response = await createCarona(data) 
    console.log(response)
    Alert.alert("Sucesso", "Carona criada com sucesso!");
    setFormData(initialFormData);


  };

  return (
    <View style={tw`flex-1 bg-[#F5F5F5]`}>
      <View style={tw`mt-15 justify-start h-23 `}>
        <Text style={tw`ml-5 text-4xl font-bold text-[#313135] `}>
          Criar Carona
        </Text>
      </View>

      <View style={tw`flex-1 mx-5 p-1`}>
        <View style={tw``}>
          <AddressAutocomplete
            label="Partida"
            placeholder="Ex: Rua Fulano da Silva"
            value={formData.local_partida_passageiro}
            onChange={(text) =>
              setFormData((f) => ({ ...f, local_partida_passageiro: text }))
            }
            onSelect={(s) =>
              setFormData((f) => ({
                ...f,
                partida: s.display_name,
                coords_partida: { lat: s.lat, lon: s.lon },
              }))
            }
          />

          <AddressAutocomplete
            label="Destino"
            placeholder="Ex: Av. Paulista"
            value={formData.local_destino_passageiro}
            onChange={(text) =>
              setFormData((f) => ({ ...f, local_destino_passageiro: text }))
            }
            onSelect={(s) =>
              setFormData((f) => ({
                ...f,
                destino: s.display_name,
                coords_destino: { lat: s.lat, lon: s.lon },
              }))
            }
          />
        </View>
        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>
            Horário de Chegada no Destino
          </Text>
          <TextInput
            placeholder="HH:MM"
            value={formData.horario_carona}
            onChangeText={(text) =>
              setFormData({ ...formData, horario_carona: maskTime(text) })
            }
            keyboardType="numeric"
            style={tw`border-2 border-[#313131] rounded-lg p-3`}
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Dia da Semana</Text>
          <View style={tw`border-2 border-[#313131] rounded-lg`}>
            <Picker
              selectedValue={formData.dia_semana}
              onValueChange={(itemValue) =>
                setFormData({ ...formData, dia_semana: itemValue })
              }
            >
              <Picker.Item label="Segunda-feira" value={1} />
              <Picker.Item label="Terça-feira" value={2} />
              <Picker.Item label="Quarta-feira" value={3} />
              <Picker.Item label="Quinta-feira" value={4} />
              <Picker.Item label="Sexta-feira" value={5} />
              <Picker.Item label="Sábado" value={6} />
              <Picker.Item label="Domingo" value={7} />
            </Picker>
          </View>
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Oferta em R$</Text>
          <TextInput
            placeholder=""
            value={formData.oferta}
            onChangeText={(text) =>
              setFormData({ ...formData, oferta: maskBRL(text) })
            }
            keyboardType="numeric"
            style={tw`border-2 border-[#313131] rounded-lg p-3`}
          />
        </View>
      </View>
      <View style={tw`items-center`}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`bg-[#6E92C0] py-3 rounded-lg mb-6 w-80`}
        >
          <Text style={tw` text-white text-center font-bold text-lg`}>
            Criar Carona
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw``} >
        <Navbar />
      </View>
    </View>
  );
}
