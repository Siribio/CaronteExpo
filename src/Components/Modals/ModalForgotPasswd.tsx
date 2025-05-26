import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import tw from 'twrnc';
import CustomModal from './CustomModal';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const handleSend = () => {

  // Salvar filtro
}

export default function ModalForgotPasswd({ visible, onClose }: Props) {
    const [selected, setSelected] = useState('');

  return (
    <CustomModal
    visible={visible}
    onClose={onClose}
    title="Recuperar senha"
    actionButtonText="Enviar"
    onActionPress={handleSend}
    >
       <View style={tw`p-1`}>
      <Text style={tw`mb-2 text-base`}>Selecione uma opção:</Text>
      <View style={tw`border-2 rounded-lg bg-white`}>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => setSelected(itemValue)}
        >
          <Picker.Item label="E-mail" value="1" />
          <Picker.Item label="SMS" value="2" />
        </Picker>
      </View>
    </View>

    </CustomModal>
  );
}
