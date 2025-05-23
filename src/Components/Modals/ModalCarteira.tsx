import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import CustomModal from './CustomModal';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalCarteira({ visible, onClose }: Props) {
  return (
    <CustomModal
    visible={visible}
    onClose={onClose}
    title="Carteiras">
      <View>
        <View>
            <View style={tw`p-4 my-1`}>
                <Text style={tw`text-xl font-semibold`}>Adicionar forma de pagamento</Text>
            </View>
            <View style={tw`flex-row justify-around`}>
                <TouchableOpacity style={tw`items-center justify-center border rounded-xl w-40 h-11`}>
                    <Text style={tw`text-xl`}>PayPal</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`items-center justify-center border rounded-xl w-40 h-11`}>
                    <Text style={tw`text-xl`}>Pix</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </CustomModal>
  );
}
