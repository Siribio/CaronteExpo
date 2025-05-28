import { View, Text, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../../routes";
import Navbar from "../../Components/Navbar";
import AjudaModal from "../../Components/Modals/AjudaModal";
import ModalContas from "../../Components/Modals/ModalContas";
import ModalFidelidade from "../../Components/Modals/ModalFidelidade";
import ModalProblemas from "../../Components/Modals/ModalProblemas";
import ModalOutros from "../../Components/Modals/ModalOutros";
import ModalAcessibilidade from "../../Components/Modals/ModalAcessibilidade";
import { useAuth } from "../../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

function Profile({ navigation }: Props) {
  const { signOut, user } = useAuth();
  const [ajudaVisible, setAjudaVisible] = useState(false);
  const [contasVisible, setContasVisible] = useState(false);
  const [fidelidadeVisible, setFidelidadeVisible] = useState(false);
  const [problemasVisible, setProblemasVisible] = useState(false);
  const [acessibilidadeVisible, setAcessibilidadeVisible] = useState(false);
  const [outrosVisible, setOutrosVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão para acessar a galeria é necessária!");
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`mt-15 ml-5`}>
        <Text style={tw`text-4xl font-bold text-[#313131]`}>
          Perfil de usuário
        </Text>
      </View>

      <View style={tw`flex-1 justify-center gap-y-3 `}>
        <View style={tw`flex-row mx-4 gap-x-5 items-center`}>
          <TouchableOpacity onPress={pickImage} style={tw``}>
            <Image
              style={tw`w-32 h-32 rounded-full mb-4`}
              source={
                image
                  ? { uri: image }
                  : require("../../../assets/img/default-profile.jpg") // use uma imagem padrão
              }
            />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-semibold`}>{user?.name??'Usuário'}</Text>
        </View>
        <View style={tw`mx-4 `}>
          {/* <TouchableOpacity 
          onPress={() => navigation.navigate("RideHistory")}
          >
            <Text style={tw`py-8 text-2xl font-bold text-[#313131]`}>
              {"Histórico da Carona"}
            </Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity>
            <Text
              onPress={() => navigation.navigate("Financeiro")}
              style={tw`py-8 text-2xl font-bold text-[#313131]`}
            >
              {"Financeiro"}
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => setAjudaVisible(true)}>
            <Text style={tw`py-8 text-2xl font-bold text-[#313131]`}>
              {"Ajuda / Chat"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={signOut}>
            <Text style={tw`py-8 text-2xl font-bold text-[#313131]`}>
              {"Sair"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <AjudaModal
        visible={ajudaVisible}
        onClose={() => setAjudaVisible(false)}
        openSubModal={(modal) => {
          setAjudaVisible(false);
          if (modal === "Contas") setContasVisible(true);
          if (modal === "Fidelidade") setFidelidadeVisible(true);
          if (modal === "Problemas") setProblemasVisible(true);
          if (modal === "Acessibilidade") setAcessibilidadeVisible(true);
          if (modal === "Outros") setOutrosVisible(true);
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
