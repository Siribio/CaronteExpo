import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import tw from "twrnc";
import { useAuth } from "../../context/AuthContext";
import { RootStackParamList } from "../../routes";
import ModalForgotPasswd from "../../Components/Modals/ModalForgotPasswd";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [passwdVisible, setPasswdVisible] = useState(false);
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!cpf || !password) {
      Alert.alert("Erro", "Informe cpf e senha");
      return;
    }
    setSubmitting(true);
    try {
      await signIn({ cpf, password });
      //navigation.navigate("Home");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Falha no login", "Verifique suas credenciais");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={tw`flex-1 bg-[#F5F5F5]`}
    >
      <View style={tw`flex-1 justify-center px-8`}>
        <View style={tw`items-center mb-5`}>
          <Image
            source={require("../../../assets/img/LOGO.png")}
            style={tw`w-[40] h-[40] `}
          />
        </View>

        <View style={tw`items-center`}>
          <Text style={tw`text-[#313135] font-semibold text-3xl`}>Login</Text>
        </View>

        {/* Campo CPF */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-[#313135] mb-1`}>CPF</Text>
          <TextInput
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            maxLength={11}
            value={cpf}
            onChangeText={setCpf}
            style={tw`border-2 border-[#313135] rounded-lg p-3 bg-white`}
          />
        </View>

        {/* Campo Senha */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-[#313135] mb-1`}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={tw`border-2 border-[#313135] rounded-lg p-3 bg-white`}
          />
        </View>

        {/* Botão de Login */}

        <TouchableOpacity
          onPress={handleLogin}
          style={tw`bg-[#6E92C0] border-2 border-[#313135] py-3 rounded-lg mb-4`}
        >
          <Text style={tw`text-white text-center font-bold`}>Entrar</Text>
        </TouchableOpacity>

        {/* Links inferiores */}
        <View style={tw`flex-row justify-between mt-2`}>
          <TouchableOpacity
            onPress={() => setPasswdVisible(true)}
          >
            <Text style={tw`text-[#313135] font-style: italic `}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={tw`text-[#313135] font-style: italic `}>
              Cadastrar-se
            </Text>
          </TouchableOpacity>
        </View>
        <ModalForgotPasswd
                visible={passwdVisible}
                onClose={() => setPasswdVisible(false)}
              />
      </View>
    </KeyboardAvoidingView>
  );
}
