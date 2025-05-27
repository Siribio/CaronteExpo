import React ,{useState} from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalFiltro from "../Modals/ModalFiltro/Index";



export default function Searchbar() {

  const [filtroVisible, setFiltroVisible] = useState(false);

  return (
    <View style={tw`mx-5`}>
      <View style={tw`flex-row justify-center gap-x-2 mt-2`}>
        <View>
          <TextInput
            placeholder="Pesquise seu destino"
            keyboardType="default"
            maxLength={99}
            style={tw`w-66 h-12 border-2 rounded-lg border-[#313135]`}
          ></TextInput>
        </View>
        <TouchableOpacity style={tw`w-12 h-12 bg-[#313135] rounded-lg items-center justify-center`}>
          <MaterialCommunityIcons name={"magnify"} size={40} color={"#6E92C0"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFiltroVisible(true)}
        style={tw`w-12 h-12 bg-[#313135] rounded-lg items-center justify-center`}>
          <MaterialCommunityIcons name={"filter"} size={40} color={"#6E92C0"} />
        </TouchableOpacity>
      </View>

    <ModalFiltro
            visible={filtroVisible}
            onClose={() => setFiltroVisible(false)}
          />

    </View>
  );
}
