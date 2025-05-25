import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import tw from 'twrnc';
import {RootStackParamList} from '../../routes';
import Navbar from '../../Components/Navbar';
import { Picker } from "@react-native-picker/picker";

type Props = NativeStackScreenProps<RootStackParamList, 'NewRide'>;

export default function NewRide({navigation}: Props) {
  const [formData, setFormData] = useState({
    destino: "",
    distanciaDestino: "",
    partida: "",
    distanciaPartida: "",
    horarioChegada: "",
    diaSemana: "Segunda-feira",
  });

  const handleSubmit = () =>{
    if (
      !formData.destino ||
      !formData.distanciaDestino ||
      !formData.partida ||
      !formData.distanciaPartida ||
      !formData.horarioChegada
    ){
      return Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
    }
        Alert.alert("Sucesso", "Carona criada com sucesso!");

  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`mt-15 justify-start h-23`}>
        <Text style={tw`ml-5 text-4xl font-bold text-[#313131] `}>
          Criar Carona
        </Text>
      </View>

      <ScrollView style={tw` mx-4 p-1`}>
        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Destino</Text>
          <TextInput
            placeholder="Ex: Av. Paulista"
            value={formData.destino}
            onChangeText={(text) => setFormData({ ...formData, destino: text })}
            style={tw`border-2 border-[#313131] rounded-lg p-3`}
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Distância Máxima do Destino (km)</Text>
          <TextInput
            placeholder="Ex: 5"
            value={formData.distanciaDestino}
            onChangeText={(text) =>
              setFormData({ ...formData, distanciaDestino: text })
            }
            keyboardType="numeric"
            style={tw`border-2 border-[#313131] rounded-lg p-3`}
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Partida</Text>
          <TextInput
            placeholder="Ex: Terminal Lapa"
            value={formData.partida}
            onChangeText={(text) => setFormData({ ...formData, partida: text })}
            style={tw`border-2 border-[#313131] rounded-lg p-3`}
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Distância Máxima da Partida (km)</Text>
          <TextInput
            placeholder="Ex: 3"
            value={formData.distanciaPartida}
            onChangeText={(text) =>
              setFormData({ ...formData, distanciaPartida: text })
            }
            keyboardType="numeric"
            style={tw`border-2 border-[#313131] rounded-lg p-3`}
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Horário de Chegada no Destino</Text>
          <TextInput
            placeholder="HH:MM"
            value={formData.horarioChegada}
            onChangeText={(text) =>
              setFormData({ ...formData, horarioChegada: text })
            }
            keyboardType="numeric"
            style={tw`border-2 border-[#313131] rounded-lg p-3`}
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Dia da Semana</Text>
          <View style={tw`border-2 border-[#313131] rounded-lg`}>
            <Picker
              selectedValue={formData.diaSemana}
              onValueChange={(itemValue) =>
                setFormData({ ...formData, diaSemana: itemValue })
              }
            >
              <Picker.Item label="Segunda-feira" value="Segunda-feira" />
              <Picker.Item label="Terça-feira" value="Terça-feira" />
              <Picker.Item label="Quarta-feira" value="Quarta-feira" />
              <Picker.Item label="Quinta-feira" value="Quinta-feira" />
              <Picker.Item label="Sexta-feira" value="Sexta-feira" />
              <Picker.Item label="Sábado" value="Sábado" />
              <Picker.Item label="Domingo" value="Domingo" />
            </Picker>
          </View>
        </View>
      </ScrollView>
              <View style={tw`items-center`} >
      <TouchableOpacity
        onPress={handleSubmit}
        style={tw`bg-[#676150] py-3 rounded-lg mb-6 w-80`}
      >
        <Text style={tw` text-white text-center font-bold text-lg`}>
          Criar Carona
        </Text>
      </TouchableOpacity>
      </View>


              <View>
              <Navbar/ >
              </View>
      
      </View>
  );
}
