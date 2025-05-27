import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "twrnc";
import { RootStackParamList } from "../routes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Navbar() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const current = route.name;
  const { user } = useAuth();


  const [tipoUsuario, setTipoUsuario] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storagedUser = await AsyncStorage.getItem("@App:user");
      if (storagedUser) {
        const parsed = JSON.parse(storagedUser);
        setTipoUsuario(parsed.tipo_usuario);
      } else {
        setTipoUsuario(1);
      }
    };

    fetchUser();
  }, []);
  const navItems = [
    { name: "Home", icon: "format-list-bulleted", label: "Caronas" },
    { name: "Search", icon: "magnify", label: "Pesquisa" },
    { name: "NewRide", icon: "plus-box", label: "Nova Carona" },
    { name: "Profile", icon: "account", label: "Perfil" },
  ];

  const filteredNavItems = navItems.filter((item) =>
    tipoUsuario === 2 ? item.name !== "NewRide" : true
  );

  return (
    <View
      style={tw`flex-row justify-around items-center py-3 border-t-4 border-[#998E6E] m-[10]`}
    >
      {filteredNavItems.map((item) => {
        const isActive = current === item.name;

        return (
          <TouchableOpacity
            key={item.name}
            onPress={() =>
              navigation.navigate(item.name as keyof RootStackParamList)
            }
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={50}
              color={isActive ? "#F1D014" : "#998E6E"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

