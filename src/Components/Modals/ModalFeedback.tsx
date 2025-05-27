import React from 'react';
import { Text, View,TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import CustomModal from './CustomModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalFeedback({ visible, onClose }: Props) {
  return (
    <CustomModal
    visible={visible}
    onClose={onClose}
    title="Feedback">
      <View style={tw`flex-row justify-around`}>
        <View>
          <TextInput
            placeholder="Escreva sua avaliação"
            keyboardType="default"
            maxLength={500}
            multiline

            style={tw`w-60 border-2 rounded-lg`}
          ></TextInput>
        </View>
        <TouchableOpacity style={tw`w-12 h-12 bg-[#6E92C0] rounded-lg items-center justify-center`}>
          <MaterialCommunityIcons name={"send"} size={40} color={"#F5F5F5"} />
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
}
