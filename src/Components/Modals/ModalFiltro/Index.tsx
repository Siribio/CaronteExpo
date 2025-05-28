import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, Alert, KeyboardAvoidingView,Platform} from "react-native";
import tw from "twrnc";
import CustomModal from "../CustomModal";
import { AddressAutocomplete } from "../../../screens/NewRide/components/addressSearch";
import { maskBRL, maskTime } from "../../../screens/NewRide/util/masks";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../services/api";

type Coords = { lat: string; lon: string };

type FiltroData = {
  local_partida_passageiro: string;
  local_destino_passageiro: string;
  horario_carona: string;
  oferta: string;
  dia_semana: number;
  coords_partida: Coords;
  coords_destino: Coords;
  desvio_partida_m: string;
  desvio_destino_m: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave?: (filtro: FiltroData) => void;
};

const DESVIOS = [
  { label: "250 metros", value: 750 },
  { label: "500 metros", value: 1250 },
  { label: "1 km", value: 2000 },
  { label: "1,5 km", value: 2500 },
  { label: "2 km", value: 3000 },
  { label: "3 km", value: 4500 },
];

export default function ModalFiltro({ visible, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<FiltroData>({
    local_destino_passageiro: "",
    local_partida_passageiro: "",
    horario_carona: "",
    oferta: "",
    dia_semana: 1,
    coords_partida: { lat: "", lon: "" },
    coords_destino: { lat: "", lon: "" },
    desvio_partida_m: "250",
    desvio_destino_m: "250",
  });

  const handleSave = () => {
    if (
      !formData.local_partida_passageiro ||
      !formData.local_destino_passageiro
    ) {
      return Alert.alert(
        "Erro",
        "Preencha ao menos os campos de partida e destino."
      );
    }

    onSave(formData || {}); 
    onClose(); 
  };

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title="Filtro"
      actionButtonText="Salvar Filtro"
      onActionPress={handleSave}
    >
      <View style={tw``}>
        <AddressAutocomplete
          label="Partida"
          placeholder="Ex: Rua Alvaro da Fonseca"
          value={formData.local_partida_passageiro}
          onChange={(text) =>
            setFormData((f) => ({ ...f, local_partida_passageiro: text }))
          }
          onSelect={(s) =>
            setFormData((f) => ({
              ...f,
              local_partida_passageiro: s.display_name,
              coords_partida: { lat: s.lat, lon: s.lon },
            }))
          }
        />

        <Text style={tw`text-gray-600 mb-1 `}>
          Desvio Máximo da Partida
        </Text>
        <View style={tw`border-2 border-[#313131] rounded-lg mb-2 h-12 justify-center`}>
          <Picker
            selectedValue={formData.desvio_partida_m}
            onValueChange={(value) =>
              setFormData((f) => ({ ...f, desvio_partida_m: value }))
            }
          >
            {DESVIOS.map((d) => (
              <Picker.Item label={d.label} value={d.value} key={d.value} />
            ))}
          </Picker>
        </View>

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
              local_destino_passageiro: s.display_name,
              coords_destino: { lat: s.lat, lon: s.lon },
            }))
          }
        />

        <Text style={tw`text-gray-600 mb-1 `}>
          Desvio Máximo do Destino
        </Text>
        <View style={tw`border-2 border-[#313131] rounded-lg mb-2 h-12 justify-center`}>
          <Picker
            selectedValue={formData.desvio_destino_m}
            onValueChange={(value) =>
              setFormData((f) => ({ ...f, desvio_destino_m: value }))
            }
          >
            {DESVIOS.map((d) => (
              <Picker.Item label={d.label} value={d.value} key={d.value} />
            ))}
          </Picker>
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Horário de Chegada</Text>
          <TextInput
            placeholder="HH:MM"
            value={formData.horario_carona}
            onChangeText={(text) =>
              setFormData((f) => ({ ...f, horario_carona: maskTime(text) }))
            }
            keyboardType="numeric"
            style={tw`border-2 border-[#313131] rounded-lg p-3`}
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Oferta Máxima em R$</Text>
          <TextInput
            placeholder="Ex: R$ 10,00"
            value={formData.oferta}
            onChangeText={(text) =>
              setFormData((f) => ({ ...f, oferta: maskBRL(text) }))
            }
            keyboardType="numeric"
            style={tw`border-2 border-[#313131] rounded-lg p-3`}
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Dia da Semana</Text>
          <View style={tw`border-2 border-[#313131] rounded-lg  h-12 justify-center`}>
            <Picker
              selectedValue={formData.dia_semana}
              onValueChange={(itemValue) =>
                setFormData((f) => ({ ...f, dia_semana: itemValue }))
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

      </View>
    </CustomModal>
  );
}
