import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import tw from "twrnc";
import { RootStackParamList } from "../../routes";
import Navbar from "../../Components/Navbar";
import Searchbar from "../../Components/Searchbar/Searchbar";
import CardCarona from "../../Components/Cards/CardCarona";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

export default function Home({ navigation }: Props) {
  const [caronas, setCaronas] = useState<any[]>([]);
  const [filtroVisible, setFiltroVisible] = useState(false);

  const handleSearch = async (formData: any) => {
    try {
      const resp = await api.post("/searchCarona", {
        coords_partida: formData.coords_partida,
        coords_destino: formData.coords_destino,
        desvio_partida_m: Number(formData.desvio_partida_m),
        desvio_destino_m: Number(formData.desvio_destino_m),
      });
      const data = resp.data as any[];
      await AsyncStorage.setItem("@App:caronasBuscadas", JSON.stringify(data));
      setCaronas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFiltroVisible(false);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("@App:caronasBuscadas").then((s) => {
      if (s) setCaronas(JSON.parse(s));
    });
  }, []);

  return (
    <View style={tw`flex-1 bg-[#F5F5F5]`}>
      <View style={tw`mt-15 justify-start h-23`}>
        <Text style={tw`ml-5 text-4xl font-bold text-[#313135] `}>
          Buscar Caronas
        </Text>
        <View style={tw``}>
          <Searchbar
            visible={filtroVisible}
            onOpen={() => setFiltroVisible(true)}
            onClose={() => setFiltroVisible(false)}
            onSave={handleSearch}
          />
        </View>
      </View>

      <ScrollView style={tw`flex-1 mt-2`}>
        <View style={tw`items-center`}>
          {Array.isArray(caronas) && caronas.length > 0 ? (
            caronas.map(
              (carona: any) =>
                carona.id_motorista === null && (
                  <CardCarona key={carona.id} carona={carona} />
                )
            )
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
