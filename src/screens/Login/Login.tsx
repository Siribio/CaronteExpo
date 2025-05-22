import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import tw from 'twrnc';
import {RootStackParamList} from '../../routes';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({navigation}: Props) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!cpf || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
    // Lógica de autenticação aqui
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={tw`flex-1 bg-gray-50`}>
      <View style={tw`flex-1 justify-center px-8`}>
        <View style={tw`items-center mb-5`}>
          <Image
            source={require('../../../assets/img/LOGO.png')}
            style={tw`w-[40] h-[40] `}
          />
        </View>

        <View style={tw`items-center`}>
          <Text style={tw`text-[#313131] font-semibold text-3xl`}>Login</Text>
        </View>

        {/* Campo CPF */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-[#313131] mb-1`}>CPF</Text>
          <TextInput
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            maxLength={11} 
            value={cpf}
            onChangeText={setCpf}
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
          />
        </View>

        {/* Campo Senha */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-[#313131] mb-1`}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
          />
        </View>

        {/* Botão de Login */}

        <TouchableOpacity
          onPress={handleLogin}
          style={tw`bg-[#676150] border-2 border-[#313131] py-3 rounded-lg mb-4`}>
          <Text style={tw`text-white text-center font-bold`}>Entrar</Text>
        </TouchableOpacity>

        {/* Links inferiores */}
        <View style={tw`flex-row justify-between mt-2`}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={tw`text-[#313131] font-style: italic `}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={tw`text-[#313131] font-style: italic `}>
              Cadastrar-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
