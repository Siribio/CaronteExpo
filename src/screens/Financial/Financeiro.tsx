import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalCarteira from "../../Components/Modals/ModalCarteira";
import ModalSaque from "../../Components/Modals/ModalSaque";

type Props = NativeStackScreenProps<RootStackParamList, "Financeiro">;

let credito = "11,32";

export default function Financeiro() {

   const [carteiraVisible, setCarteiraVisible] = useState(false);
   const [saqueVisible, setSaqueVisible] = useState(false);

  return (
    <View style={tw`flex-1 `}>
      <View style={tw`flex-1 bg-white `}>
        <View style={tw`justify-start h-23 mt-2`}>
          <Text style={tw`ml-5 text-4xl font-bold text-[#313131] `}>
            Financeiro
          </Text>
        </View>

        <View style={tw`justify-center mt-2`}>
          <View style={tw`mt-[-40] `}>
            <Text style={tw`ml-5 text-xl font-medium`}>
              Crédito no aplicativo:
            </Text>
            <View
              style={tw`border rounded-lg max-w-[40] h-11 ml-5 items-center justify-center`}
            >
              <Text style={tw`flex-column text-2xl`}>R$ {credito}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity 
        onPress={() => setCarteiraVisible(true)}        
        style={tw`flex-row w-65 mt-15 flex-row items-center`}>
          <View style={tw` bg-[#676150] rounded-xl ml-5`}>
            <MaterialCommunityIcons
            name={"wallet"}
            size={80}
            color={"#F1D014"}
            />
          </View>
          <Text style={tw`ml-5 text-3xl font-semibold`}>Carteira</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => setSaqueVisible(true)}  
        style={tw`flex-row w-65 mt-5 flex-row items-center `}>
          <View style={tw` bg-[#676150] rounded-xl ml-5`}>
            <MaterialCommunityIcons
            name={"cash-multiple"}
            size={80}
            color={"#F1D014"}
            />
          </View>
          <Text style={tw`ml-5 text-3xl font-semibold`}>Saque</Text>
        </TouchableOpacity>

            <ModalCarteira
            visible={carteiraVisible}
            onClose={() => setCarteiraVisible(false)}
          />
           <ModalSaque
            visible={saqueVisible}
            onClose={() => setSaqueVisible(false)}
          />
      </View>
    </View>
  );
}
