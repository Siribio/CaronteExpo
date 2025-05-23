import React from 'react';
import { Text, View,TouchableOpacity,TextInput } from 'react-native';
import tw from 'twrnc';
import CustomModal from './CustomModal';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const handleSave = () =>{

}


export default function ModalSaque({ visible, onClose }: Props) {
  return (
    <CustomModal
    visible={visible}
    onClose={onClose}
    title="Saque"
    actionButtonText="Sacar"
    onActionPress={handleSave}>
      <View>
        <View>
            <View style={tw`p-4 my-1`}>
                <Text style={tw`text-xl font-semibold`}>Adicionar forma de pagamento</Text>
            </View>
            <View style={tw``}>
                <TextInput 
                placeholder='Digite o valor que deseja sacar'
                style={tw`items-center justify-center border rounded-xl w-70 h-11`}>
                </TextInput>
            </View>
        </View>
      </View>
    </CustomModal>
  );
}
