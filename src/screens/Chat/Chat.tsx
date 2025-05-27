import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import tw from "twrnc";

interface Message {
  id: number;
  sender: "passageiro" | "motorista";
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "motorista", text: "Olá, estarei no local em 5 minutos!" },
    { id: 2, sender: "passageiro", text: "Perfeito, estou esperando na frente do mercado." },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "passageiro", // ou "motorista", dependendo de quem estiver logado
      text: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={tw.style(
        "my-1 mx-3 px-4 py-2 rounded-2xl max-w-[70%]",
        item.sender === "passageiro"
          ? "bg-blue-500 self-end"
          : "bg-gray-300 self-start"
      )}
    >
      <Text style={tw`text-white`}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-white`}
      behavior={Platform.OS === "android" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <View style={tw`flex-1 `}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={tw`pt-4 pb-2`}
        />
        <View style={tw`flex-row items-center border-t border-gray-300 px-3 py-2`}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Digite sua mensagem..."
            style={tw`flex-1 border rounded-full px-4 py-2 mr-2 bg-gray-100`}
          />
          <TouchableOpacity onPress={sendMessage} style={tw`bg-blue-500 p-3 rounded-full`}>
            <Text style={tw`text-white font-bold`}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
