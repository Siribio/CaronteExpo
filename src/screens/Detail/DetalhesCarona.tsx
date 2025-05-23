import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes";
import Navbar from "../../Components/Navbar";

type Props = NativeStackScreenProps<RootStackParamList, "DetalhesCarona">;

let data = "18/04/2025";
let valor = "10,00";
let origem = "Bairro do Limão";
let origemTempo = "10:09";
let destino = "Bairro da Liba";
let destinoTempo = "10:44";

let motorista = "Memphis Depay";
let carro = "Fiat Uno";
let placaCarro = "COR1910";


export default function DetalhesCarona() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw``}>
        <View style={tw`justify-start mt-2`}>
          <Text style={tw`mx-5 text-4xl font-bold text-[#313131] `}>
            Detalhes da Carona
          </Text>
        </View>
      </View>
      <View style={tw`flex-1 `}>
        <View style={tw` mt-8`}>
          <View style={tw`flex-row mx-5 justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`font-semibold text-base`}>Data da Carona: </Text>
              <Text style={tw`text-base`}>{data}</Text>
            </View>
            <View style={tw``}>
              <Text style={tw`text-3xl font-black italic text-[#14AC00]`}>R$ {valor}</Text>
            </View>
          </View>
        </View>
        <View style={tw`border-t border-b mx-5 h-20 justify-center mt-5 gap-y-2 `}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`font-semibold text-base`}>Origem:</Text>
            <View style={tw`flex-row`}>
            <Text style={tw`font-semibold text-base `}>{origem}: </Text>
            <Text style={tw`text-base italic`}>{origemTempo}</Text>
            </View>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`font-semibold text-base`}>Destinoo:</Text>
            <View style={tw`flex-row`}>
            <Text style={tw`font-semibold text-base `}>{destino}: </Text>
            <Text style={tw`text-base italic`}>{destinoTempo}</Text>
            </View>
          </View>
        </View>

        <View style={tw`border-b h-30 justify-center mx-5 gap-y-2`}>
          <View style={tw` flex-row `}>
            <Text style={tw`font-semibold text-base`}>Nome do motorista:</Text>
            <Text style={tw` text-base italic`}> {motorista}</Text>
          </View>
          <View style={tw`flex-row `}>
            <Text style={tw`font-semibold text-base`}>Modelo do carro:</Text>
            <Text style={tw` text-base italic`}> {carro}</Text>
          </View>
          <View style={tw`flex-row `}>
            <Text style={tw`font-semibold text-base`}>Placa do carro:</Text>
            <Text style={tw` text-base italic`}> {placaCarro}</Text>
          </View>
        </View>
          <View style={tw`mx-5 mt-5`}>
            <View style={tw` h-20 `}>
              <View style={tw`h-20 gap-y-1`}>
                <Text style={tw`font-bold text-xl`}>
                  Chat da Carona
                </Text>
              <TextInput
                placeholder="Digite sua mensagem..."
                style={tw`border-2 rounded-xl text-lg`}>
              </TextInput>
              </View>
            </View>
          </View>
          <View style={tw`flex-1 mt-5 justify-end`}>
            <View style={tw`flex-row mx-5 mt-5 h-40 justify-around`}>
            <View style={tw``}>
              <TouchableOpacity style={tw`border-4 border-[#AC0000] bg-[#F07A7A] rounded-xl p-3 w-41 `}>
                <Text style={tw`text-xl text-[#AC0000] font-semibold px-5 `}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            <View style={tw``}>
              <TouchableOpacity style={tw`border-4 border-[#0045AC] bg-[#7AB1F0] rounded-xl p-3 w-41`}>
                <Text style={tw`text-xl text-[#0045AC] font-semibold `}>Nova proposta</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
      </View>
    </View>
  );
}
