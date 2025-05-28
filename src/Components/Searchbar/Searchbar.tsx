import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalFiltro from "../Modals/ModalFiltro/Index";

type Props = {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSave: (form: any) => void;
};

export default function Searchbar({ visible, onOpen, onClose, onSave }: Props) {
  const [filtroVisible, setFiltroVisible] = useState(false);

  const handleSave = (formData: any) => {
    console.log("Filtro aplicado:", formData);
    setFiltroVisible(false);
  };
  return (
    <View style={tw`mx-5`}>
      <View style={tw`flex-row justify-center gap-x-2 mt-2`}>
        <View>
          <TextInput
            placeholder="Pesquise seu destino"
            keyboardType="default"
            maxLength={99}
            style={tw`w-66 h-12 border-2 rounded-lg`}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={tw`w-12 h-12 bg-[#676150] rounded-lg items-center justify-center`}
        >
          <MaterialCommunityIcons
            name={"magnify"}
            size={40}
            color={"#F1D014"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onOpen}
          style={tw`w-12 h-12 bg-[#676150] rounded-lg items-center justify-center`}
        >
          <MaterialCommunityIcons name={"filter"} size={40} color={"#F1D014"} />
        </TouchableOpacity>
      </View>

      <ModalFiltro
        visible={visible}                           
        onClose={onClose}
        onSave={onSave}
      />
    </View>
  );
}
