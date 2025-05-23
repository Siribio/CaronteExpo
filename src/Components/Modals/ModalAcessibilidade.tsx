import React from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import CustomModal from './CustomModal';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalAcessibilidade({ visible, onClose }: Props) {
  return (
    <CustomModal visible={visible} onClose={onClose} title="Acessibilidade">
      <TouchableOpacity style={tw`p-4 border-2 rounded my-1`}>
          <Text style={tw`text-base font-semibold`}>Sugerir recursos de acessibilidade</Text>
        </TouchableOpacity>
    </CustomModal>
  );
}
