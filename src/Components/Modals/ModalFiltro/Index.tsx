import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView,Alert } from "react-native";
import tw from "twrnc";
import CustomModal from "../CustomModal";
import { AddressAutocomplete } from "../../../screens/NewRide/components/addressSearch";
import { maskBRL, maskTime } from "../../../screens/NewRide/util/masks";
import { Picker } from "@react-native-picker/picker";

type Coords = { lat: string; lon: string };

type FiltroData = {
  local_partida_passageiro: string;
  local_destino_passageiro: string;
  horario_carona: string;
  oferta: string;
  diaSemana: number;
  coords_partida: Coords;
  coords_destino: Coords;
  desvio_partida: string;
  desvio_destino: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave?: (filtro: FiltroData) => void;
};

const DESVIOS = [
  "250 metros",
  "500 metros",
  "1 km",
  "1,5 km",
  "2 km",
  "3 km",
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
    desvio_partida: "250 metros",
    desvio_destino: "250 metros",
  });

  const handleSave = () => {
    if (
      !formData.local_partida_passageiro ||
      !formData.local_destino_passageiro
    ) {
      return Alert.alert("Preencha ao menos os campos de partida e destino.");
    }

    console.log("Filtro salvo:", formData);
    if (onSave) onSave(formData);
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
        desvio_partida: "250 metros",
        desvio_destino: "250 metros",
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

        <Text style={tw`text-gray-600 mb-1 mt-2`}>Desvio Máximo da Partida</Text>
        <View style={tw`border-2 border-[#313131] rounded-lg mb-3`}>
          <Picker
            selectedValue={formData.desvio_partida}
            onValueChange={(value) =>
              setFormData((f) => ({ ...f, desvio_partida: value }))
            }
          >
            {DESVIOS.map((d) => (
              <Picker.Item label={d} value={d} key={d} />
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

        <Text style={tw`text-gray-600 mb-1 mt-2`}>Desvio Máximo do Destino</Text>
        <View style={tw`border-2 border-[#313131] rounded-lg mb-3`}>
          <Picker
            selectedValue={formData.desvio_destino}
            onValueChange={(value) =>
              setFormData((f) => ({ ...f, desvio_destino: value }))
            }
          >
            {DESVIOS.map((d) => (
              <Picker.Item label={d} value={d} key={d} />
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
