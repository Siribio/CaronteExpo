import React from 'react';
import { Text,TouchableOpacity,View } from 'react-native';
import tw from 'twrnc';
import CustomModal from './CustomModal';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalFidelidade({ visible, onClose }: Props) {
  return (
    <CustomModal visible={visible} onClose={onClose} title="Fidelidade">
      <TouchableOpacity style={tw`p-4 border-2 rounded my-1`}>
          <Text style={tw`text-lg font-semibold`}>Planos de fidelidade</Text>
        </TouchableOpacity>
    </CustomModal>
  );
}
