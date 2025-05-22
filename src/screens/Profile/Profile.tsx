import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import tw from 'twrnc';
import { RootStackParamList } from '../../routes';
import Navbar from '../../Components/Navbar';
import AjudaModal from '../../Components/Modals/AjudaModal';
import ModalContas from '../../Components/Modals/ModalContas';
import ModalFidelidade from '../../Components/Modals/ModalFidelidade';
import ModalProblemas from '../../Components/Modals/ModalProblemas';
import ModalOutros from '../../Components/Modals/ModalOutros';
import ModalAcessibilidade from '../../Components/Modals/ModalAcessibilidade';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

function Profile({ navigation }: Props) {
  const [ajudaVisible, setAjudaVisible] = useState(false);
  const [contasVisible, setContasVisible] = useState(false);
  const [fidelidadeVisible, setFidelidadeVisible] = useState(false);
  const [problemasVisible, setProblemasVisible] = useState(false);
  const [acessibilidadeVisible, setAcessibilidadeVisible] = useState(false);
  const [outrosVisible, setOutrosVisible] = useState(false);

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`mt-15 ml-5`}>
        <Text style={tw`text-4xl font-bold text-[#313131]`}>
          Nome do usuário
        </Text>
      </View>

      <View style={tw`flex-1 justify-center`}>
        <View style={tw`ml-4`}>
          <TouchableOpacity>
            <Text style={tw`py-8 text-2xl font-bold text-[#313131]`}>
              {'Gerenciar Perfil'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={tw`py-8 text-2xl font-bold text-[#313131]`}>
              {'Financeiro'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAjudaVisible(true)}>
            <Text style={tw`py-8 text-2xl font-bold text-[#313131]`}>
              {'Ajuda / Chat'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={tw`py-8 text-2xl font-bold text-[#313131]`}>
              {'Feedback Carona'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`py-8 text-2xl font-bold text-[#313131]`}>
              {'Histórico de Carona'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <AjudaModal
        visible={ajudaVisible}
        onClose={() => setAjudaVisible(false)}
        openSubModal={modal => {
          setAjudaVisible(false);
          if (modal === 'Contas') setContasVisible(true);
          if (modal === 'Fidelidade') setFidelidadeVisible(true);
          if (modal === 'Problemas') setProblemasVisible(true);
          if (modal === 'Acessibilidade') setAcessibilidadeVisible(true);
          if (modal === 'Outros') setOutrosVisible(true);
        }}
      />
      <ModalContas
        visible={contasVisible}
        onClose={() => setContasVisible(false)}
      />
      <ModalFidelidade
        visible={fidelidadeVisible}
        onClose={() => setFidelidadeVisible(false)}
      />
      <ModalProblemas
        visible={problemasVisible}
        onClose={() => setProblemasVisible(false)}
      />
      <ModalAcessibilidade
        visible={acessibilidadeVisible}
        onClose={() => setAcessibilidadeVisible(false)}
      />
      <ModalOutros
        visible={outrosVisible}
        onClose={() => setOutrosVisible(false)}
      />

      <Navbar />
    </View>
  );
}

export default Profile;
