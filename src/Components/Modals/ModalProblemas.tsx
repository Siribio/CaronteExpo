import React from 'react';
import { Text,View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import CustomModal from './CustomModal';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalProblemas({ visible, onClose }: Props) {
  return (
    <CustomModal visible={visible} onClose={onClose} title="Problemas">
      <TouchableOpacity style={tw`p-4 border-2 rounded my-1`}>
        <Text style={tw`text-lg font-semibold`}>Carona anterior x</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`p-4 border-2 rounded my-1`}>
        <Text style={tw`text-lg font-semibold`}>Carona anterior y</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`p-4 border-2 rounded my-1`}>
        <Text style={tw`text-lg font-semibold`}>Carona anterior z</Text>
       </TouchableOpacity>

    </CustomModal>
  );
}
