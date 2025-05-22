import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import CustomModal from './CustomModal';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalContas({ visible, onClose }: Props) {
  return (
    <CustomModal
    visible={visible}
    onClose={onClose}
    title="Contas">
      <View>
        <TouchableOpacity style={tw`p-4 border-2 rounded my-1`}>
          <Text style={tw`text-lg font-semibold`}>Não consigo realizar login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`p-4 border-2 rounded my-1`}>
          <Text style={tw`text-lg font-semibold`}>Recibos e faturas</Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
}
