import React from "react";
import {
  View,
  Text,
  ScrollView
} from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes";
import CardHistory from "../../Components/Cards/CardHistor";

type Props = NativeStackScreenProps<RootStackParamList, "RideHistory">;

export default function RideHistory() {

  return (
    <View style={tw`flex-1  `}>
      <View style={tw`flex-1 bg-white `}>
        <View style={tw`mt-2 mx-5`}>
          <Text style={tw`text-4xl font-bold text-[#313131]`}>
            Histórico de Carona
          </Text>
        </View>

            <View style={tw`justify-center mt-2 mx-5`}>
                <Text style={tw`text-lg font-bold`}>
                    Caronas anteriores
                </Text>

        </View>
            <ScrollView style={tw`mb-5`}>
            <CardHistory />
            <CardHistory />
            <CardHistory />
            <CardHistory />
            <CardHistory />
        </ScrollView>
      </View>
    </View>
  );
}
