import React from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import tw from 'twrnc';


const CardCarona = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    let destino = "Casa do limão";
    let partida = "Casa do Jonas";
    let agend = "Segunda";
    let chegada = "10:30";
    let valor = "5,40";
    let data = "3";


    return (
      <View style={tw`items-center`}>
        <View style={tw` mt-5 border-2 w-90 rounded-xl `}>
          <View style={tw`flex-row m-1 items-center `}>
            <View style={tw`border-r-2 `}>
            <View
              style={tw`m-2 border border-[green] bg-[#C6FDB5] rounded w-4 h-35`}></View>
               </View>
            <View style={tw`flex-1 `}>
              <View style={tw`flex-1 my-2 mx-1 `}>
                <Text style={tw`text-regular font-semibold `}>
                  Destino:
                  <Text style={tw`text-regular font-normal italic`}>
                    {' '}
                    {destino}
                  </Text>
                </Text>

                <Text style={tw`text-regular font-semibold `}>
                  Partida:
                  <Text style={tw`text-regular font-normal italic`}>
                    {' '}
                    {partida}
                  </Text>
                </Text>
              </View>
              <View style={tw`flex-1  mx-1 `}>
                <Text style={tw`text-regular font-semibold `}>
                  Agendamento:{' '}
                  <Text style={tw`text-regular font-normal italic`}>
                    próxima {agend}
                  </Text>
                </Text>

                <Text style={tw`text-regular font-semibold `}>
                  Chegada:
                  <Text style={tw`text-regular font-normal italic`}>
                    {' '}
                    {chegada}
                  </Text>
                </Text>
              </View>
              <View style={tw`flex-1 my-2 mx-1 `}>
                <TouchableOpacity onPress={()=> navigation.navigate('DetalhesCarona')}
                  style={tw`items-center justify-center h-8 w-25 bg-[#F1D014] border-2 border-[#676150] rounded-lg`}>
                  <Text style={tw`font-semibold text-base text-[#676150]`}>
                    {' '}
                    Detalhes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`flex `}>
              <View style={tw`flex-1 justify-center items-center mr-5 mt-2 `}>
                <Text style={tw`text-[#14AC00] text-2xl font-900 italic`}>
                  R$ {valor}
                </Text>
              </View>

              <View style={tw`flex-1 `}>
                <Text style={tw`font-normal`}>Criado há{data} dias</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );

  }

  export default CardCarona;
