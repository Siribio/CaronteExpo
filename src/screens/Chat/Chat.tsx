import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes";
import axios from "axios";
import api from "../../services/api";

interface Message {
  id: number;
  sender: "passageiro" | "motorista";
  text: string;
  created_at: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const Chat: React.FC<Props> = ({ route }) => {
  const { chatData } = route.params; 
  const rideId = chatData.id;


  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  

  const initConversation = useCallback(async () => {
    try {
      const resp = await api.post<{
        id: number;
        ride_id: number;
        created_at: string;
      }>(`/ride/${rideId}/conversation`);
      setConversationId(resp.data.id);
    } catch (error) {
      console.error("Erro ao iniciar conversa:", error);
    }
  }, [rideId]);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;
    try {
      const resp = await api.get<{
        messages: Array<{ id: number; sender_id: number; content: string; created_at: string }>;
      }>(`/chat/${conversationId}/messages?perPage=50&page=1`);

      const msgs = resp.data.messages
        .map((m) => ({
          id: m.id,
          sender:
            m.sender_id === chatData.id_passageiro ? "passageiro" : "motorista",
          text: m.content,
          created_at: m.created_at,
        }))
        // mais novos primeiro
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

      setMessages(msgs);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    } finally {
      setLoading(false);
    }
  }, [conversationId, chatData.id_passageiro]);

  useEffect(() => {
    initConversation();
  }, [initConversation]);

  useEffect(() => {
    if (conversationId) fetchMessages();
  }, [conversationId, fetchMessages]);

  // 3. Envio de nova mensagem
  const sendMessage = async () => {
    const texto = input.trim();
    if (!texto || !conversationId) return;
    try {
      const resp = await api.post<{
        id: number;
        sender_id: number;
        content: string;
        created_at: string;
      }>(`/chat/${conversationId}/messages`, { content: texto });

      const novo: Message = {
        id: resp.data.id,
        sender: "passageiro",
        text: resp.data.content,
        created_at: resp.data.created_at,
      };
      setMessages((prev) => [novo, ...prev]);
      setInput("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
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
      <View style={tw`flex-1`}>
        {loading ? (
          <ActivityIndicator style={tw`mt-10`} />
        ) : (
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={tw`pt-4 pb-2`}
            inverted
          />
        )}

        <View style={tw`flex-row items-center border-t border-gray-300 px-3 mb-5`}>
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

