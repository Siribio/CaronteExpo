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
    <View style={tw`mx-5 mt-5 `}>
      <View style={tw``}>
        <TouchableOpacity
          onPress={onOpen}
          style={tw`p-2 bg-[#6E92C0] rounded-lg items-center justify-center flex-row shadow-lg`}
        >
          <Text style={tw`text-base text-[#F5F5F5] font-base pl-2`}> Filtre a carona mais proxima da sua rota </Text>
          <MaterialCommunityIcons name={"filter"} size={40} color={"#313135"} />
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