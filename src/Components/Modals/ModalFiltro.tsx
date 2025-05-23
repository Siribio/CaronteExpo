import React from 'react';
import { Text, View,TextInput } from 'react-native';
import tw from 'twrnc';
import CustomModal from './CustomModal';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const handleSave = () => {

  // Salvar filtro
}

export default function ModalFiltro({ visible, onClose }: Props) {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title="Filtro"
      actionButtonText="Salvar Filtro"
      onActionPress={handleSave}
      >
      <View style={tw` gap-y-2`}>
        <View style={tw`items-start`}>
          <Text style={tw`text-xl font-semibold`}>Destino: </Text>
          <TextInput
              placeholder="Av. Afonso Da Silva"
              keyboardType="default"
              maxLength={99}
              style={tw`border rounded-lg w-50`}
            >
            </TextInput>
        </View>
        <View style={tw`items-start`}>
          <Text style={tw`text-xl font-semibold`}>Desvio máxima do destino: </Text>
          <TextInput
              placeholder="dustância em metros"
              keyboardType="numeric"
              maxLength={99}
              style={tw`border rounded-lg w-50`}
            >
            </TextInput>
        </View>

        <View style={tw`items-start`}>
          <Text style={tw`text-xl font-semibold`}>Partida: </Text>
          <TextInput
              placeholder="Rua do Limoeiro"
              keyboardType="default"
              maxLength={99}
              style={tw`border rounded-lg w-50`}
            >
            </TextInput>
        </View>

        <View style={tw`items-start`}>
          <Text style={tw`text-xl font-semibold`}>Desvio máxima da partida: </Text>
          <TextInput
              placeholder="dustância em metros"
              keyboardType="numeric"
              maxLength={99}
              style={tw`border rounded-lg w-50`}
            >
            </TextInput>
        </View>

        <View style={tw` items-start`}>
          <Text style={tw`text-xl font-semibold`}>Horário de chegada: </Text>
          <TextInput
              placeholder="10:00"
              keyboardType="numeric"
              maxLength={99}
              style={tw`border rounded-lg w-50 `}
            >
            </TextInput>
        </View>
      </View>
    </CustomModal>
  );
}