import React, { useState } from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import tw from 'twrnc';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalFeedback from "../Modals/ModalFeedback";


const CardHistory = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [feedbackVisible, setFeedbackVisible] = useState(false);

    let destino = "Casa do limão";
    let partida = "Casa do Jonas";
    let agend = "Segunda";
    let chegada = "10:30";
    let valor = "5,40";
    let data = "3";

    return (
      <View style={tw`items-center`}>
        <View style={tw`flex-row mt-5 border-4 w-90 rounded-xl`}>
          <View style={tw`border-r-2 h-full w-6 rounded-l-lg bg-[#2BD45E]`}>

          </View>
          <View style={tw`flex-row m-1 items-center w-81 gap-x-2  `}>
            <View style={tw`w-45 gap-y-1`}>
              <View style={tw`mx-1 `}>
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
              <View style={tw`  mx-1 `}>
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
              <View style={tw`flex-1 w-30 `}>
                <TouchableOpacity onPress={() => setFeedbackVisible(true)}
                  style={tw`items-center justify-center h-8 w-25 bg-[#6E92C0] border-2 border-[#313135] rounded-lg`}>
                  <Text style={tw`font-semibold text-base text-white`}>
                    {' '}
                    Feedback
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`gap-y-4 w-33 items-center `}>
              <View style={tw` justify-center items-center `}>
                <Text style={tw`text-[#14AC00] text-2xl font-900 italic`}>
                  R$ {valor}
                </Text>
              </View>
              <View style={tw` `}>
                <Text style={tw`font-normal`}>encerrada há {data} dias</Text>
              </View>
              <View style={tw`flex-row self-end`}>
                <MaterialCommunityIcons
                name={"star"}
                size={40}
                color={'#F1D014'}
                          />
                          <MaterialCommunityIcons
                name={"star"}
                size={40}
                color={'#F1D014'}
                          />
                          <MaterialCommunityIcons
                name={"star"}
                size={40}
                color={'#F1D014'}
                          />
                          <MaterialCommunityIcons
                name={"star"}
                size={40}
                color={'#F1D014'}
                          />
                          <MaterialCommunityIcons
                name={"star"}
                size={40}
                color={'#F1D014'}
                          />
              </View>
              </View>
          </View>
        </View>
        <ModalFeedback
                visible={feedbackVisible}
                onClose={() => setFeedbackVisible(false)}
              />
      </View>
    );

  }

  export default CardHistory;
