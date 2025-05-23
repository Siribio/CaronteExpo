import React ,{useState} from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalFiltro from "../Modals/ModalFiltro";



export default function Searchbar() {

  const [filtroVisible, setFiltroVisible] = useState(false);

  return (
    <View style={tw``}>
      <View style={tw`flex-row justify-center gap-x-5 mt-2`}>
        <View>
          <TextInput
            placeholder="Pesquise seu destino"
            keyboardType="default"
            maxLength={99}
            style={tw`w-66 h-12 border-2 rounded-lg`}
          ></TextInput>
        </View>
        <TouchableOpacity style={tw`w-12 h-12 bg-[#676150] rounded-lg items-center justify-center`}>
          <MaterialCommunityIcons name={"magnify"} size={40} color={"#F1D014"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFiltroVisible(true)}
        style={tw`w-12 h-12 bg-[#676150] rounded-lg items-center justify-center`}>
          <MaterialCommunityIcons name={"filter"} size={40} color={"#F1D014"} />
        </TouchableOpacity>
      </View>

    <ModalFiltro
            visible={filtroVisible}
            onClose={() => setFiltroVisible(false)}
          />

    </View>
  );
}
