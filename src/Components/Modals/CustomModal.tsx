import React, { Children } from "react";
import {Modal, View, Text, Pressable} from "react-native";
import tw from "twrnc";

type CustomModalProps = {
    visible: boolean;
    onClose: ()=> void;
    title?: string;
    children?: React.ReactNode;

};
const CustomModal = ({visible, onClose, title, children}: CustomModalProps)=>{
    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={onClose}>
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6  rounded-xl w-90`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-4xl font-bold mb-4`}>{title}</Text>
            </View>
            <View>{children}</View>
            <Pressable onPress={onClose} style={tw`mt-4 self-end`}>
              <Text style={tw`text-blue-500 text-xl`}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
}
export default CustomModal;