import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, Alert } from "react-native";
import tw from "twrnc";
import CustomModal from "../CustomModal";
import { AddressAutocomplete } from "../../../screens/NewRide/components/addressSearch";
import { maskBRL, maskTime } from "../../../screens/NewRide/util/masks";
import { Picker } from "@react-native-picker/picker";
import api from "../../../services/api";

type Coords = { lat: string; lon: string };

type FiltroData = {
  local_partida_passageiro: string;
  local_destino_passageiro: string;
  horario_carona: string;
  oferta: string;
  diaSemana: number;
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
  { label: "250 metros", value: 250 },
  { label: "500 metros", value: 500 },
  { label: "1 km", value: 1000 },
  { label: "1,5 km", value: 1500 },
  { label: "2 km", value: 2000 },
  { label: "3 km", value: 3000 },
];

export default function ModalFiltro({ visible, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<FiltroData>({
    local_destino_passageiro: "",
    local_partida_passageiro: "",
    horario_carona: "",
    oferta: "",
    diaSemana: 1,
    coords_partida: { lat: "", lon: "" },
    coords_destino: { lat: "", lon: "" },
    desvio_partida_m: "250 metros",
    desvio_destino_m: "250 metros",
  });

  const [caronas, setCaronas] = useState<any>();

  const fetchUser = async () => {
    const response = await api.post("/searchCarona", {
      coords_partida: formData.coords_partida,
      coords_destino: formData.coords_destino,
      desvio_partida_m: Number(formData.desvio_partida_m),
      desvio_destino_m: Number(formData.desvio_destino_m),
    });
    console.log(response);
    if (response.data) {
      setCaronas(response.data);
    }
    console.log(caronas);
  };

  const handleSave = () => {
    if (
      !formData.local_partida_passageiro ||
      !formData.local_destino_passageiro
    ) {
      return Alert.alert("Preencha ao menos os campos de partida e destino.");
    }

    console.log("Filtro salvo:", formData);
    if (onSave) onSave(formData);
    fetchUser();
    onClose();
  };

  useEffect(() => {
    if (!visible) {
      setFormData({
        local_destino_passageiro: "",
        local_partida_passageiro: "",
        horario_carona: "",
        oferta: "",
        diaSemana: 1,
        coords_partida: { lat: "", lon: "" },
        coords_destino: { lat: "", lon: "" },
        desvio_partida_m: "250 metros",
        desvio_destino_m: "250 metros",
      });
    }
  }, [visible]);

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

        <Text style={tw`text-gray-600 mb-1 mt-2`}>
          Desvio Máximo da Partida
        </Text>
        <View style={tw`border-2 border-[#313131] rounded-lg mb-3`}>
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

        <Text style={tw`text-gray-600 mb-1 mt-2`}>
          Desvio Máximo do Destino
        </Text>
        <View style={tw`border-2 border-[#313131] rounded-lg mb-3`}>
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
          <Text style={tw`text-gray-600 mb-1`}>Dia da Semana</Text>
          <View style={tw`border-2 border-[#313131] rounded-lg`}>
            <Picker
              selectedValue={formData.diaSemana}
              onValueChange={(itemValue) =>
                setFormData((f) => ({ ...f, diaSemana: itemValue }))
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
      </View>
    </CustomModal>
  );
}
