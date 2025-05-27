import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { RootStackParamList } from "../../routes";
import { registerUser } from "./service/registerService";
import { obterCoordenadasPorCep } from "./util/getCep";
import {
  formatCEP,
  formatCPF,
  formatDate,
  formatarDataParaISO,
  formatPhone,
} from "./util/masks";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation }: Props) {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    email: "",
    emailValidation: "",
    data_nascimento: "",
    cep: "",
    tipoUsuario: "Passageiro",
    tipoLimitacao: "",
    tipoVeiculo: "",
    senha: "",
    confirmar_senha: "",
  });

  const handleRegister = async () => {
    if (formData.senha !== formData.confirmar_senha) {
      return Alert.alert("Erro", "As senhas não são identicas tente novamente");
    }
    const data = {
      ...formData,
      nome: `${formData.nome} ${formData.sobrenome}`,
      score: 5,
      status: true,
      tipo_usuario: formData.tipoUsuario === "Passageiro" ? 1 : 2,
      especificacoes_acessorio: formData.tipoLimitacao,
      cpf: formData.cpf.replace(/\D/g, ""),
      cep: formData.cep.replace(/\D/g, ""),
      telefone: formData.telefone.replace(/\D/g, ""),
      data_nascimento: formatarDataParaISO(formData.data_nascimento),
    };

      const endereco = await obterCoordenadasPorCep(formData.cep);
    console.log(data);
      console.log(endereco)
    try {
      
      if (!formData.cpf || !formData.email || !formData.data_nascimento) {
        Alert.alert("Erro", "Preencha os campos obrigatórios");
        return;
      }

      const response = await registerUser(data);
      console.log(response)
      if(response === 409){
        Alert.alert("Erro", "O CPF já se encontra cadastrado")
        return;
      }

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (err) {}
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50 p-4 mb-5`}>
      <Text style={tw`text-2xl font-bold mb-6 text-center text-[#676150]`}>
        Cadastro
      </Text>

      {/* Seção de Dados Pessoais */}
      <View style={tw`mb-6 bg-white p-4 rounded-lg shadow-sm`}>
        <Text style={tw`text-lg font-semibold mb-3 text-gray-600`}>
          Dados Pessoais
        </Text>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Nome</Text>
          <TextInput
            placeholder="Cris"
            value={formData.nome}
            onChangeText={(text) => setFormData({ ...formData, nome: text })}
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            keyboardType="default"
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Sobrenome</Text>
          <TextInput
            placeholder="Da Silva"
            value={formData.sobrenome}
            onChangeText={(text) =>
              setFormData({ ...formData, sobrenome: text })
            }
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            keyboardType="default"
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>CPF</Text>
          <TextInput
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChangeText={(text) =>
              setFormData({ ...formData, cpf: formatCPF(text) })
            }
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            keyboardType="numeric"
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Senha</Text>
          <TextInput
            value={formData.senha}
            onChangeText={(text) => setFormData({ ...formData, senha: text })}
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            secureTextEntry={true}
            textContentType="newPassword"
            keyboardType="default"
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Confirmar Senha</Text>
          <TextInput
            value={formData.confirmar_senha}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmar_senha: text })
            }
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            secureTextEntry={true}
            textContentType="password"
            keyboardType="default"
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Telefone</Text>
          <TextInput
            placeholder="11987654321"
            value={formData.telefone}
            onChangeText={(text) =>
              setFormData({ ...formData, telefone: formatPhone(text) })
            }
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            keyboardType="email-address"
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>E-mail</Text>
          <TextInput
            placeholder="seu@email.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            keyboardType="email-address"
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Confirme seu E-mail</Text>
          <TextInput
            placeholder="digite seu email novamente"
            value={formData.email}
            onChangeText={(text) =>
              setFormData({ ...formData, emailValidation: text })
            }
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            keyboardType="email-address"
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>Data de Nascimento</Text>
          <TextInput
            placeholder="DD/MM/AAAA"
            value={formData.data_nascimento}
            onChangeText={(text) =>
              setFormData({ ...formData, data_nascimento: formatDate(text) })
            }
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            textContentType="birthdate"
            keyboardType="numeric"
          />
        </View>

        <View style={tw`mb-3`}>
          <Text style={tw`text-gray-600 mb-1`}>CEP</Text>
          <TextInput
            placeholder="00000-000"
            value={formData.cep}
            onChangeText={(text) =>
              setFormData({ ...formData, cep: formatCEP(text) })
            }
            style={tw`border-2 border-[#313131] rounded-lg p-3 bg-white`}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Seção de Tipo de Usuário */}
      <View style={tw`mb-6 bg-white p-4 rounded-lg shadow-sm`}>
        <Text style={tw`text-lg font-semibold mb-3 text-gray-700`}>
          Tipo de Usuário
        </Text>

        <View style={tw`border-2 border-[#313131] rounded-lg mb-3`}>
          <Picker
            selectedValue={formData.tipoUsuario}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, tipoUsuario: itemValue })
            }
          >
            <Picker.Item label="Motorista" value="Motorista" />
            <Picker.Item label="Passageiro" value="Passageiro" />
          </Picker>
        </View>

        {formData.tipoUsuario === "Passageiro" && (
          <View style={tw`mt-3`}>
            <Text style={tw`text-gray-600 mb-1`}>Tipo de Limitação</Text>
            <View style={tw`border-2 border-[#313131] rounded-lg mb-3`}>
              <Picker
                selectedValue={formData.tipoLimitacao}
                onValueChange={(itemValue) =>
                  setFormData({ ...formData, tipoLimitacao: itemValue })
                }
              >
                <Picker.Item
                  label="Cadeira de rodas manual"
                  value="Cadeira manual"
                />
                <Picker.Item
                  label="Cadeira de rodas elétrica"
                  value="Cadeira eletrica"
                />
                <Picker.Item label="Muletas" value="Muletas" />
                <Picker.Item
                  label="Muletas de antebraço (Caneleiras)"
                  value="Caneleiras"
                />
                <Picker.Item
                  label="Andador sem rodas"
                  value="Andador sem rodas"
                />
                <Picker.Item
                  label="Andador com rodas"
                  value="Andador com rodas"
                />
                <Picker.Item label="Bengala" value="Bengala" />
                <Picker.Item
                  label="scooter motorizada"
                  value="scooter motorizada"
                />
              </Picker>
            </View>
          </View>
        )}

        {formData.tipoUsuario === "Motorista" && (
          <View style={tw`mt-3`}>
            <Text style={tw`text-gray-600 mb-1`}>Tipo de Veiculo</Text>
            <View style={tw`border-2 border-[#313131] rounded-lg mb-3`}>
              <Picker
                selectedValue={formData.tipoVeiculo}
                onValueChange={(itemValue) =>
                  setFormData({ ...formData, tipoVeiculo: itemValue })
                }
              >
                <Picker.Item label="Hatch" value="Hatch" />
                <Picker.Item label="Sedan" value="Sedan" />
                <Picker.Item label="SUV" value="SUV" />
              </Picker>
            </View>
          </View>
        )}
      </View>

      {/* Botão de Cadastro */}
      <TouchableOpacity
        onPress={handleRegister}
        style={tw`bg-[#676150] py-3 rounded-lg mb-6`}
      >
        <Text style={tw`text-white text-center font-bold`}>
          Finalizar Cadastro
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
