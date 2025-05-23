import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import tw from 'twrnc';

type Props = {
  visible: boolean;
  onClose: () => void;
  openSubModal: (modalName: 'Contas' | 'Fidelidade' | 'Problemas' | 'Acessibilidade' | 'Outros') => void;
};

export default function AjudaModal({ visible, onClose, openSubModal }: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 justify-center items-center bg-black/50`}>
        <View style={tw`bg-white p-6 rounded-lg w-90`}>
          <View style={tw`items-center`}>
            <Text style={tw`text-4xl font-bold mb-4`}>Ajuda</Text>
          </View>
          <Text style={tw`text-semibold text-base`}>Questões frquentes:</Text>

          {['Contas', 'Fidelidade', 'Problemas', 'Acessibilidade', 'Outros'].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => openSubModal(item as Props['openSubModal'] extends (arg: infer R) => any ? R : never)}
              style={tw`p-4 border-2 rounded my-1`}
            >
              <Text style={tw`text-lg font-semibold `}>{item}</Text>
            </TouchableOpacity>
          ))}

          <Pressable onPress={onClose} style={tw`mt-4`}>
            <View style={tw`items-end pr-4`}>
              <Text style={tw`text-center text-red-500 font-bold text-semibold text-base`}>Fechar</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
