import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import ModalCarteira from "../../Components/Modals/ModalCarteira";
// import ModalSaque from "../../Components/Modals/ModalSaque";

type Props = NativeStackScreenProps<RootStackParamList, "Financeiro">;

let credito = "11,32";

export default function Financeiro() {
  // const [carteiraVisible, setCarteiraVisible] = useState(false);
  // const [saqueVisible, setSaqueVisible] = useState(false);

  return (
    <View style={tw`flex-1 bg-[#F5F5F5]  mt-2`}>
        <View style={tw`justify-start mx-5 `}>
          <Text style={tw`text-4xl font-bold text-[#313135] `}>
            Financeiro
          </Text>
        </View>

        <View style={tw`flex-1 mx-5 items-center mt-2`}>
          <View style={tw`gap-y-2 border-b-2`}>
            <Text style={tw` text-2xl font-medium mt-4`}>
              Valor arrecadado no aplicativo:
            </Text>
            <View
              style={tw`border-4 border-[#6E92C0] rounded-lg bg-[#6E92C0] items-center justify-center shadow-md `}>
              <Text style={tw`flex-column text-5xl text-white`}>R$ {credito}</Text>
            </View>
            <View style={tw`text-[#313135] justify-between gap-y-5 mt-5 `}>

              {/* <TouchableOpacity onPress={() => setCarteiraVisible(true)}
              style={tw`h-10 w-40 bg-black justify-center rounded-lg`}>
                <Text style={tw`text-white self-center text-xl`}> Carteira </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSaqueVisible(true)}
              style={tw`h-10 w-40 bg-[pink] justify-center rounded-lg`}>
                <Text style={tw`text-white self-center text-xl`}> Saque </Text>
              </TouchableOpacity> */}

            </View>
          </View>
        </View>
        {/* <ModalCarteira
          visible={carteiraVisible}
          onClose={() => setCarteiraVisible(false)}
        />
        <ModalSaque
          visible={saqueVisible}
          onClose={() => setSaqueVisible(false)}
        /> */}

    </View>
  );
}
