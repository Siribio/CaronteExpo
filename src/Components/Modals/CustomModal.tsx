import React from "react";
import { Modal, View, Text, Pressable, TouchableWithoutFeedback, ScrollView ,KeyboardAvoidingView, Platform} from "react-native";
import tw from "twrnc";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  actionButtonText?: string;
  onActionPress?: () => void;
};

const CustomModal = ({
  visible,
  onClose,
  title,
  children,
  actionButtonText,
  onActionPress,
}: CustomModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback /* impede que toques no fundo fechem o modal */>
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
         <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            style={tw`w-90 max-h-[90%]`} // limitar altura para caber teclado
          >
          <View style={tw`bg-white p-6 rounded-xl w-90`}>
            {title && (
              <View style={tw`items-center`}>
                <Text style={tw`text-4xl font-bold mb-4`}>{title}</Text>
              </View>
            )}

             <ScrollView
                keyboardShouldPersistTaps="handled"
              >
                {children}
              </ScrollView>

            <View style={tw`flex-row justify-end mt-4`}>
              {onActionPress && actionButtonText && (
                <Pressable
                  onPress={onActionPress}
                  style={tw`mr-3 px-4 py-2 bg-blue-500 rounded-lg border-4 border-[#0045AC]`}
                >
                  <Text style={tw`text-white font-semibold`}>
                    {actionButtonText}
                  </Text>
                </Pressable>
              )}

              <Pressable onPress={onClose} style={tw`px-4 py-2 rounded`}>
                <Text style={tw`text-red-500 text-lg font-semibold`}>
                  Fechar
                </Text>
              </Pressable>
            </View>
          </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
