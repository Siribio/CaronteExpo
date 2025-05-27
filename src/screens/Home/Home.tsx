import { View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import tw from "twrnc";
import { RootStackParamList } from "../../routes";
import Navbar from "../../Components/Navbar";
import CardCarona from "../../Components/Cards/CardCarona";
import { getCaronasPassageiro } from "../NewRide/service/ride";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const [caronas, setCaronas] = useState<any>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getCaronasPassageiro();
      const storagedUser = await AsyncStorage.getItem("@App:user");
      console.log(response);
      if (response.data) {
        setCaronas(response.data);
      }
      console.log(caronas);
    };

    fetchUser();
  }, []);
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw` mt-15 ml-5 justify-start`}>
        <Text style={tw`text-4xl font-bold text-[#313131]`}>
          Gerenciar Caronas
        </Text>
        <Text style={tw`mt-2 text-lg`}>
          Você possui {caronas?.total || 0} caronas
        </Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        <View style={tw`items-center`}>
          {Array.isArray(caronas?.valor) && caronas.valor.length > 0 ? (
            caronas.valor.map((carona: any) => (
              <CardCarona key={carona.id} carona={carona} />
            ))
          ) : (
            <Text style={tw`text-gray-500 mt-10`}>
              Nenhuma carona disponível no momento.
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Navbar */}
      <View>
        <Navbar />
      </View>
    </View>
  );
}
